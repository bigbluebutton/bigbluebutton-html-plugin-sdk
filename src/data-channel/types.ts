import { GraphqlResponseWrapper, PluginApi } from '..';
import { DataChannelDispatcherUserRole, DataChannelTypes } from './enums';
import { RESET_DATA_CHANNEL } from './constants';

export interface DataChannelArguments {
  dataChannelType?: DataChannelTypes;
  pluginName: string;
  channelName: string;
  subChannelName: string;
}

/**
 * Type to specify the useId that will be able to receive the data sent in the dispatcher function.
 */
export interface ToUserId {
  userId: string;
}

/**
 * Type to specify the role that will be able to receive the data sent in the dispatcher function.
 */
export interface ToRole {
  role: DataChannelDispatcherUserRole;
}

export type ObjectTo = ToUserId | ToRole;

export type DeletionObject = typeof RESET_DATA_CHANNEL | string;

export type PushFunction<T = object> = (objectToBePushed: T, receivers?: ObjectTo[]) => void;

export type DeletionFunction = (deletionObjects: DeletionObject[]) => void;

export interface MapOfPushFunctions {
  [key: string]: PushFunction;
}

export interface DataChannelEntryResponseType<T> {
  createdAt: string;
  channelName: string;
  fromUserId: string;
  entryId: string;
  payloadJson: T;
  pluginName: string;
  toRoles: string[];
}

export type UseDataChannelFunctionFromPluginApi = <T>(
  channelName: string, dataChannelType?: DataChannelTypes, subChannelName?: string,
) => [GraphqlResponseWrapper<DataChannelEntryResponseType<T>[]>,
  PushFunction<T>, DeletionFunction
];

export type UseDataChannelStaticFunction = <T>(
  channelName: string, subChannelName: string, pluginName: string,
  pluginApi: PluginApi, dataChannelType: DataChannelTypes,
) => [
  GraphqlResponseWrapper<DataChannelEntryResponseType<T>[]>,
  PushFunction<T>?, DeletionFunction?
];
