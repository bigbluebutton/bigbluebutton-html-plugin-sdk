import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  MediaAreaSeparator,
  MediaAreaOption,
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
    // These buttons are interfaces for the user to manually send messages.
    pluginApi.setMediaAreaItems([
      new MediaAreaSeparator({
        dataTest: 'sample-server-commands-separator',
      }),
      new MediaAreaOption({
        label: 'Send chat message',
        icon: { iconName: 'chat' },
        tooltip: 'This is a button to send chat message',
        allowed: true,
        onClick: () => {
          pluginApi.serverCommands.chat.sendPublicChatMessage({
            textMessageInMarkdownFormat: 'This is a plugin message!',
            pluginCustomMetadata: uuid,
          });
        },
      }),
      new MediaAreaOption({
        label: 'Upload PDF',
        icon: 'copy',
        tooltip: '',
        allowed: true,
        onClick: () => {
          pluginApi.serverCommands.presentation.upload({
            content: {
              base64: 'JVBERi0xLjQKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nCi9QYWdlcyAyIDAgUgo+PgplbmRvYmoK MiAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagoz IDAgb2JqCjw8L1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUgODQy XQovQ29udGVudHMgNSAwIFIKL1Jlc291cmNlcyA8PC9Qcm9jU2V0IFsvUERGIC9UZXh0XQovRm9u dCA8PC9GMSA0IDAgUj4+Cj4+Cj4+CmVuZG9iago0IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL1N1YnR5 cGUgL1R5cGUxCi9OYW1lIC9GMQovQmFzZUZvbnQgL0hlbHZldGljYQovRW5jb2RpbmcgL01hY1Jv bWFuRW5jb2RpbmcKPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDUzCj4+CnN0cmVhbQpCVAov RjEgMjAgVGYKMjIwIDQwMCBUZAooRHVtbXkgUERGKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhy ZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZgowMDAwMDAwMDA5IDAwMDAwIG4KMDAwMDAwMDA2MyAw MDAwMCBuCjAwMDAwMDAxMjQgMDAwMDAgbgowMDAwMDAwMjc3IDAwMDAwIG4KMDAwMDAwMDM5MiAw MDAwMCBuCnRyYWlsZXIKPDwvU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0OTUKJSVF T0YK',
            },
            mimeType: 'application/pdf',
          });
        },
      }),
      new MediaAreaOption({
        label: 'Upload BBB Image',
        icon: 'copy',
        tooltip: '',
        allowed: true,
        onClick: () => {
          pluginApi.serverCommands.presentation.upload({
            content: {
              base64: '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',
            },
            mimeType: 'image/jpg',
            filename: 'bbbImage.jpg',
          });
        },
      }),
      new MediaAreaOption({
        label: 'Send custom chat message',
        icon: { iconName: 'chat' },
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
        if (message.deletedAt) return false;
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
