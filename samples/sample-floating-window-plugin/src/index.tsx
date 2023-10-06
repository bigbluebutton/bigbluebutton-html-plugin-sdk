import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleFloatingWindowPlugin from './sample-floating-window-plugin-item/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <SampleFloatingWindowPlugin {...{
      pluginUuid: uuid,
      pluginName,
    }}
    />
  </React.StrictMode>,
);
