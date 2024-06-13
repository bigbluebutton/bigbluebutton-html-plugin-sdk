// Role
/**
 * Enum for each role in possible for a user to assume in the meeting
 * The developer can specify them when pushing data with the push function
 * returned from the `pluginApi.useChannel`.
 */
export enum DataChannelPushEntryFunctionUserRole {
  PRESENTER = 'PRESENTER',
  MODERATOR = 'MODERATOR',
  VIEWER = 'VIEWER',
}

export enum DataChannelHooks {
  DATA_CHANNEL_BUILDER = 'Hooks::DataChannelBuilder',
  DATA_CHANNEL_RESET = 'Hooks::DataChannelReset',
  DATA_CHANNEL_DELETE = 'Hooks::DataChannelDelete',
  DATA_CHANNEL_REPLACE = 'Hooks::DataChannelReplace',
}

export enum DataChannelTypes {
  All_ITEMS = 'Hooks::DataChannel::AllItems',
  NEW_ITEMS = 'Hooks::DataChannel::NewItems',
  LATEST_ITEM = 'Hooks::DataChannel::LatestItem',
}
