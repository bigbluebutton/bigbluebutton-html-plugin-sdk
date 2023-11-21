import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleCustomUserSubscriptionPlugin from './sample-custom-user-subscription-plugin-item/component';
import SampleCustomPresentationSubscriptionPlugin from './sample-custom-presentation-subscription-plugin-item/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <SampleCustomUserSubscriptionPlugin {...{
        pluginUuid: uuid,
        pluginName,
      }}
    />
    <SampleCustomPresentationSubscriptionPlugin {...{
      pluginUuid: uuid,
      pluginName,
    }}
    />
  </React.StrictMode>,
);
