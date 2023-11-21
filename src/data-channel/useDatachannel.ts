import { useState, useEffect } from 'react';
import {
  DispatcherFunction,
  UseDataChannelAuxiliary,
  PluginApi,
  HookEventWrapper,
  UpdatedEventDetails,
  SubscribedEventDetails,
  UnsubscribedEventDetails,
} from '../index';
import {
  HookEvents, Hooks,
} from '../core/enum';

const createChannelIdentifier = (channelName: string, pluginName: string) => `${channelName}::${pluginName}`;

const useDataChannel = (<T>(channelName: string,
  pluginName: string, pluginApi: PluginApi,
  ) => {
  const [data, setData] = useState<T>();
  const [dispatcherFunction, setDispatcherFunction] = useState<DispatcherFunction>();

  const channelIdentifier = createChannelIdentifier(channelName, pluginName);

  const handleDataChange: EventListener = ((customEvent: HookEventWrapper<T>) => {
    const eventDetail = customEvent.detail as UpdatedEventDetails<T>;
    setData(eventDetail.data);
  }) as EventListener;

  const handleListenToChangeDisPatcherFunction: EventListener = (
    () => {
      setDispatcherFunction(() => pluginApi.mapOfDispatchers[channelIdentifier]);
      window.removeEventListener(
        `${channelIdentifier}::dispatcherFunction`,
        handleListenToChangeDisPatcherFunction,
      );
    }) as EventListener;
  useEffect(() => {
    window.addEventListener(channelIdentifier, handleDataChange);
    window.addEventListener(
      `${channelIdentifier}::dispatcherFunction`,
      handleListenToChangeDisPatcherFunction,
    );

    window.dispatchEvent(new CustomEvent<SubscribedEventDetails>(HookEvents.SUBSCRIBED, {
      detail: {
        hook: Hooks.DATA_CHANNEL,
        hookArguments: { channelName, pluginName },
      },
    }));
    return () => {
      window.dispatchEvent(new CustomEvent<UnsubscribedEventDetails>(HookEvents.UNSUBSCRIBED, {
        detail: {
          hook: Hooks.DATA_CHANNEL,
          hookArguments: { channelName, pluginName },
        },
      }));
      window.removeEventListener(channelIdentifier, handleDataChange);
    };
  }, []);
  return [data, dispatcherFunction];
}) as UseDataChannelAuxiliary;

export {
  createChannelIdentifier,
  useDataChannel,
};
