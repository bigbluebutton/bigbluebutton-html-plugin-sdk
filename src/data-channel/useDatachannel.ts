import { useState, useEffect } from 'react';
import {
  CustomEventHookWrapper, Internal,
  DispatcherFunction,
  UseDataChannelAuxiliary,
  PluginApi,
} from '../index';

const createChannelIdentifier = (channelName: string, pluginName: string) => `${channelName}::${pluginName}`;

const useDataChannel = (<T>(channelName: string,
  pluginName: string, pluginApi: PluginApi,
  ) => {
  const [data, setData] = useState<T>();
  const [dispatcherFunction, setDispatcherFunction] = useState<DispatcherFunction>();

  const channelIdentifier = createChannelIdentifier(channelName, pluginName);

  const handleDataChange: EventListener = ((customEvent: CustomEventHookWrapper<T>) => {
    setData(customEvent.detail.data);
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

    window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Subscribe, {
      detail: {
        hook: Internal.BbbDataChannel.UseDataChannel,
        parameters: { channelName, pluginName },
      },
    }));
    return () => {
      window.dispatchEvent(new CustomEvent(Internal.BbbHookEvents.Unsubscribe, {
        detail: {
          hook: Internal.BbbDataChannel.UseDataChannel,
          parameters: { channelName, pluginName },
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
