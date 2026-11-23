import {
  describe, it, expect, beforeEach, afterEach, vi,
} from 'vitest';
import { createElement } from 'react';
import { render, renderHook } from '@testing-library/react';

import type { PluginTelemetry, PluginTelemetryApi } from '../../../src/telemetry/types';
import type { SubscribedEventDetails } from '../../../src/core/types';

const UUID = 'plugin-uuid';
const PLUGIN_NAME = 'SamplePlugin';

interface FakeClient {
  api: PluginTelemetryApi;
  started: string[];
  ended: { name: string; failed: boolean }[];
}

const fakeClient = (): FakeClient => {
  const started: string[] = [];
  const ended: { name: string; failed: boolean }[] = [];
  const api: PluginTelemetryApi = {
    isEnabled: () => true,
    start: (name) => {
      started.push(name);
      return {
        end: (options) => {
          ended.push({ name, failed: !!options?.failed });
          return 1;
        },
      };
    },
    gauge: vi.fn(),
    mark: vi.fn(),
    reportError: vi.fn(),
  };
  return { api, started, ended };
};

// The SDK reads the plugin uuid from document.currentScript when its module is evaluated,
// so each test loads a fresh copy while a fake plugin <script uuid> is "running".
const loadAsPlugin = async (telemetry?: PluginTelemetryApi) => {
  vi.resetModules();
  const script = document.createElement('script');
  script.setAttribute('uuid', UUID);
  Object.defineProperty(document, 'currentScript', { value: script, configurable: true });
  (window as unknown as { bbb_plugins: object }).bbb_plugins = {
    [UUID]: { pluginName: PLUGIN_NAME, telemetry },
  };
  const module = await import('../../../src/telemetry');
  Object.defineProperty(document, 'currentScript', { value: null, configurable: true });
  return module;
};

describe('pluginTelemetry', () => {
  afterEach(() => {
    delete (window as unknown as { bbb_plugins?: object }).bbb_plugins;
  });

  describe('without telemetry in the client', () => {
    let pluginTelemetry: PluginTelemetry;

    beforeEach(async () => {
      ({ pluginTelemetry } = await loadAsPlugin(undefined));
    });

    it('is disabled and still runs the measured work', async () => {
      expect(pluginTelemetry.isEnabled()).toBe(false);
      expect(pluginTelemetry.measure('sync', () => 42)).toBe(42);
      await expect(pluginTelemetry.measure('async', async () => 'done')).resolves.toBe('done');
      expect(pluginTelemetry.start('span').end()).toBe(0);
      expect(() => pluginTelemetry.mark('action')).not.toThrow();
    });

    it('passes errors through unchanged', async () => {
      const error = new Error('boom');
      expect(() => pluginTelemetry.measure('sync', () => { throw error; })).toThrow(error);
      await expect(pluginTelemetry.measure('async', Promise.reject(error))).rejects.toBe(error);
    });
  });

  describe('with telemetry injected by the client', () => {
    let client: FakeClient;
    let pluginTelemetry: PluginTelemetry;

    beforeEach(async () => {
      client = fakeClient();
      ({ pluginTelemetry } = await loadAsPlugin(client.api));
    });

    it('measures sync work, async work and promises', async () => {
      expect(pluginTelemetry.isEnabled()).toBe(true);
      expect(pluginTelemetry.measure('sync', () => 1)).toBe(1);
      await pluginTelemetry.measure('async', async () => 2);
      await pluginTelemetry.measure('promise', Promise.resolve(3));
      expect(client.started).toEqual(['sync', 'async', 'promise']);
      expect(client.ended).toEqual([
        { name: 'sync', failed: false },
        { name: 'async', failed: false },
        { name: 'promise', failed: false },
      ]);
    });

    it('records throws and rejections as failed', async () => {
      expect(() => pluginTelemetry.measure('sync', () => { throw new Error('x'); })).toThrow();
      await expect(pluginTelemetry.measure('async', async () => { throw new Error('y'); })).rejects.toThrow('y');
      expect(client.ended).toEqual([
        { name: 'sync', failed: true },
        { name: 'async', failed: true },
      ]);
    });

    it('forwards gauges, marks and errors', () => {
      const error = new Error('render');
      pluginTelemetry.gauge('queue_size', 3);
      pluginTelemetry.mark('picked_user');
      pluginTelemetry.reportError(error);
      expect(client.api.gauge).toHaveBeenCalledWith('queue_size', 3);
      expect(client.api.mark).toHaveBeenCalledWith('picked_user');
      expect(client.api.reportError).toHaveBeenCalledWith(error);
    });
  });

  it('never lets a failing client break the plugin', async () => {
    const broken: PluginTelemetryApi = {
      isEnabled: () => { throw new Error('client'); },
      start: () => { throw new Error('client'); },
      gauge: () => { throw new Error('client'); },
      mark: () => { throw new Error('client'); },
      reportError: () => { throw new Error('client'); },
    };
    const { pluginTelemetry } = await loadAsPlugin(broken);
    expect(pluginTelemetry.isEnabled()).toBe(false);
    expect(pluginTelemetry.measure('work', () => 'ok')).toBe('ok');
    expect(() => pluginTelemetry.gauge('g', 1)).not.toThrow();
    expect(() => pluginTelemetry.reportError(new Error('e'))).not.toThrow();
  });

  it('reports render errors from PluginErrorBoundary and shows the fallback', async () => {
    const client = fakeClient();
    const { PluginErrorBoundary } = await loadAsPlugin(client.api);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const Broken = () => { throw new Error('render failed'); };

    const { container } = render(createElement(
      PluginErrorBoundary,
      { fallback: createElement('span', null, 'fallback') },
      createElement(Broken),
    ));

    expect(container.textContent).toBe('fallback');
    expect(client.api.reportError).toHaveBeenCalledWith(expect.objectContaining({ message: 'render failed' }));
    consoleError.mockRestore();
  });

  it('shows the fallback when a plugin throws null', async () => {
    const client = fakeClient();
    const { PluginErrorBoundary } = await loadAsPlugin(client.api);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    // eslint-disable-next-line no-throw-literal -- what this test is about
    const Broken = () => { throw null; };

    const { container } = render(createElement(
      PluginErrorBoundary,
      { fallback: createElement('span', null, 'fallback') },
      createElement(Broken),
    ));

    expect(container.textContent).toBe('fallback');
    expect(client.api.reportError).toHaveBeenCalledWith(expect.objectContaining({ message: 'null' }));
    consoleError.mockRestore();
  });
});

describe('plugin name in hook events', () => {
  it('goes next to hookArguments, which stay the deduplication key', async () => {
    await loadAsPlugin(undefined);
    const { createDataConsumptionHook } = await import('../../../src/data-consumption/factory/hookCreator');
    const { HookEvents } = await import('../../../src/core/enum');
    const { DataConsumptionHooks } = await import('../../../src/data-consumption/enums');
    const events: SubscribedEventDetails[] = [];
    const listener = ((event: CustomEvent) => events.push(event.detail)) as EventListener;
    window.addEventListener(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, listener);

    const hookArguments = { query: 'subscription Q { user { userId } }', variables: { a: 1 } };
    renderHook(() => createDataConsumptionHook(
      DataConsumptionHooks.CUSTOM_SUBSCRIPTION,
      hookArguments,
    ));
    window.removeEventListener(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, listener);

    expect(events[0].pluginName).toBe(PLUGIN_NAME);
    expect(events[0].hookArguments).toEqual(hookArguments);
  });
});
