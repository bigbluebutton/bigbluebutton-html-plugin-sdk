import { PluginBrowserWindow } from '../core/api/types';

declare const window: PluginBrowserWindow;

// A plugin bundle evaluates its copy of the SDK while its own <script uuid="..."> runs, so
// currentScript is that plugin's tag. The client's own copy has no uuid.
const uuid = document.currentScript?.getAttribute('uuid') || undefined;

export const currentPluginUuid = (): string | undefined => uuid;

export const currentPluginName = (): string | undefined => {
  if (!uuid) return undefined;
  try {
    return window.bbb_plugins?.[uuid]?.pluginName;
  } catch (err) {
    return undefined;
  }
};
