import { PluginBrowserWindow } from '../core/api/types';
import { currentPluginUuid } from '../utils/plugin-identity';
import {
  PluginTelemetry,
  PluginTelemetryApi,
  PluginTelemetryEndOptions,
  PluginTelemetryMeasure,
  PluginTelemetrySpan,
} from './types';

declare const window: PluginBrowserWindow;

const NOOP_SPAN: PluginTelemetrySpan = { end: () => 0 };

const noopTelemetry: PluginTelemetryApi = {
  isEnabled: () => false,
  start: () => NOOP_SPAN,
  gauge: () => {},
  mark: () => {},
  reportError: () => {},
};

function isValidTelemetry(obj: unknown): obj is PluginTelemetryApi {
  return (
    typeof obj === 'object'
    && obj !== null
    && typeof (obj as PluginTelemetryApi).start === 'function'
    && typeof (obj as PluginTelemetryApi).gauge === 'function'
    && typeof (obj as PluginTelemetryApi).mark === 'function'
    && typeof (obj as PluginTelemetryApi).reportError === 'function'
    && typeof (obj as PluginTelemetryApi).isEnabled === 'function'
  );
}

// Looked up on every call, like the logger: the client injects it into this plugin's pluginApi.
// Older clients inject nothing, so every call is a no-op there.
function getTelemetry(): PluginTelemetryApi {
  const uuid = currentPluginUuid();
  if (!uuid) return noopTelemetry;
  try {
    const telemetry = window.bbb_plugins?.[uuid]?.telemetry;
    return isValidTelemetry(telemetry) ? telemetry : noopTelemetry;
  } catch (err) {
    return noopTelemetry;
  }
}

// Telemetry must never break the plugin: every call into the client is guarded
function guarded<T>(fallback: T, call: (telemetry: PluginTelemetryApi) => T): T {
  try {
    return call(getTelemetry());
  } catch (err) {
    return fallback;
  }
}

const start = (name: string): PluginTelemetrySpan => {
  const span = guarded(NOOP_SPAN, (telemetry) => telemetry.start(name));
  return {
    end: (options?: PluginTelemetryEndOptions) => {
      try {
        return span.end(options);
      } catch (err) {
        return 0;
      }
    },
  };
};

const isThenable = (value: unknown): value is PromiseLike<unknown> => (
  typeof value === 'object' && value !== null && typeof (value as PromiseLike<unknown>).then === 'function'
);

// Built here on top of start/end, so the plugin's own work never runs inside client code
const measure = (<T>(name: string, work: Promise<T> | (() => T | Promise<T>)) => {
  const span = start(name);
  let result: T | Promise<T>;
  try {
    result = typeof work === 'function' ? work() : work;
  } catch (err) {
    span.end({ failed: true });
    throw err;
  }
  if (isThenable(result)) {
    return Promise.resolve(result).then(
      (value) => {
        span.end();
        return value;
      },
      (err) => {
        span.end({ failed: true });
        throw err;
      },
    );
  }
  span.end();
  return result;
}) as PluginTelemetryMeasure;

/**
 * Performance telemetry for plugins. Measurements go to the client's telemetry (debug window,
 * OTLP export) under this plugin's name. Every call is a no-op when the client has telemetry off
 * or predates this API, so using it does not require raising `requiredSdkVersion`.
 *
 * @example
 * ```ts
 * const users = await pluginTelemetry.measure('load_users', () => fetchUsers());
 * const span = pluginTelemetry.start('draw');
 * draw();
 * span.end();
 * pluginTelemetry.mark('picked_user');
 * ```
 */
const pluginTelemetry: PluginTelemetry = {
  isEnabled: () => guarded(false, (telemetry) => telemetry.isEnabled()),
  start,
  measure,
  gauge: (name: string, value: number) => guarded(
    undefined,
    (telemetry) => telemetry.gauge(name, value),
  ),
  mark: (action: string) => guarded(undefined, (telemetry) => telemetry.mark(action)),
  reportError: (error: unknown) => guarded(undefined, (telemetry) => telemetry.reportError(error)),
};

export default pluginTelemetry;
