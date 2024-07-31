import { ActionButtonDropdownItemType } from './action-button-dropdown-item/enums';
import { ActionsBarItemType } from './actions-bar-item/enums';
import { AudioSettingsDropdownItemType } from './audio-settings-dropdown-item/enums';
import { CameraSettingsDropdownItemType } from './camera-settings-dropdown-item/enums';
import { FloatingWindowType } from './floating-window/enums';
import { GenericContentType } from './generic-content-item/enums';
import { NavBarItemType } from './nav-bar-item/enums';
import { OptionsDropdownItemType } from './options-dropdown-item/enums';
import { PresentationDropdownItemType } from './presentation-dropdown-item/enums';
import { PresentationToolbarItemType } from './presentation-toolbar-item/enums';
import { ScreenshareHelperItemType } from './screenshare-helper-item/enums';
import { UserCameraDropdownItemType } from './user-camera-dropdown-item/enums';
import { UserListDropdownItemType } from './user-list-dropdown-item/enums';
import { UserListItemAdditionalInformationType } from './user-list-item-additional-information/enums';

type PluginProvidedUiItemType = PresentationToolbarItemType |
  UserListDropdownItemType | ActionButtonDropdownItemType |
  ActionsBarItemType | AudioSettingsDropdownItemType |
  PresentationDropdownItemType | NavBarItemType | OptionsDropdownItemType |
  CameraSettingsDropdownItemType | UserCameraDropdownItemType |
  UserListItemAdditionalInformationType | FloatingWindowType | GenericContentType |
  ScreenshareHelperItemType;

export interface PluginProvidedUiItemDescriptor {
  /** Defined by BigBlueButton Plugin Engine. */
  id: string;
  type: PluginProvidedUiItemType;
  setItemId: (id: string) => void;
}
