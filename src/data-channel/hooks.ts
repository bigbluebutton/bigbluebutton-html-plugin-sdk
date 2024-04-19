import { useState, useEffect } from 'react';
import {
  ObjectToDelete,
  PushFunction,
  UseDataChannelStaticFunction,
  DataChannelEntryResponseType,
  DataChannelArguments,
  DeleteFunction,
} from './types';
import {
  GraphqlResponseWrapper,
} from '../index';
import {
  HookEvents,
} from '../core/enum';
import { PluginApi } from '../core/api/types';
import {
  HookEventWrapper, SubscribedEventDetails, UnsubscribedEventDetails, UpdatedEventDetails,
} from '../core/types';
import { DataChannelHooks, DataChannelTypes } from './enums';
import { createChannelIdentifier, deleteFunctionUtil } from './utils';

export const useDataChannelGeneral = (<T>(
  channelName: string, subChannelName: string,
  pluginName: string, pluginApi: PluginApi,
  dataChannelType: DataChannelTypes,
  ) => {
  const [data, setData] = useState<GraphqlResponseWrapper<DataChannelEntryResponseType<T>[]>>(
    { loading: true },
  );
  const [pushFunction, setPushFunction] = useState<PushFunction<T>>();

  const deleteFunction: DeleteFunction = (
    objectToDelete: ObjectToDelete[],
  ) => deleteFunctionUtil(objectToDelete, channelName, subChannelName, pluginName);

  const channelIdentifier = createChannelIdentifier(channelName, subChannelName, pluginName);

  const handleDataChange: EventListener = ((
    customEvent: HookEventWrapper<GraphqlResponseWrapper<DataChannelEntryResponseType<T>[]>>,
  ) => {
    const eventDetail = customEvent.detail as UpdatedEventDetails<
      GraphqlResponseWrapper<DataChannelEntryResponseType<T>[]>
    >;
    const hookArguments = eventDetail?.hookArguments as DataChannelArguments;
    if (hookArguments?.dataChannelType === dataChannelType) {
      setData(eventDetail.data);
    }
  }) as EventListener;

  const handleListenToChangePushFunction: EventListener = (
    () => {
      setPushFunction(() => pluginApi.mapOfPushFunctions[channelIdentifier]);
      window.removeEventListener(
        `${channelIdentifier}::pushFunction`,
        handleListenToChangePushFunction,
      );
    }) as EventListener;
  useEffect(() => {
    window.addEventListener(channelIdentifier, handleDataChange);
    window.addEventListener(
      `${channelIdentifier}::pushFunction`,
      handleListenToChangePushFunction,
    );

    window.dispatchEvent(new CustomEvent<SubscribedEventDetails>(HookEvents.SUBSCRIBED, {
      detail: {
        hook: DataChannelHooks.DATA_CHANNEL_BUILDER,
        hookArguments: {
          channelName, pluginName, dataChannelType, subChannelName,
        },
      },
    }));
    return () => {
      window.dispatchEvent(new CustomEvent<UnsubscribedEventDetails>(HookEvents.UNSUBSCRIBED, {
        detail: {
          hook: DataChannelHooks.DATA_CHANNEL_BUILDER,
          hookArguments: {
            channelName, pluginName, dataChannelType, subChannelName,
          },
        },
      }));
      window.removeEventListener(channelIdentifier, handleDataChange);
    };
  }, []);
  return [data, pushFunction, deleteFunction];
}) as UseDataChannelStaticFunction;
