import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleUserListItemAdditionalInformationPlugin from './sample-user-list-item-additional-information-plugin/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid: string) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleUserListItemAdditionalInformationPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
