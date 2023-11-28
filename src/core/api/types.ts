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
import { UseCurrentPresentationFunction } from '../../data-consumption/domain/presentations/current-presentation/types';
import { UseLoadedUserListFunction } from '../../data-consumption/domain/users/loaded-user-list/types';
import { UseCurrentUserFunction } from '../../data-consumption/domain/users/current-user/types';
import { UseUsersBasicInfoFunction } from '../../data-consumption/domain/users/users-basic-info/types';
import { UseCustomSubscriptionFunction } from '../../data-consumption/domain/shared/custom-subscription/types';
import { MapOfDispatchers, UseDataChannelFunctionFromPluginApi } from '../../data-channel/types';

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

/**
 * Object that makes plugin hooks and extensible area setters available for developers to use.
 */
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
  /**
   * Returns an object containing the data on the current presentation being displayed
   * in the presentation area, and its current page.
   *
   * @returns `GraphqlResponseWrapper` with the CurrentPresentation in the `data` field
   *
   */
  useCurrentPresentation?: UseCurrentPresentationFunction;
  /**
   * Returns an object containing the data on the currently loaded user list (
   * the one being displayed in that moment).
   *
   * @returns `GraphqlResponseWrapper` with the LoadedUserList type.
   *
   */
  useLoadedUserList?: UseLoadedUserListFunction;
  /**
   * Returns an object containing the data on the current user, i.e. the user on which the
   * plugin is running.
   *
   * @returns `GraphqlResponseWrapper` with the CurrentUser type.
   *
   */
  useCurrentUser?: UseCurrentUserFunction;
  /**
   * Returns an object containing the brief data on every user in te meeting.
   *
   * @returns `GraphqlResponseWrapper` with the UserBasicInfo type.
   *
   */
  useUsersBasicInfo?: UseUsersBasicInfoFunction;
  /**
   * Returns an object containing the data on the current presentation being displayed
   * in the presentation area, and its current page.
   *
   * @returns `GraphqlResponseWrapper` with the data type specified in the generic type.
   *
   */
  useCustomSubscription?: UseCustomSubscriptionFunction;
  // --- DataChannel Hook ---
  /**
   * Returns an array with tha data wrapped in the `GraphqlResponseWrapper` in the first
   * position of the array and the dispatcher function in which one plugin can inform
   * the others.
   *
   * This is used for the different plugins in the meeting to communicate.
   *
   * @param channelName - the channel name in which you want to communicate
   * @returns The array of data wrapped in the `GraphqlResponseWrapper` and the dispatcher function
   *
   */
  useDataChannel?: UseDataChannelFunctionFromPluginApi;
  mapOfDispatchers: MapOfDispatchers;
}

export interface PluginBrowserWindow extends Window {
  bbb_plugins: { [key: string]: PluginApi};
}
