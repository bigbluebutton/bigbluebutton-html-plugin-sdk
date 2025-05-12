import * as React from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import SampleActionButtonDropdownPlugin from './components/sample-action-button-dropdown-plugin/component';

BbbPluginSdk.setupPlugin((pluginApi: PluginApi, uuid) => {
  const root = ReactDOM.createRoot(document.getElementById(uuid));
  root.render(
    <SampleActionButtonDropdownPlugin {...{
      pluginUuid: uuid,
      pluginApi,
    }}
    />,
  );
});
