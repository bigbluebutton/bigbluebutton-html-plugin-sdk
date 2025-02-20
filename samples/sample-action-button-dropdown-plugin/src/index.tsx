import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleActionButtonDropdownPlugin from './components/sample-action-button-dropdown-plugin/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <SampleActionButtonDropdownPlugin {...{
    pluginUuid: uuid,
    pluginName,
  }}
  />,
);
