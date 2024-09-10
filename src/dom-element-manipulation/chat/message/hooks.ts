import { useEffect, useRef, useState } from 'react';
import { DomElementManipulationHooks } from '../../enums';
import { HookEvents } from '../../../core/enum';
import {
  HookEventWrapper, SubscribedEventDetails, UnsubscribedEventDetails, UpdatedEventDetails,
} from '../../../core/types';
import { ChatMessageDomElementsArguments, UpdatedEventDetailsForChatMessageDomElements } from './types';
import { sortedStringify } from '../../../data-consumption/utils';

export const useChatMessageDomElements = (messageIds: string[], pluginUuid: string) => {
  const [domElement, setDomElement] = useState<HTMLDivElement[]>();
  const [messageIdsState, setMessageIdsState] = useState<string[]>((messageIds) || []);

  const previousNeededIds = useRef<string[]>();

  const handleDomElementUpdateEvent: EventListener = (
      (event: HookEventWrapper<
        UpdatedEventDetails<UpdatedEventDetailsForChatMessageDomElements[]>>) => {
        const detail = event.detail as UpdatedEventDetails<
        UpdatedEventDetailsForChatMessageDomElements[]>;
        if (detail.hook === DomElementManipulationHooks.CHAT_MESSAGE) {
          const filteredDataFromBbbCore = detail.data?.filter(
            (item) => messageIdsState.includes(item.messageId),
          ) || [];
          const filteredStreamIdsFromBbbCore = filteredDataFromBbbCore.map(
            (item) => item.messageId,
          );
          if (sortedStringify(filteredStreamIdsFromBbbCore)
            !== sortedStringify(previousNeededIds.current)) {
            previousNeededIds.current = [...filteredStreamIdsFromBbbCore];
            setDomElement(
              filteredDataFromBbbCore.map((messageItemFromCore) => messageItemFromCore.message),
            );
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
    // Runs on code cleanup
    return () => {
      // Everytime the state update, we remove the eventListener and then we re-add it.
      window.removeEventListener(HookEvents.BBB_CORE_SENT_NEW_DATA, handleDomElementUpdateEvent);
    };
  }, [messageIdsState]);
  if (sortedStringify((messageIds) || []) !== sortedStringify(messageIdsState)) {
    setMessageIdsState((messageIds) || []);
  }
  return domElement;
};
