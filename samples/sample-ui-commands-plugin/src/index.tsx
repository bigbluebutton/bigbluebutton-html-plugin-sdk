import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleUiCommandsPlugin from './sample-ui-commands-plugin-item/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid: string) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleUiCommandsPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
