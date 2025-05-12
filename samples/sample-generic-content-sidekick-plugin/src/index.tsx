import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleGenericContentSidekickPlugin from './components/sample-generic-content-sidekick-plugin-item/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid: string) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleGenericContentSidekickPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
