import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleDomElementManipulation from './sample-dom-element-manipulation/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid: string) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleDomElementManipulation {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
