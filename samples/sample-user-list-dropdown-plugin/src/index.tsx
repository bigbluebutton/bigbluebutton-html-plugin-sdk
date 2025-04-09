import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BbbPluginSdk, PluginApi, PluginBrowserWindow } from 'bigbluebutton-html-plugin-sdk';
import SampleUserListDropdownPlugin from './sample-user-list-dropdown-plugin-item/component';

declare const window: PluginBrowserWindow;

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

BbbPluginSdk.pluginApiSecurityCheck(uuid);
window.bbbPluginApiConstructors[uuid] = (pluginApi: PluginApi) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleUserListDropdownPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
};
