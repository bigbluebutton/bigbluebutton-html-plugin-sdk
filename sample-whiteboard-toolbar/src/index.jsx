import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import WhiteboardToolbarItem from './whiteboard-toolbar-item/component';

const elementId = document.currentScript?.getAttribute("elementId") || "root";

const pluginName = document.currentScript?.getAttribute("pluginName") || "plugin";

const root = ReactDOM.createRoot(document.getElementById(elementId));
root.render(
  <React.StrictMode>
    <WhiteboardToolbarItem {...{
      pluginUuid: elementId,
      pluginName
    }} />
  </React.StrictMode>
);
