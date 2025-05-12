import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleUserCameraDropdownPlugin from './sample-screenshare-helper-plugin/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid: string) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleUserCameraDropdownPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
