enum BbbHookEvents {
  Update = 'UPDATE_HOOK',
  NewSubscriber = 'NEW_SUBSCRIBER',
  Unsubscribe = 'UNSUBSCRIBE'
}

enum BbbHooks {
  UseCurrentPresentation = 'BbbHooks::UseCurrentPresentation',
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
