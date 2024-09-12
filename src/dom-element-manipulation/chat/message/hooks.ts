import {
  useEffect, useState,
  useRef, useMemo,
} from 'react';
import { DomElementManipulationHooks } from '../../enums';
import { HookEvents } from '../../../core/enum';
import {
  HookEventWrapper, SubscribedEventDetails, UnsubscribedEventDetails, UpdatedEventDetails,
} from '../../../core/types';
import {
  ChatMessageDomElementsArguments,
  RenderedChatMessages,
  UpdatedEventDetailsForChatMessageDomElements,
} from './types';
import { sortedStringify } from '../../../data-consumption/utils';

const messageIdFromDomElement = (element: HTMLDivElement) => (element?.getAttribute('data-chat-message-id') || '');

export const useChatMessageDomElements = (messageIds: string[], pluginUuid: string) => {
  const [domElements, setDomElements] = useState<RenderedChatMessages>([]);
  const previousMessageIds = useRef<string[]>([]);

  const handleDomElementUpdateEvent: EventListener = (
      (event: HookEventWrapper<
        UpdatedEventDetails<UpdatedEventDetailsForChatMessageDomElements>>) => {
        const detail = event.detail as UpdatedEventDetails<
        UpdatedEventDetailsForChatMessageDomElements>;
        if (detail.hook === DomElementManipulationHooks.CHAT_MESSAGE) {
          const pageToUpdate = detail.data?.page;
          if (detail.data?.messages.length === 0) {
            // indicates the page was unmounted in the client
            // so we remove all stored elements for that page,
            // since they might be invalid.
            delete domElements[pageToUpdate];
            return;
          }

          const pageDomElementsFromBbbCore = detail.data?.messages.map(
            (item) => item.message,
          );
          const receivedAnythingNew = pageDomElementsFromBbbCore.some(
            (pageDomElement) => (
              !domElements[pageToUpdate]?.includes(pageDomElement)),
          );
          if (receivedAnythingNew) {
            setDomElements((domElementsState) => ({
              ...domElementsState,
              [pageToUpdate]: pageDomElementsFromBbbCore,
            }));
          }
        }
      }) as EventListener;
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent<SubscribedEventDetails>(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, {
        detail: {
          hook: DomElementManipulationHooks.CHAT_MESSAGE,
          hookArguments: {
            messageIds,
            pluginUuid,
          } as ChatMessageDomElementsArguments,
        },
      }),
    );
    window.addEventListener(HookEvents.BBB_CORE_SENT_NEW_DATA, handleDomElementUpdateEvent);
    return () => {
      window.dispatchEvent(
        new CustomEvent<UnsubscribedEventDetails>(HookEvents.PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE, {
          detail: {
            hook: DomElementManipulationHooks.CHAT_MESSAGE,
            hookArguments: {
              messageIds,
              pluginUuid,
            } as ChatMessageDomElementsArguments,
          },
        }),
      );
    };
  }, []);

  useEffect(() => {
    window.addEventListener(HookEvents.BBB_CORE_SENT_NEW_DATA, handleDomElementUpdateEvent);
    // Runs on code cleanup
    return () => {
      // On every `domElements` update, the event listener is removed and re-added to ensure
      // the handler has access to the latest `domElements` state value.
      window.removeEventListener(HookEvents.BBB_CORE_SENT_NEW_DATA, handleDomElementUpdateEvent);
    };
  }, [domElements]);

  const updateRequestedIds = () => {
    previousMessageIds.current = messageIds;
    window.dispatchEvent(
      new CustomEvent<
        UpdatedEventDetails<void>>(HookEvents.PLUGIN_SENT_CHANGES_TO_BBB_CORE, {
          detail: {
            hook: DomElementManipulationHooks.CHAT_MESSAGE,
            hookArguments: {
              messageIds,
              pluginUuid,
            } as ChatMessageDomElementsArguments,
            data: undefined,
          },
        }),
    );
  };

  if (sortedStringify((messageIds) || []) !== sortedStringify(previousMessageIds.current)) {
    updateRequestedIds();
  }

  const flattenDomElements = useMemo(() => (
    Object.values(domElements).filter((i) => Array.isArray(i)).flat()
  ), [domElements]);
  return flattenDomElements.filter((domElement) => (
    messageIds.includes(messageIdFromDomElement(domElement))
  ));
};
