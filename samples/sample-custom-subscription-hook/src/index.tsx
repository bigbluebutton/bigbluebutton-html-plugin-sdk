import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleCustomUserSubscriptionPlugin from './components/sample-custom-user-subscription-plugin-item/component';
import SampleCustomPresentationSubscriptionPlugin from './components/sample-custom-presentation-subscription-plugin-item/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <>
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
  </>,
);
