import { UiCommandsChatObject } from './chat/types';
import { UiCommandsExternalVideoObject } from './external-video/types';
import { UiCommandsSidekickOptionsContainerObject } from './sidekick-options-container/types';
import { UiCommandsPresentationAreaObject } from './presentation-area/types';
import { UiCommandsUserStatusObject } from './user-status/types';
import { UiCommandsConferenceObject } from './conference/types';
import { UiCommandsNotificationObject } from './notification/types';
import { UiCommandsActionsBarObject } from './actions-bar/types';
import { UiCommandsLayoutObject } from './layout/types';
import { UiCommandsNavBarObject } from './nav-bar/types';
import { UiCommandsCameraObject } from './camera/types';
import { UiCommandsSidekickArea } from './sidekick-area/types';

export interface UiCommands {
  layout: UiCommandsLayoutObject;
  actionsBar: UiCommandsActionsBarObject;
  camera: UiCommandsCameraObject;
  chat: UiCommandsChatObject;
  externalVideo: UiCommandsExternalVideoObject;
  sidekickOptionsContainer: UiCommandsSidekickOptionsContainerObject;
  sidekickArea: UiCommandsSidekickArea;
  navBar: UiCommandsNavBarObject;
  presentationArea: UiCommandsPresentationAreaObject;
  userStatus: UiCommandsUserStatusObject;
  conference: UiCommandsConferenceObject;
  notification: UiCommandsNotificationObject;
}
