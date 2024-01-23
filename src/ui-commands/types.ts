import { UiCommandsChatObject } from './chat/types';
import { UiCommandsExternalVideoObject } from './external-video/types';

export interface UiCommandsEventWrapper<T> extends Event{
  detail: T;
}

export interface UiCommands {
  chat: UiCommandsChatObject;
  externalVideo: UiCommandsExternalVideoObject;
}
