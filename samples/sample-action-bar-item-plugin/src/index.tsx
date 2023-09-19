import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleActionBarItemPlugin from './sample-action-bar-item-plugin/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <SampleActionBarItemPlugin {...{
      pluginUuid: uuid,
      pluginName,
    }}
    />
  </React.StrictMode>,
);
