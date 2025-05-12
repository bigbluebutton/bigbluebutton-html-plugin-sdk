import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleUserCameraHelperPlugin from './sample-user-camera-helper-plugin/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid: string) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleUserCameraHelperPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
