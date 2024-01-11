import { useEffect, useState } from 'react';
import { DomElementManipulationHooks } from '../../enums';
import { HookEvents } from '../../../core/enum';
import {
  HookEventWrapper, SubscribedEventDetails, UnsubscribedEventDetails, UpdatedEventDetails,
} from '../../../core/types';
import { ChatMessageDomElementsArguments, UpdatedEventDetailsForChatMessageDomElements } from './types';
import { sortedStringify } from '../../../data-consumption/utils';

export const useChatMessageDomElements = (messageIds: string[]) => {
  const [domElement, setDomElement] = useState<HTMLDivElement[]>();
  const [messageIdsState, setMessageIdsState] = useState<string[]>(messageIds);

  const handleCustomSubscriptionUpdateEvent: EventListener = (
    (event: HookEventWrapper<
      UpdatedEventDetails<UpdatedEventDetailsForChatMessageDomElements[]>>) => {
      const detail = event.detail as UpdatedEventDetails<
        UpdatedEventDetailsForChatMessageDomElements[]>;
      if (detail.hook === DomElementManipulationHooks.CHAT_MESSAGE
        && sortedStringify(
          detail.data.map((message) => message.messageId),
        ) === sortedStringify(messageIdsState)) {
        setDomElement(detail.data.map((message) => message.message));
      }
    }) as EventListener;

  useEffect(() => {
    if (messageIdsState) {
      window.addEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
      return () => {
        window.removeEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
        window.dispatchEvent(new CustomEvent<UnsubscribedEventDetails>(HookEvents.UNSUBSCRIBED, {
          detail: {
            hook: DomElementManipulationHooks.CHAT_MESSAGE,
            hookArguments: {
              messageIds,
            } as ChatMessageDomElementsArguments,
          },
        }));
      };
    }
    return () => {};
  }, []);
  useEffect(() => {
    if (messageIdsState) {
      window.removeEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
      window.addEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
      window.dispatchEvent(new CustomEvent<SubscribedEventDetails>(HookEvents.SUBSCRIBED, {
        detail: {
          hook: DomElementManipulationHooks.CHAT_MESSAGE,
          hookArguments: {
            messageIds,
          } as ChatMessageDomElementsArguments,
        },
      }));
    }
  }, [messageIdsState]);
  if (sortedStringify(messageIds) !== sortedStringify(messageIdsState)) {
    setMessageIdsState(messageIds);
  }
  return domElement;
};
