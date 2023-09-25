import { useState, useEffect } from 'react';
import { Internal } from '../../index';
import { User } from '../../types';
import { CustomEventHookWrapper } from '../../types/common';

const useLoadedUserList: () => User[] | undefined = () => {
  const [userInfo, setUserInfo] = useState<User[] | undefined>();
  const handleLoadedUserListUpdateEvent: EventListener = (
    (event: CustomEventHookWrapper<User[]>) => {
      if (event.detail.hook === Internal.BbbHooks.UseLoadedUserList) {
        setUserInfo(event.detail.data);
      }
    }) as EventListener;
  useEffect(() => {
    window.addEventListener(Internal.BbbHookEvents.Update, handleLoadedUserListUpdateEvent);
    window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Subscribe, {
      detail: { hook: Internal.BbbHooks.UseLoadedUserList },
    }));
    return () => {
      window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Unsubscribe, {
        detail: { hook: Internal.BbbHooks.UseLoadedUserList },
      }));
      window.removeEventListener(
        Internal.BbbHookEvents.Update,
        handleLoadedUserListUpdateEvent,
      );
    };
  }, []);

  return userInfo;
};

const useCurrentUser: () => User | undefined = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const handleCurrentUserUpdateEvent: EventListener = (
    (event: CustomEventHookWrapper<User>) => {
      if (event.detail.hook === Internal.BbbHooks.UseCurrentUser) {
        setUserInfo(event.detail.data);
      }
    }) as EventListener;
  useEffect(() => {
    window.addEventListener(Internal.BbbHookEvents.Update, handleCurrentUserUpdateEvent);
    window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Subscribe, {
      detail: { hook: Internal.BbbHooks.UseCurrentUser },
    }));
    return () => {
      window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Unsubscribe, {
        detail: { hook: Internal.BbbHooks.UseCurrentUser },
      }));
      window.removeEventListener(
        Internal.BbbHookEvents.Update,
        handleCurrentUserUpdateEvent,
      );
    };
  }, []);

  return userInfo;
};

export {
  useLoadedUserList,
  useCurrentUser,
};
