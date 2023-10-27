import { PluginApi, Role } from '..';

export interface ToUserId {
  userId: string;
}

export interface ToRole {
  role: Role;
}

export type ObjectTo = ToUserId | ToRole;

export type DispatcherFunction = <T>(objectToDispatch: T, objectsTo?: ObjectTo[]) => void;

export interface MapOfDispatchers {
  [key: string]: DispatcherFunction
}

export type UseDataChannel = <T>(
  channelName: string,
) => [T, DispatcherFunction];

export type UseDataChannelAuxiliary = <T>(
  channelName: string, pluginName: string,
  pluginApi: PluginApi,
) => [T, DispatcherFunction?];

export type UseDataChannelAPi = <T>(
  channelName: string
) => [T, DispatcherFunction?];
