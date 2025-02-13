import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleAppsGalleryItemPlugin from './sample-apps-gallery-item-plugin/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <SampleAppsGalleryItemPlugin {...{
    pluginUuid: uuid,
    pluginName,
  }}
  />,
);
