import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SampleWhiteboardToolbarPlugin from './sample-whiteboard-toolbar-plugin-item/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <SampleWhiteboardToolbarPlugin {...{
      pluginUuid: uuid,
      pluginName,
    }}
    />
  </React.StrictMode>,
);
