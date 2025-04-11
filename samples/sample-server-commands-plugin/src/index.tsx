import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BbbPluginSdk, PluginApi, PluginBrowserWindow } from 'bigbluebutton-html-plugin-sdk';
import SampleServerCommandsPluginItem from './components/sample-server-commands-plugin-item/component';

declare const window: PluginBrowserWindow;

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

BbbPluginSdk.pluginApiSecurityCheck(uuid);
window.bbbPluginApiConstructors[uuid] = (pluginApi: PluginApi) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleServerCommandsPluginItem {...{
      pluginUuid: uuid,
      pluginApi,
      pluginName,
    }}
    />,
  );
};
