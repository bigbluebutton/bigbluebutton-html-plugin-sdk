import {
  DeletionObject,
} from './types';
import {
  HookEvents,
} from '../core/enum';
import {
  UpdatedEventDetails,
} from '../core/types';
import { DataChannelHooks } from './enums';
import { RESET_DATA_CHANNEL } from './constants';

export const createChannelIdentifier = (channelName: string, pluginName: string) => `${channelName}::${pluginName}`;

export const deletionFunctionUtil = (
  deletionObjects: DeletionObject[],
  channelName: string,
  pluginName: string,
) => {
  deletionObjects.forEach((deletionObject) => {
    if (deletionObject === RESET_DATA_CHANNEL) {
      window.dispatchEvent(new CustomEvent<UpdatedEventDetails<void>>(HookEvents.UPDATED, {
        detail: {
          hook: DataChannelHooks.DATA_CHANNEL_RESET,
          hookArguments: { channelName, pluginName },
          data: undefined,
        },
      }));
    } else {
      window.dispatchEvent(new CustomEvent<UpdatedEventDetails<string>>(HookEvents.UPDATED, {
        detail: {
          hook: DataChannelHooks.DATA_CHANNEL_DELETE,
          hookArguments: { channelName, pluginName },
          data: deletionObject,
        },
      }));
    }
  });
};
