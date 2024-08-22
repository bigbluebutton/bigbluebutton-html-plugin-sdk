import { useEffect, useRef, useState } from 'react';
import { DomElementManipulationHooks } from '../enums';
import { HookEvents } from '../../core/enum';
import {
  HookEventWrapper, SubscribedEventDetails, UnsubscribedEventDetails, UpdatedEventDetails,
} from '../../core/types';
import { UserCameraDomElementsArguments, UpdatedDataForUserCameraDomElement } from './types';
import { sortedStringify } from '../../data-consumption/utils';

export const useUserCameraDomElements = (streamIds: string[], pluginUuid: string) => {
  const [domElement, setDomElement] = useState<HTMLDivElement[]>();
  const [streamIdsState, setStreamIdsState] = useState<string[]>((streamIds) || []);
  const previousNeededIds = useRef<string[]>([]);

  const handleDomElementUpdateEvent: EventListener = (
    (event: HookEventWrapper<
      UpdatedEventDetails<UpdatedDataForUserCameraDomElement[]>>) => {
      const detail = event.detail as UpdatedEventDetails<
      UpdatedDataForUserCameraDomElement[]>;
      if (detail.hook === DomElementManipulationHooks.USER_CAMERA) {
        const filteredDataFromBbbCore = detail.data?.filter(
          (item) => streamIdsState.includes(item.streamId),
        ) || [];
        const filteredStreamIdsFromBbbCore = filteredDataFromBbbCore.map((item) => item.streamId);
        if (sortedStringify(filteredStreamIdsFromBbbCore)
          !== sortedStringify(previousNeededIds.current)) {
          previousNeededIds.current = [...filteredStreamIdsFromBbbCore];
          setDomElement(
            filteredDataFromBbbCore.map((userCamera) => userCamera.userCameraDomElement),
          );
        }
      }
    }) as EventListener;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent<SubscribedEventDetails>(HookEvents.PLUGIN_SUBSCRIBED_TO_BBB_CORE, {
        detail: {
          hook: DomElementManipulationHooks.USER_CAMERA,
          hookArguments: {
            streamIds: streamIdsState,
            pluginUuid,
          } as UserCameraDomElementsArguments,
        },
      }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent<UnsubscribedEventDetails>(HookEvents.PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE, {
          detail: {
            hook: DomElementManipulationHooks.USER_CAMERA,
            hookArguments: {
              streamIds,
              pluginUuid,
            } as UserCameraDomElementsArguments,
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
            hook: DomElementManipulationHooks.USER_CAMERA,
            hookArguments: {
              streamIds: (streamIdsState) || [],
              pluginUuid,
            } as UserCameraDomElementsArguments,
            data: undefined,
          },
        }),
    );
    // Runs on code cleanup
    return () => {
      // Everytime the state update, we remove the eventListener and then we re-add it.
      window.removeEventListener(HookEvents.BBB_CORE_SENT_NEW_DATA, handleDomElementUpdateEvent);
    };
  }, [streamIdsState]);

  if (sortedStringify((streamIds) || []) !== sortedStringify(streamIdsState)) {
    setStreamIdsState((streamIds) || []);
  }
  return domElement;
};
