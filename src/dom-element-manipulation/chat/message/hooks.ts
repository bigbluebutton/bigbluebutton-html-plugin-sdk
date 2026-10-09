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

const isSameElementList = (a: HTMLDivElement[], b: HTMLDivElement[]) => (
  a.length === b.length && a.every((element, index) => element === b[index])
);

export const useChatMessageDomElements = (messageIds: string[], pluginUuid: string) => {
  const [domElements, setDomElements] = useState<RenderedChatMessages>({});
  const requestedMessageIds = useRef<string[]>([]);

  useEffect(() => {
    // The client sends every rendered element requested by any plugin for the page,
    // so the payload is authoritative: it replaces the page in either direction.
    const handleDomElementUpdateEvent: EventListener = (
      (event: HookEventWrapper<
        UpdatedEventDetails<UpdatedEventDetailsForChatMessageDomElements>>) => {
        const detail = event.detail as UpdatedEventDetails<
        UpdatedEventDetailsForChatMessageDomElements>;
        if (detail.hook !== DomElementManipulationHooks.CHAT_MESSAGE) return;
        const pageToUpdate = detail.data?.page;
        if (pageToUpdate === undefined) return;

        const pageDomElementsFromBbbCore = detail.data.messages
          .filter((item) => requestedMessageIds.current.includes(item.messageId))
          .map((item) => item.message);
        setDomElements((domElementsState) => {
          if (isSameElementList(domElementsState[pageToUpdate] ?? [], pageDomElementsFromBbbCore)) {
            return domElementsState;
          }
          return {
            ...domElementsState,
            [pageToUpdate]: pageDomElementsFromBbbCore,
          };
        });
      }) as EventListener;

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
      window.removeEventListener(HookEvents.BBB_CORE_SENT_NEW_DATA, handleDomElementUpdateEvent);
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

  const updateRequestedIds = () => {
    requestedMessageIds.current = messageIds;
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

  if (sortedStringify((messageIds) || []) !== sortedStringify(requestedMessageIds.current)) {
    updateRequestedIds();
  }

  const flattenDomElements = useMemo(() => (
    Object.values(domElements).filter((i) => Array.isArray(i)).flat()
  ), [domElements]);
  return flattenDomElements.filter((domElement) => (
    messageIds.includes(messageIdFromDomElement(domElement))
  ));
};
