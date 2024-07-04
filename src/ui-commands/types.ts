import { UiCommandsChatObject } from './chat/types';
import { UiCommandsExternalVideoObject } from './external-video/types';
import { UiCommandsSidekickOptionsContainerObject } from './sidekick-options-container/types';
import { UiCommandsPresentationAreaObject } from './presentation-area/types';

export interface UiCommands {
  chat: UiCommandsChatObject;
  externalVideo: UiCommandsExternalVideoObject;
  sidekickOptionsContainer: UiCommandsSidekickOptionsContainerObject;
  presentationArea: UiCommandsPresentationAreaObject;
}
