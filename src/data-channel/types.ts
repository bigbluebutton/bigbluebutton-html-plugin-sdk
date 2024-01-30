import { GraphqlResponseWrapper, PluginApi } from '..';
import { DataChannelDispatcherUserRole } from './enums';
import { RESET_DATA_CHANNEL } from './constants';

export interface DataChannelArguments {
  pluginName: string;
  channelName: string;
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

export type DispatcherFunction = <T>(objectToDispatch: T, objectsTo?: ObjectTo[]) => void;

export type DeletionFunction = (deletionObjects: DeletionObject[]) => void;

export interface MapOfDispatchers {
  [key: string]: DispatcherFunction;
}

export interface DataChannelMessageResponseType<T> {
  createdAt: string;
  dataChannel: string;
  fromUserId: string;
  messageId: string;
  payloadJson: T;
  pluginName: string;
  toRoles: string[];
}

export interface DataChannelMessagesWrapper<T> {
  pluginDataChannelMessage: DataChannelMessageResponseType<T>[];
}

export type UseDataChannelFunctionFromPluginApi = <T>(
  channelName: string,
) => [GraphqlResponseWrapper<DataChannelMessagesWrapper<T>>, DispatcherFunction, DeletionFunction];

export type UseDataChannelStaticFunction = <T>(
  channelName: string, pluginName: string,
  pluginApi: PluginApi,
) => [GraphqlResponseWrapper<DataChannelMessagesWrapper<T>>, DispatcherFunction?, DeletionFunction?];
