import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BbbPluginSdk, PluginApi, PluginBrowserWindow } from 'bigbluebutton-html-plugin-sdk';
import SampleUserCameraHelperPlugin from './sample-user-camera-helper-plugin/component';

declare const window: PluginBrowserWindow;

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

BbbPluginSdk.pluginApiSecurityCheck(uuid);
window.bbbPluginApiConstructors[uuid] = (pluginApi: PluginApi) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleUserCameraHelperPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
};
