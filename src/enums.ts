enum BbbHookEvents {
  Update = 'UPDATE_HOOK',
  Subscribe = 'SUBSCRIBE_TO_HOOK',
  Unsubscribe = 'UNSUBSCRIBE_FROM_HOOK'
}

enum BbbHooks {
  UseCurrentPresentation = 'BbbHooks::UseCurrentPresentation',
  UseLoadedUserList = 'BbbHooks::UseLoadedUserList',
  UseCurrentUser = 'BbbHooks::UseCurrentUser'
}

export const Internal = {
  BbbHookEvents,
  BbbHooks,
};

// Presentation toolbar items types:
export enum PresentationToolbarItemType {
  BUTTON = 'PRESENTATION_TOOLBAR_BUTTON',
  SPINNER = 'PRESENTATION_TOOLBAR_SPINNER',
  SEPARATOR = 'PRESENTATION_TOOLBAR_SEPARATOR',
}

// User list dropdown items types:
export enum UserListDropdownItemType {
  OPTION = 'USER_LIST_DROPDOWN_OPTION',
  SEPARATOR = 'USER_LIST_DROPDOWN_SEPARATOR',
}

// Action dropdown items types:
export enum ActionButtonDropdownItemType {
  OPTION = 'ACTION_BUTTON_DROPDOWN_OPTION',
  SEPARATOR = 'ACTION_BUTTON_DROPDOWN_SEPARATOR',
}

// Action bar items types:
export enum ActionsBarItemType {
  BUTTON = 'ACTIONS_BAR_BUTTON',
  SEPARATOR = 'ACTIONS_BAR_SEPARATOR',
}

export enum ActionsBarPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

// AudioSettings dropdown items types:
export enum AudioSettingsDropdownItemType {
  OPTION = 'AUDIO_SETTINGS_DROPDOWN_OPTION',
  SEPARATOR = 'AUDIO_SETTINGS_DROPDOWN_SEPARATOR',
}

// Presentation dropdown items types:
export enum PresentationDropdownItemType {
  OPTION = 'PRESENTATION_DROPDOWN_OPTION',
  SEPARATOR = 'PRESENTATION_DROPDOWN_SEPARATOR',
}

// Nav bar items types:
export enum NavBarItemType {
  BUTTON = 'NAV_BAR_BUTTON',
  INFO = 'NAV_BAR_INFO',
}

export enum NavBarItemPosition {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

// Options dropdown items types:
export enum OptionsDropdownItemType {
  OPTION = 'OPTIONS_DROPDOWN_OPTION',
  SEPARATOR = 'OPTIONS_DROPDOWN_SEPARATOR',
}
