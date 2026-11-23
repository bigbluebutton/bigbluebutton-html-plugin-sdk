export interface PluginTelemetryEndOptions {
  failed?: boolean;
}

export interface PluginTelemetrySpan {
  /**
   * Stops the measurement and records it. Returns the duration in ms (0 when telemetry is off).
   * Calling it more than once records only the first call.
   */
  end: (options?: PluginTelemetryEndOptions) => number;
}

/**
 * What the client injects into `pluginApi.telemetry`. Plugins should use `pluginTelemetry`,
 * which falls back to a no-op when the client has no telemetry.
 *
 * Names (measures, gauges, marks) must match `/^[A-Za-z][A-Za-z0-9_.-]{0,39}$/` and must never
 * carry meeting content (user names, chat text, ids). The client drops invalid names and keeps
 * at most 8 distinct measure and gauge names per plugin.
 */
export interface PluginTelemetryApi {
  isEnabled: () => boolean;
  start: (name: string) => PluginTelemetrySpan;
  gauge: (name: string, value: number) => void;
  mark: (action: string) => void;
  reportError: (error: unknown) => void;
}

export interface PluginTelemetryMeasure {
  <T>(name: string, work: Promise<T>): Promise<T>;
  <T>(name: string, work: () => Promise<T>): Promise<T>;
  <T>(name: string, work: () => T): T;
}

export interface PluginTelemetry extends PluginTelemetryApi {
  /**
   * Measures `work` under `name`: a function (sync or async) or a promise. With a promise, the
   * measurement starts when `measure` is called, not when the promise was created. A throw or a
   * rejection is recorded as failed and passed on unchanged.
   */
  measure: PluginTelemetryMeasure;
}
