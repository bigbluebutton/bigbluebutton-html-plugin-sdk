import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SamplePresentationDropdownPlugin from './components/sample-presentation-dropdown-plugin/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid: string) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SamplePresentationDropdownPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
