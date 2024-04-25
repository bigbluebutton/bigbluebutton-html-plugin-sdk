import { UiCommands } from '../../ui-commands/types';
import { UseChatMessageDomElementsFunction } from '../../dom-element-manipulation/chat/message/types';
import { ActionButtonDropdownInterface } from '../../extensible-areas/action-button-dropdown-item/types';
import { ActionsBarInterface } from '../../extensible-areas/actions-bar-item/types';
import { AudioSettingsDropdownInterface } from '../../extensible-areas/audio-settings-dropdown-item/types';
import { CameraSettingsDropdownInterface } from '../../extensible-areas/camera-settings-dropdown-item/types';
import { NavBarInterface } from '../../extensible-areas/nav-bar-item/types';
import { OptionsDropdownInterface } from '../../extensible-areas/options-dropdown-item/types';
import { PresentationDropdownInterface } from '../../extensible-areas/presentation-dropdown-item/types';
import { UserCameraDropdownInterface } from '../../extensible-areas/user-camera-dropdown-item/types';
import { UserListDropdownInterface } from '../../extensible-areas/user-list-dropdown-item/types';
import { UserListItemAdditionalInformationInterface } from '../../extensible-areas/user-list-item-additional-information/types';
import { PresentationToolbarInterface } from '../../extensible-areas/presentation-toolbar-item/types';
import { UseCurrentPresentationFunction } from '../../data-consumption/domain/presentations/current-presentation/types';
import { UseLoadedUserListFunction } from '../../data-consumption/domain/users/loaded-user-list/types';
import { UseCurrentUserFunction } from '../../data-consumption/domain/users/current-user/types';
import { UseUsersBasicInfoFunction } from '../../data-consumption/domain/users/users-basic-info/types';
import { SetFloatingWindows } from '../../extensible-areas/floating-window/types';
import { UseCustomSubscriptionFunction } from '../../data-consumption/domain/shared/custom-subscription/types';
import { MapOfPushEntryFunctions, UseDataChannelFunctionFromPluginApi } from '../../data-channel/types';
import { GetSessionTokenFunction } from '../auxiliary/session-token/types';
import { GetJoinUrlFunction } from '../auxiliary/join-url/types';
import { UsePluginSettingsFunction } from '../../data-consumption/domain/settings/plugin-settings/types';
import { UseLoadedChatMessagesFunction } from '../../data-consumption/domain/chat/loaded-chat-messages/types';
import { UseTalkingIndicatorFunction } from '../../data-consumption/domain/user-voice/talking-indicator/types';
import { GenericComponentInterface } from '../../extensible-areas/generic-component/types';
import { UseUiDataFunction } from '../../ui-data-hooks/types';
import { UseMeetingFunction } from '../../data-consumption/domain/meeting/from-core/types';

// Setter Functions for the API
export type SetPresentationToolbarItems = (presentationToolbarItem:
  PresentationToolbarInterface[]) => string[];

export type SetUserListDropdownItems = (
  userListDropdownItem: UserListDropdownInterface[]
) => string[];

export type SetActionButtonDropdownItems = (
  actionButtonDropdownInterface: ActionButtonDropdownInterface[]
) => string[];

export type SetActionsBarItems = (
  actionsBarItems: ActionsBarInterface[]
) => string[];

export type SetAudioSettingsDropdownItems = (
  audioSettingsDropdownItem: AudioSettingsDropdownInterface[]
) => string[];

export type SetPresentationDropdownItems = (
  userListDropdownItem: PresentationDropdownInterface[]
) => string[];

export type SetNavBarItems = (
  userListDropdownItem: NavBarInterface[]
) => string[];

export type SetOptionsDropdownItems = (
  optionsDropdownItem: OptionsDropdownInterface[]
) => string[];

export type SetCameraSettingsDropdownItems = (
  cameraSettingsDropdownItem: CameraSettingsDropdownInterface[]
) => string[];

export type SetUserCameraDropdownItems = (
  userCameraDropdownItem: UserCameraDropdownInterface[]
) => string[];

export type SetUserListItemAdditionalInformation = (
  userListItemAdditionalInformation: UserListItemAdditionalInformationInterface[]
) => string[];

export type SetGenericComponents = (
  genericComponents: GenericComponentInterface[]
) => string[];

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
  setFloatingWindows: SetFloatingWindows;
  setGenericComponents: SetGenericComponents;
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
   * Returns an object containing the data on the current meeting, i.e. the meeting on which the
   * plugin is running.
   *
   * @returns `GraphqlResponseWrapper` with the CurrentMeeting type.
   *
   */
  useMeeting?: UseMeetingFunction;
  /**
   * Returns an object containing the brief data on every user in te meeting.
   *
   * @returns `GraphqlResponseWrapper` with the UserBasicInfo type.
   *
   */
  useUsersBasicInfo?: UseUsersBasicInfoFunction;
   /**
   * Returns an object containing brief data on the messages already loaded in the chat.
   *
   * @returns `GraphqlResponseWrapper` with the LoadedChatMessages.
   *
   */
  useLoadedChatMessages?: UseLoadedChatMessagesFunction;
  /**
   * Returns an object containing the settings for the current plugin (with pluginName
   * defined in the pluginApi). It needs to be explicitly written in the client settings
   * within the plugin's directive
   *
   * @returns `GraphqlResponseWrapper` with the plugin specific settings.
   *
   */
  usePluginSettings?: UsePluginSettingsFunction;
    /**
   * Returns an object containing a list user-voice with the main properties of that object,
   * that being talking (boolean), startTime (number), muted (boolean) and userId (string).
   *
   * @returns `GraphqlResponseWrapper` with the list of user-voice.
   *
   */
  useTalkingIndicator?: UseTalkingIndicatorFunction;
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
   * position of the array, the push function with which one plugin can inform
   * the others in second position, and at last, the deleteEntryFunction .
   *
   * This is used for the different plugins in the meeting to communicate.
   *
   * @param channelName - the channel name in which you want to communicate
   * @param dataChannelType - format with which you want to consume the data
   * @param subChannelName - subchannel name within a certain data-channel
   * @returns The array of data wrapped in the `GraphqlResponseWrapper`,
   * the push function and delete function
   *
   */
  useDataChannel?: UseDataChannelFunctionFromPluginApi;
  mapOfPushEntryFunctions: MapOfPushEntryFunctions;
  // --- Ui-Commands ---
  uiCommands?: UiCommands;
  // --- Ui-Data-Hook ---
  /**
   * Function that returns the ui data the developer wants from.
   *
   * @param dataName The name of ui data chosen to be returned.
   *
   * @param defaultValue Default value to be return if there is none from the ui
   *
   * @returns The data object according to the UiDataName chosen as the parameter
   *
   */
  useUiData?: UseUiDataFunction;
  // --- Dom element manipulation
  /**
   * Returns an array with the DOM elements for the chat messages.
   *
   * @param messageIds - Ids of the chat messages one wants to retrieve in the form of an array
   * @returns The array of an object with DOM elements (in this case, div) and the id
   * of the chat message
   *
   */
  useChatMessageDomElements?: UseChatMessageDomElementsFunction;
  // --- Auxiliary functions ---
  getSessionToken?: GetSessionTokenFunction;
  getJoinUrl?: GetJoinUrlFunction;
}

export interface PluginBrowserWindow extends Window {
  bbb_plugins: { [key: string]: PluginApi};
}
