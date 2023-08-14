import { useState, useEffect } from 'react';
import { Internal } from '../../index';
import { CurrentPresentation } from '../../types';
import { CustomEventHookWrapper } from '../../types/common';

const useCurrentPresentation: () => CurrentPresentation | undefined = () => {
  const [presentationInfo, setPresentationInfo] = useState<CurrentPresentation | undefined>();
  const handleCurrentPresentationUpdateEvent: EventListener = (
    (event: CustomEventHookWrapper<CurrentPresentation>) => {
      if (event.detail.hook === Internal.BbbHooks.UseCurrentPresentation) {
        setPresentationInfo(event.detail.data);
      }
    }) as EventListener;

  useEffect(() => {
    window.addEventListener(Internal.BbbHookEvents.Update, handleCurrentPresentationUpdateEvent);
    window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Subscribe, {
      detail: { hook: Internal.BbbHooks.UseCurrentPresentation },
    }));
    return () => {
      window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Unsubscribe, {
        detail: { hook: Internal.BbbHooks.UseCurrentPresentation },
      }));
      window.removeEventListener(
        Internal.BbbHookEvents.Update,
        handleCurrentPresentationUpdateEvent,
      );
    };
  }, []);
  return presentationInfo;
};

export default useCurrentPresentation;
