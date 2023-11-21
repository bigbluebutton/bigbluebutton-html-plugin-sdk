import { UseDataChannel, MapOfDispatchers } from '../../data-channel';
import {
  UseCurrentPresentation, UseLoadedUserList,
  UseCurrentUser, UseUsersBasicInfo, UseCustomSubscription,
} from '../../data-consumption';
import { ActionButtonDropdownItem } from '../../extensible-areas/action-button-dropdown-item/types';
import { ActionsBarItem } from '../../extensible-areas/actions-bar-item/types';
import { AudioSettingsDropdownItem } from '../../extensible-areas/audio-settings-dropdown-item/types';
import { CameraSettingsDropdownItem } from '../../extensible-areas/camera-settings-dropdown-item/types';
import { NavBarItem } from '../../extensible-areas/nav-bar-item/types';
import { OptionsDropdownItem } from '../../extensible-areas/options-dropdown-item/types';
import { PresentationDropdownItem } from '../../extensible-areas/presentation-dropdown-item/types';
import { UserCameraDropdownItem } from '../../extensible-areas/user-camera-dropdown-item/types';
import { UserListDropdownItem } from '../../extensible-areas/user-list-dropdown-item/types';
import { UserListItemAdditionalInformation } from '../../extensible-areas/user-list-item-additional-information/types';
import { PresentationToolbarItem } from '../../extensible-areas/presentation-toolbar-item/types';

// Setter Functions for the API
export type SetPresentationToolbarItems = (presentationToolbarItem:
  PresentationToolbarItem[]) => void;

export type SetUserListDropdownItems = (
  userListDropdownItem: UserListDropdownItem[]
) => void;

export type SetActionButtonDropdownItems = (
  actionButtonDropdownItem: ActionButtonDropdownItem[]
) => void;

export type SetActionsBarItems = (
  actionsBarItems: ActionsBarItem[]
) => void;

export type SetAudioSettingsDropdownItems = (
  audioSettingsDropdownItem: AudioSettingsDropdownItem[]
) => void;

export type SetPresentationDropdownItems = (
  userListDropdownItem: PresentationDropdownItem[]
) => void;

export type SetNavBarItems = (
  userListDropdownItem: NavBarItem[]
) => void;

export type SetOptionsDropdownItems = (
  optionsDropdownItem: OptionsDropdownItem[]
) => void;

export type SetCameraSettingsDropdownItems = (
  cameraSettingsDropdownItem: CameraSettingsDropdownItem[]
) => void;

export type SetUserCameraDropdownItems = (
  userCameraDropdownItem: UserCameraDropdownItem[]
) => void;

export type SetUserListItemAdditionalInformation = (
  userListItemAdditionalInformation: UserListItemAdditionalInformation[]
) => void;

export interface PluginApi {
  pluginName?: string;
  // --- Extensible Areas Setters ---
  setPresentationToolbarItems: SetPresentationToolbarItems;
  setUserListDropdownItems: SetUserListDropdownItems;
  setActionButtonDropdownItems: SetActionButtonDropdownItems;
  setActionsBarItems: SetActionsBarItems;
  setAudioSettingsDropdownItems: SetAudioSettingsDropdownItems;
  setPresentationDropdownItems: SetPresentationDropdownItems;
  setNavBarItems: SetNavBarItems;
  setOptionsDropdownItems: SetOptionsDropdownItems;
  setCameraSettingsDropdownItems: SetCameraSettingsDropdownItems;
  setUserCameraDropdownItems: SetUserCameraDropdownItems;
  setUserListItemAdditionalInformation: SetUserListItemAdditionalInformation;
  // --- DataConsumption Hooks ---
  useCurrentPresentation?: UseCurrentPresentation;
  useLoadedUserList?: UseLoadedUserList;
  useCurrentUser?: UseCurrentUser;
  useUsersBasicInfo?: UseUsersBasicInfo;
  useCustomSubscription?: UseCustomSubscription;
  // --- DataChannel Hook ---
  useDataChannel?: UseDataChannel;
  mapOfDispatchers: MapOfDispatchers;
}

export interface PluginBrowserWindow extends Window {
  bbb_plugins: { [key: string]: PluginApi};
}
