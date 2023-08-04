import { useState, useEffect } from 'react';
import { Internal } from '../../index';
import { Presentation } from '../../types';
import { CustomEventHookWrapper } from '../../types/common';

const useCurrentPresentation: () => Presentation | undefined = () => {
  const [presentationInfo, setPresentationInfo] = useState<Presentation | undefined>();
  const handleCurrentPresentationUpdateEvent: EventListener = (
    (event: CustomEventHookWrapper<Presentation>) => {
      if (event.detail.hook === Internal.BbbHooks.UseCurrentPresentation) {
        setPresentationInfo(event.detail.data);
      }
    }) as EventListener;

  useEffect(() => {
    window.addEventListener(Internal.BbbHookEvents.Update, handleCurrentPresentationUpdateEvent);
    window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.NewSubscriber, {
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
