import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleActionsBarPlugin from './sample-actions-bar-plugin/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <SampleActionsBarPlugin {...{
    pluginUuid: uuid,
    pluginName,
  }}
  />,
);
