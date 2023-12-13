import { UiCommandsChatObject } from './chat/types';

export interface UiCommandsEventWrapper<T> extends Event{
  detail: T;
}

export interface UiCommands {
  chat: UiCommandsChatObject;
}
