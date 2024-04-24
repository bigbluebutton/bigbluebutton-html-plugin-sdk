import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleCameraSettingsDropdownPlugin from './components/sample-camera-settings-dropdown-plugin-item/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <SampleCameraSettingsDropdownPlugin {...{
      pluginUuid: uuid,
      pluginName,
    }}
    />
  </React.StrictMode>,
);
