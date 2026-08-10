export enum SidekickAreaPanelEnum {
  OPEN = 'OPEN_SIDEKICK_AREA_PANEL_COMMAND',
  CLOSE = 'CLOSE_SIDEKICK_AREA_PANEL_COMMAND',
}

/**
 * Core panels a plugin is allowed to open. Polls, Timer and Breakout only open when
 * the user could already open them from the sidebar navigation.
 */
export enum SidekickAreaCorePanelEnum {
  CHAT = 'chat',
  USER_LIST = 'userlist',
  SHARED_NOTES = 'shared-notes',
  APPS_GALLERY = 'apps-gallery',
  POLL = 'poll',
  TIMER = 'timer',
  BREAKOUT = 'breakoutroom',
}
