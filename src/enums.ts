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

// Participant dropdown items types:
export enum UserListDropdownItemType {
  OPTION = 'USER_LIST_DROPDOWN_OPTION',
  SEPARATOR = 'USER_LIST_DROPDOWN_SEPARATOR',
}

// Participant dropdown items types:
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

// Microphone dropdown items types:
export enum MicrophoneDropdownItemType {
  OPTION = 'MICROPHONE_DROPDOWN_OPTION',
  SEPARATOR = 'MICROPHONE_DROPDOWN_SEPARATOR',
}
