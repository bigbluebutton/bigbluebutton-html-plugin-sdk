import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  ActionButtonDropdownSeparator,
  ActionButtonDropdownOption,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleServerCommandsPluginProps, Message } from './types';

export interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleServerCommandsPluginItem(
  { pluginUuid: uuid, pluginName }: SampleServerCommandsPluginProps,
): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [
    chatMessagesToApplyStyle,
    setChatIdsToApplyStyle,
  ] = useState<Message[]>([]);
  const loadedMessages = pluginApi.useLoadedChatMessages();

  useEffect(() => {
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownSeparator(),
      new ActionButtonDropdownOption({
        label: 'Send chat message',
        icon: 'chat',
        tooltip: 'This is a button to send chat message',
        allowed: true,
        onClick: () => {
          pluginApi.serverCommands.chat.sendPublicChatMessage({
            textMessageInMarkdownFormat: 'This is a plugin message!',
            pluginCustomMetadata: uuid,
          });
        },
      }),
    ]);
  }, []);

  useEffect(() => {
    if (!loadedMessages.data) return;

    const messagesToStyle = loadedMessages.data.filter(
      (message) => {
        if (!message.messageMetadata
          || !JSON.parse(message.messageMetadata).pluginName) return false;

        return (
          JSON.parse(message.messageMetadata).pluginName === pluginName
        );
      },
    ).map((message) => ({
      messageId: message.messageId,
      text: message.message,
    }));
    setChatIdsToApplyStyle(messagesToStyle);
  }, [loadedMessages]);

  const messageIds = chatMessagesToApplyStyle.map((message) => message.messageId);
  const chatMessagesDomElements = pluginApi.useChatMessageDomElements(messageIds);

  useEffect(() => {
    chatMessagesDomElements?.map((chatMessageDomElement) => {
      const { parentElement } = chatMessageDomElement;
      parentElement.style.paddingTop = '0.5rem';
      const messageIdFromUi = chatMessageDomElement.getAttribute('data-chat-message-id');
      const div = document.createElement('div');
      div.style.backgroundColor = 'gray';
      div.innerHTML = chatMessagesToApplyStyle.find((message) => (
        message.messageId === messageIdFromUi
      )).text;
      chatMessageDomElement.appendChild(div);
      return true;
    });
  }, [chatMessagesDomElements]);

  return null;
}

export default SampleServerCommandsPluginItem;
