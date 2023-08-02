enum BbbHookEvents {
  Update = 'UPDATE_HOOK',
  NewSubscriber = 'NEW_SUBSCRIBER',
}

enum BbbHooks {
  UseCurrentPresentation = 'BbbHooks::UseCurrentPresentation',
  UseLoadedUserList = 'BbbHooks::UseLoadedUserList',
}

export const Internal = {
  BbbHookEvents,
  BbbHooks,
};

// Presentation toolbar items types:
export enum WhiteboardToolbarItemType {
  BUTTON = 'PRESENTATION_TOOLBAR_BUTTON',
  SPINNER = 'PRESENTATION_TOOLBAR_SPINNER',
  SEPARATOR = 'PRESENTATION_TOOLBAR_SEPARATOR',
}

// Participant dropdown items types:
export enum UserListDropdownItemType {
  INFORMATION = 'USER_LIST_DROPDOWN_INFORMATION',
  BUTTON = 'USER_LIST_DROPDOWN_BUTTON',
  DROPDOWN = 'USER_LIST_DROPDOWN_DROPDOWN',
}
