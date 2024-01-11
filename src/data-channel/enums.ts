// Role
/**
 * Enum for each role in possible for a user to assume in the meeting
 * The developer can specify them when dispatching data with the dispatcher function
 * returned from the `pluginApi.useChannel`.
 */
export enum DataChannelDispatcherUserRole {
  PRESENTER = 'PRESENTER',
  MODERATOR = 'MODERATOR',
  VIEWER = 'VIEWER',
}

export enum DataChannelHooks {
  DATA_CHANNEL = 'Hooks::DataChannel',
}
