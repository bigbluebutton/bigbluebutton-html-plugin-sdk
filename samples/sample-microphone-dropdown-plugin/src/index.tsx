import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleMicrophoneDropdownPlugin from './sample-microphone-dropdown-plugin/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <SampleMicrophoneDropdownPlugin {...{
      pluginUuid: uuid,
      pluginName,
    }}
    />
  </React.StrictMode>,
);
