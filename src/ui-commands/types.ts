import { UiCommandsChatObject } from './chat/types';
import { UiCommandsExternalVideoObject } from './external-video/types';
import { UiCommandsSidekickContentObject } from './sidekick-content/types';

export interface UiCommands {
  chat: UiCommandsChatObject;
  externalVideo: UiCommandsExternalVideoObject;
  sidekickContent: UiCommandsSidekickContentObject
}
