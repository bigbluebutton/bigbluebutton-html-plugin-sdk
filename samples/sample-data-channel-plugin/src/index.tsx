import { BbbPluginSdk, PluginApi, PluginBrowserWindow } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleDataChannelPlugin from './components/sample-data-channel-plugin-item/component';

declare const window: PluginBrowserWindow;

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

BbbPluginSdk.pluginApiSecurityCheck(uuid);
window.bbbPluginApiConstructors[uuid] = (pluginApi: PluginApi) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleDataChannelPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
};
