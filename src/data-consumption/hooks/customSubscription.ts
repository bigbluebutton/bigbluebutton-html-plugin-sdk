import { useState, useEffect } from 'react';
import { Internal } from '../../index';
import { CustomEventHookWrapper } from '../../types/common';

// It is necessary to have the most generic type possible here
// therefore we disable the es-lint rule for this file
/* eslint-disable @typescript-eslint/no-explicit-any */
const useCustomSubscription: (query: string) => any = (query: string) => {
  const [customDataInfo, setCustomDataInfo] = useState<any>();
  const [queryState, setQueryState] = useState<string>(query);

  const handleCustomSubscriptionUpdateEvent: EventListener = (
    (event: CustomEventHookWrapper<any>) => {
      if (event.detail.hook === Internal.BbbHooks.UseCustomSubscription
        && event.detail.parameter === queryState) {
        setCustomDataInfo(event.detail.data);
      }
    }) as EventListener;

  if (query !== queryState) {
    setQueryState(query);
  }
  useEffect(() => {
    window.addEventListener(Internal.BbbHookEvents.Update, handleCustomSubscriptionUpdateEvent);
    window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Subscribe, ({
      detail: { hook: Internal.BbbHooks.UseCustomSubscription, parameter: query },
    }) as CustomEventHookWrapper<string>));
    return () => {
      window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Unsubscribe, {
        detail: { hook: Internal.BbbHooks.UseCustomSubscription, parameter: query },
      }));
      window.removeEventListener(
        Internal.BbbHookEvents.Update,
        handleCustomSubscriptionUpdateEvent,
      );
    };
  }, [queryState]);
  return customDataInfo;
};

export {
  useCustomSubscription,
};
/* eslint-disable @typescript-eslint/no-explicit-any */
