import { Roles } from '..';

export interface ToUserId {
  userId: string;
}

export interface ToRole {
  role: Roles;
}

export type ObjectTo = ToUserId | ToRole;

export type DispatcherFunction = <T>(objectToDispatch: T, objectsTo?: ObjectTo[]) => void;

export interface DispatcherFunctionsMap {
  [key: string]: DispatcherFunction
}

export type UseDataChannel = <T>(
  channelName: string,
) => [T, DispatcherFunction];

export type UseDataChannelAuxiliary = <T>(
  channelName: string, pluginName: string,
) => [T, DispatcherFunction?];

export type UseDataChannelAPi = <T>(
  channelName: string
) => [T, DispatcherFunction?];
