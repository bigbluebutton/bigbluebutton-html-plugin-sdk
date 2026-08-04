export enum SidekickAreaOptionsPanelEnum {
  OPEN = 'OPEN_SIDEKICK_OPTIONS_CONTAINER_COMMAND',
  CLOSE = 'CLOSE_SIDEKICK_OPTIONS_CONTAINER_COMMAND',
  OPEN_CORE_PANEL = 'OPEN_SIDEKICK_AREA_CORE_PANEL_COMMAND',
}

/**
 * Core panels a plugin is allowed to open. Polls, Timer and Breakout are only
 * opened when the user could already open them from the sidebar navigation.
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
