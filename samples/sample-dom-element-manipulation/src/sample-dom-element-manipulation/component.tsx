import * as React from 'react';
import { useState, useEffect } from 'react';

import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { SampleDomElementManipulationProps } from './types';

const REGEX = /@([A-Z][a-z]+ ){0,2}[A-Z][a-z]+/;

function SampleDomElementManipulation({ pluginUuid: uuid }: SampleDomElementManipulationProps): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const [chatIdsToApplyHighlights, setChatIdsToApplyHighlights] = useState<string[]>([]);
  const response = pluginApi.useLoadedChatMessages();

  useEffect(() => {
    if (response.data) {

      const idsToApply = response.data.filter(
        (message) => {
          
          return message.message.search(REGEX) !== -1}
      ).map((message) => message.messageId);
      setChatIdsToApplyHighlights(idsToApply);
    }
  }, [response])

  const chatMessages = pluginApi.useChatMessageDomElements(chatIdsToApplyHighlights);

  chatMessages?.forEach((chatMessage) => {

    const mention = chatMessage.innerHTML.match(REGEX); 
    chatMessage.innerHTML = chatMessage.innerHTML.replace(mention[0], `<span style="color: #4185cf; background-color: #f2f6f8;">${mention[0]}</span>`);
  })
  return null;
}

export default SampleDomElementManipulation;