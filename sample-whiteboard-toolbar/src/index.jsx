import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import SampleWhiteboardItem from './sample-whiteboard-item/component';

const uuid = document.currentScript?.getAttribute("uuid") || "root";

const pluginName = document.currentScript?.getAttribute("pluginName") || "plugin";

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <SampleWhiteboardItem {...{
      pluginUuid: uuid,
      pluginName
    }} />
  </React.StrictMode>
);
