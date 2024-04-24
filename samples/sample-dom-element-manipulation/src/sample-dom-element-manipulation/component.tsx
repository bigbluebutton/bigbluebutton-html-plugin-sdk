import * as React from 'react';
import { useState, useEffect } from 'react';

import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { SampleDomElementManipulationProps } from './types';

const REGEX = /@([A-Z][a-z]+ ){0,2}[A-Z][a-z]+/;

function SampleDomElementManipulation(
  { pluginUuid: uuid }: SampleDomElementManipulationProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const [chatIdsToApplyHighlights, setChatIdsToApplyHighlights] = useState<string[]>([]);
  const response = pluginApi.useLoadedChatMessages();

  useEffect(() => {
    if (response.data) {
      const idsToApply = response.data.filter(
        (message) => message.message.search(REGEX) !== -1,
      ).map((message) => message.messageId);
      setChatIdsToApplyHighlights(idsToApply);
    }
  }, [response]);

  const chatMessagesDomElements = pluginApi.useChatMessageDomElements(chatIdsToApplyHighlights);

  chatMessagesDomElements?.forEach((chatMessageDomElement) => {
    const mention = chatMessageDomElement.innerHTML.match(REGEX);
    // eslint-disable-next-line no-param-reassign
    chatMessageDomElement.innerHTML = chatMessageDomElement.innerHTML.replace(mention[0], `<span style="color: #4185cf; background-color: #f2f6f8;">${mention[0]}</span>`);
  });
  return null;
}

export default SampleDomElementManipulation;
