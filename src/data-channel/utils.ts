import {
  DataChannelEntryResponseType,
  DeletionObject,
} from './types';
import {
  HookEvents,
} from '../core/enum';
import {
  GraphqlResponseWrapper,
  UpdatedEventDetails,
} from '../core/types';
import { DataChannelHooks } from './enums';
import { RESET_DATA_CHANNEL } from './constants';

export const createChannelIdentifier = (channelName: string, subChannelName: string, pluginName: string) => `${channelName}::${subChannelName}::${pluginName}`;

export const formatResponseForPubSubOrKeyValue = <T>(
  dataResult: GraphqlResponseWrapper<DataChannelEntryResponseType<T>[]>,
): GraphqlResponseWrapper<DataChannelEntryResponseType<T>> => ({
    ...dataResult,
    data: dataResult.data ? dataResult.data[0] : undefined,
  });

export const deletionFunctionUtil = (
  deletionObjects: DeletionObject[],
  channelName: string,
  subChannelName: string,
  pluginName: string,
) => {
  deletionObjects.forEach((deletionObject) => {
    if (deletionObject === RESET_DATA_CHANNEL) {
      window.dispatchEvent(new CustomEvent<UpdatedEventDetails<void>>(HookEvents.UPDATED, {
        detail: {
          hook: DataChannelHooks.DATA_CHANNEL_RESET,
          hookArguments: { channelName, pluginName, subChannelName },
          data: undefined,
        },
      }));
    } else {
      window.dispatchEvent(new CustomEvent<UpdatedEventDetails<string>>(HookEvents.UPDATED, {
        detail: {
          hook: DataChannelHooks.DATA_CHANNEL_DELETE,
          hookArguments: { channelName, pluginName, subChannelName },
          data: deletionObject,
        },
      }));
    }
  });
};
