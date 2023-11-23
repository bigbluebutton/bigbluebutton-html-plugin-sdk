import { GraphqlResponseWrapper, PluginApi } from '..';
import { DataChannelDispatcherUserRole } from './enums';

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

export type DispatcherFunction = <T>(objectToDispatch: T, objectsTo?: ObjectTo[]) => void;

export interface MapOfDispatchers {
  [key: string]: DispatcherFunction
}

export type UseDataChannelFunctionFromPluginApi = <T>(
  channelName: string,
) => [GraphqlResponseWrapper<T>, DispatcherFunction];

export type UseDataChannelStaticFunction = <T>(
  channelName: string, pluginName: string,
  pluginApi: PluginApi,
) => [GraphqlResponseWrapper<T>, DispatcherFunction?];
