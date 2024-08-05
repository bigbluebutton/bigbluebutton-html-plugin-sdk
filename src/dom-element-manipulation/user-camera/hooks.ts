import { useEffect, useState } from 'react';
import { DomElementManipulationHooks } from '../enums';
import { HookEvents } from '../../core/enum';
import {
  HookEventWrapper, SubscribedEventDetails, UnsubscribedEventDetails, UpdatedEventDetails,
} from '../../core/types';
import { UserCameraDomElementsArguments, UpdatedEventDetailsForUserCameraDomElement } from './types';
import { sortedStringify } from '../../data-consumption/utils';

export const useUserCameraDomElements = (streamIds: string[]) => {
  const [domElement, setDomElement] = useState<HTMLDivElement[]>();
  const [streamIdsState, setStreamIdsState] = useState<string[]>(streamIds);

  const handleCustomSubscriptionUpdateEvent: EventListener = (
    (event: HookEventWrapper<
      UpdatedEventDetails<UpdatedEventDetailsForUserCameraDomElement[]>>) => {
      const detail = event.detail as UpdatedEventDetails<
        UpdatedEventDetailsForUserCameraDomElement[]>;
      if (detail.hook === DomElementManipulationHooks.USER_CAMERA
        && sortedStringify(
          detail.data.map((userCamera) => userCamera.streamId),
        ) === sortedStringify(streamIdsState)) {
        setDomElement(detail.data.map((userCamera) => userCamera.userCameraDomElement));
      }
    }) as EventListener;

  useEffect(() => {
    if (streamIdsState) {
      window.addEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
      return () => {
        window.removeEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
        window.dispatchEvent(new CustomEvent<UnsubscribedEventDetails>(HookEvents.UNSUBSCRIBED, {
          detail: {
            hook: DomElementManipulationHooks.USER_CAMERA,
            hookArguments: {
              streamIds,
            } as UserCameraDomElementsArguments,
          },
        }));
      };
    }
    return () => {};
  }, []);
  useEffect(() => {
    if (streamIdsState) {
      window.removeEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
      window.addEventListener(HookEvents.UPDATED, handleCustomSubscriptionUpdateEvent);
      window.dispatchEvent(new CustomEvent<SubscribedEventDetails>(HookEvents.SUBSCRIBED, {
        detail: {
          hook: DomElementManipulationHooks.USER_CAMERA,
          hookArguments: {
            streamIds: streamIdsState,
          } as UserCameraDomElementsArguments,
        },
      }));
    }
  }, [streamIdsState]);
  if (sortedStringify(streamIds) !== sortedStringify(streamIdsState)) {
    setStreamIdsState(streamIds);
  }
  return domElement;
};
