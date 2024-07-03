import { GraphqlResponseWrapper, PluginApi } from '..';
import { DataChannelPushEntryFunctionUserRole, DataChannelTypes } from './enums';
import { RESET_DATA_CHANNEL } from './constants';

export interface DataChannelArguments {
  dataChannelType?: DataChannelTypes;
  pluginName: string;
  channelName: string;
  subChannelName: string;
}

/**
 * Type to specify the useId that will be able to receive the data sent in the push function.
 */
export interface ToUserId {
  userId: string;
}

/**
 * Type to specify the role that will be able to receive the data sent in the push function.
 */
export interface ToRole {
  role: DataChannelPushEntryFunctionUserRole;
}

export type ObjectTo = ToUserId | ToRole;

export type ObjectToDelete = typeof RESET_DATA_CHANNEL | string;

export interface PushEntryFunctionOptionArgument {
  receivers?: ObjectTo[];
  record?: boolean;
  analytics?: boolean;
}

export type PushEntryFunction<T = object> = (
  objectToBePushed: T, options?: PushEntryFunctionOptionArgument,
) => void;

export type DeleteEntryFunction = (objectToDelete: ObjectToDelete[]) => void;

export type ReplaceEntryFunction<T = object> = (entryId: string, payloadJson: T) => void;

export interface ReplaceEntryFunctionArguments<T> {
  entryId: string;
  payloadJson: T;
}

export interface MapOfPushEntryFunctions {
  [key: string]: PushEntryFunction;
}

export interface DataChannelEntryResponseType<T> {
  createdAt: string;
  channelName: string;
  subChannelName: string;
  fromUserId: string;
  entryId: string;
  payloadJson: T;
  pluginName: string;
  toRoles: string[];
}

export interface UseDataChannelReturnType <T>{
  data: GraphqlResponseWrapper<DataChannelEntryResponseType<T>[]>,
  pushEntry: PushEntryFunction<T>,
  deleteEntry: DeleteEntryFunction,
  replaceEntry: ReplaceEntryFunction<T>,
}

export type UseDataChannelFunctionFromPluginApi = <T>(
  channelName: string, dataChannelType?: DataChannelTypes, subChannelName?: string,
) => UseDataChannelReturnType<T>;

export type UseDataChannelStaticFunction = <T>(
  channelName: string, subChannelName: string, pluginName: string,
  pluginApi: PluginApi, dataChannelType: DataChannelTypes,
) => UseDataChannelReturnType<T>;
