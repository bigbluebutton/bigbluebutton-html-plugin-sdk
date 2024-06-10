import { UiCommandsChatObject } from './chat/types';
import { UiCommandsExternalVideoObject } from './external-video/types';
import { UiCommandsUserListObject } from './user-list/types';

export interface UiCommands {
  chat: UiCommandsChatObject;
  externalVideo: UiCommandsExternalVideoObject;
  userList: UiCommandsUserListObject;
}
