import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleUserListItemAdditionalInformationPlugin from './sample-user-list-item-additional-information-plugin/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <SampleUserListItemAdditionalInformationPlugin {...{
    pluginUuid: uuid,
    pluginName,
  }}
  />,
);
