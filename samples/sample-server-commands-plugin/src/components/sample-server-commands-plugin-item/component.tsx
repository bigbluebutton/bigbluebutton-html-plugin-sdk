import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  BbbPluginSdk,
  ActionButtonDropdownSeparator,
  ActionButtonDropdownOption,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleServerCommandsPluginProps, Message } from './types';

export interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleServerCommandsPluginItem(
  { pluginUuid: uuid, pluginApi, pluginName }: SampleServerCommandsPluginProps,
): React.ReactNode {
  BbbPluginSdk.initialize(pluginApi, uuid);
  const [
    chatMessagesToApplyStyle,
    setChatIdsToApplyStyle,
  ] = useState<Message[]>([]);
  const loadedMessages = pluginApi.useLoadedChatMessages();

  useEffect(() => {
    // These buttons are interfaces for the user to manually send messages.
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
      new ActionButtonDropdownOption({
        label: 'Send custom chat message',
        icon: 'chat',
        tooltip: 'This is a button to send chat message',
        allowed: true,
        onClick: () => {
          pluginApi.serverCommands.chat.sendCustomPublicChatMessage({
            textMessageInMarkdownFormat: 'This is a custom plugin message!',
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
        if (!message.messageMetadata) return false;

        const messageMetadata = JSON.parse(message.messageMetadata);
        if (!messageMetadata.pluginName) return false;

        return (
          // If message is sent from plugin, check if it's a custom one.
          (messageMetadata.pluginName === pluginName) && messageMetadata.custom
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
    // Logic to apply basic style to the previously selected messages:
    // those with custom === true;
    chatMessagesDomElements?.map((chatMessageDomElement) => {
      const { parentElement } = chatMessageDomElement;
      if (parentElement.getAttribute('already-styled') === 'true') return false;
      parentElement.setAttribute('already-styled', 'true');
      parentElement.style.paddingTop = '0.5rem';
      const messageIdFromUi = chatMessageDomElement.getAttribute('data-chat-message-id');
      const div = document.createElement('div');
      // It basically applies solid gray background.
      div.style.backgroundColor = 'gray';
      div.innerHTML = chatMessagesToApplyStyle.find((message) => (
        message.messageId === messageIdFromUi
      )).text;
      // Just to avoid rendering errors, remove all children from this element
      const chatMessageDomElementReference = chatMessageDomElement;
      chatMessageDomElementReference.innerHTML = '';
      chatMessageDomElement.appendChild(div);

      return true;
    });
  }, [chatMessagesDomElements]);

  return null;
}

export default SampleServerCommandsPluginItem;
