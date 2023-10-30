import { useState, useEffect } from 'react';
import { Internal } from '../../../index';
import { UserOverview } from './types';
import { CustomEventHookWrapper } from '../../../types/common';

export const useUsersOverview: () => UserOverview[] | undefined = () => {
  const [userInfo, setUserInfo] = useState<UserOverview[] | undefined>();
  const handleGetUsersUpdateEvent: EventListener = (
    (event: CustomEventHookWrapper<UserOverview[]>) => {
      if (event.detail.hook === Internal.BbbHooks.UseUsersOverview) {
        setUserInfo(event.detail.data);
      }
    }) as EventListener;
  useEffect(() => {
    window.addEventListener(Internal.BbbHookEvents.Update, handleGetUsersUpdateEvent);
    window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Subscribe, {
      detail: { hook: Internal.BbbHooks.UseUsersOverview },
    }));
    return () => {
      window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Unsubscribe, {
        detail: { hook: Internal.BbbHooks.UseUsersOverview },
      }));
      window.removeEventListener(
        Internal.BbbHookEvents.Update,
        handleGetUsersUpdateEvent,
      );
    };
  }, []);

  return userInfo;
};
