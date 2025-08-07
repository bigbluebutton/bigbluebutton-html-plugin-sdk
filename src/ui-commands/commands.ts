import { chat } from './chat/commands';
import { externalVideo } from './external-video/commands';
import { sidekickOptionsContainer } from './sidekick-options-container/commands';
import { presentationArea } from './presentation-area/commands';
import { userStatus } from './user-status/commands';
import { conference } from './conference/commands';
import { notification } from './notification/commands';
import { camera } from './camera/commands';
import { actionsBar } from './actions-bar/commands';
import { layout } from './layout/commands';
import { navBar } from './nav-bar/commands';
import { sidekickArea } from './sidekick-area/commands';
import { UiCommands } from './types';

export const uiCommands: UiCommands = {
  actionsBar,
  camera,
  chat,
  externalVideo,
  sidekickOptionsContainer,
  sidekickArea,
  navBar,
  presentationArea,
  userStatus,
  conference,
  notification,
  layout,
};
