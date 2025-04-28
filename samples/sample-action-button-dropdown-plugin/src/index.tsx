import * as React from 'react';
import { BbbPluginSdk, PluginApi, PluginBrowserWindow } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleActionButtonDropdownPlugin from './components/sample-action-button-dropdown-plugin/component';

declare const window: PluginBrowserWindow;

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

BbbPluginSdk.pluginApiSecurityCheck(uuid);
window.bbbPluginApiConstructors[uuid] = (pluginApi: PluginApi) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleActionButtonDropdownPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
};
