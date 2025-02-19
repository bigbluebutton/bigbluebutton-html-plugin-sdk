import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleUserListDropdownPlugin from './sample-user-list-dropdown-plugin-item/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <SampleUserListDropdownPlugin {...{
    pluginUuid: uuid,
    pluginName,
  }}
  />,
);
