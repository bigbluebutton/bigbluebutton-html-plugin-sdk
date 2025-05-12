import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleFloatingWindowPlugin from './components/sample-floating-window-plugin-item/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid: string) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleFloatingWindowPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
