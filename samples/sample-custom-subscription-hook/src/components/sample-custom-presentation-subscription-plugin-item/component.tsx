import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  PresentationToolbarButton,
  PresentationToolbarInterface,
  CustomSubscriptionHookOptions,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { PresentationFromGraphqlWrapper, SampleCustomSubscriptionPluginProps } from './types';

function SampleCustomPresentationSubscriptionPlugin(
  { pluginUuid: uuid, pluginApi }: SampleCustomSubscriptionPluginProps,
):
 React.ReactElement {
  BbbPluginSdk.initialize(pluginApi, uuid);

  const { data: currentPresentation } = pluginApi.useCurrentPresentation();
  let nextSlidePage = 1;
  if (currentPresentation?.currentPage?.num) {
    nextSlidePage = currentPresentation.currentPage.num + 1;
  }
  const { data: dataResult } = pluginApi.useCustomSubscription<PresentationFromGraphqlWrapper>(`
      subscription Presentation($nextSlidePage: Int!) {
        pres_presentation (where: {current: {_eq: true}}) {
          presentationId
          pages (where: {num: {_eq: $nextSlidePage}}) {
            num
            urlsJson
          }
        }
      }
    `, {
    variables: {
      nextSlidePage,
    },
  } as CustomSubscriptionHookOptions);

  useEffect(() => {
    const currentObjectToSendToClient
      : PresentationToolbarInterface = new PresentationToolbarButton({
        label: 'Log data for next slide',
        tooltip: 'It queries data from next slide and logs on the console',
        style: {},
        onClick: () => {
          pluginLogger.info('Logging data from sample-custom-presentation-subscription-plugin: ', JSON.stringify(dataResult));
        },
      });
    pluginApi.setPresentationToolbarItems([currentObjectToSendToClient]);
  }, [dataResult]);

  return null;
}

export default SampleCustomPresentationSubscriptionPlugin;
