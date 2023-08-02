import { useState, useEffect } from 'react';
import { Internal } from '../../index';
import { User } from '../../types';
import { CustomEventHookWrapper } from '../../types/common';

const useLoadedUserList: () => User[] | undefined = () => {
  const [userInfo, setUserInfo] = useState<User[] | undefined>();
  const handleCurrentUserUpdateEvent: EventListener = (
    (event: CustomEventHookWrapper<User[]>) => {
      if (event.detail.hook === Internal.BbbHooks.UseLoadedUserList) {
        setUserInfo(event.detail.data);
      }
    }) as EventListener;
  useEffect(() => {
    window.addEventListener(Internal.BbbHookEvents.Update, handleCurrentUserUpdateEvent);
    window.dispatchEvent(new Event(Internal.BbbHookEvents.NewSubscriber));
    return () => {
      window.removeEventListener(
        Internal.BbbHookEvents.Update,
        handleCurrentUserUpdateEvent,
      );
    };
  }, []);

  return userInfo;
};

export default useLoadedUserList;
