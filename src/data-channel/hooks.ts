import { useState, useEffect } from 'react';
import {
  DataChannelMessagesWrapper,
  DispatcherFunction,
  UseDataChannelStaticFunction,
} from './types';
import {
  GraphqlResponseWrapper,
} from '../index';
import {
  HookEvents, Hooks,
} from '../core/enum';
import { PluginApi } from '../core/api/types';
import {
  HookEventWrapper, SubscribedEventDetails, UnsubscribedEventDetails, UpdatedEventDetails,
} from '../core/types';

export const createChannelIdentifier = (channelName: string, pluginName: string) => `${channelName}::${pluginName}`;

export const useDataChannel = (<T>(channelName: string,
  pluginName: string, pluginApi: PluginApi,
  ) => {
  const [data, setData] = useState<GraphqlResponseWrapper<DataChannelMessagesWrapper<T>>>(
    { loading: true },
  );
  const [dispatcherFunction, setDispatcherFunction] = useState<DispatcherFunction>();

  const channelIdentifier = createChannelIdentifier(channelName, pluginName);

  const handleDataChange: EventListener = ((
    customEvent: HookEventWrapper<GraphqlResponseWrapper<DataChannelMessagesWrapper<T>>>,
  ) => {
    const eventDetail = customEvent.detail as UpdatedEventDetails<
      GraphqlResponseWrapper<DataChannelMessagesWrapper<T>>
    >;
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
}) as UseDataChannelStaticFunction;
