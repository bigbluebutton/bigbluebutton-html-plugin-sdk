export enum HookEvents {
  UPDATED = 'HOOK_DATA_UPDATED',
  SUBSCRIBED = 'PLUGIN_SUBSCRIBED_TO_HOOK',
  UNSUBSCRIBED = 'PLUGIN_UNSUBSCRIBED_FROM_HOOK'
}

export enum Hooks {
  CURRENT_PRESENTATION = 'Hooks::UseCurrentPresentation',
  LOADED_USER_LIST = 'Hooks::UseLoadedUserList',
  CURRENT_USER = 'Hooks::UseCurrentUser',
  USERS_BASIC_INFO = 'Hooks::UseUsersBasicInfo',
  CUSTOM_SUBSCRIPTION = 'Hooks::CustomSubscription',
  DATA_CHANNEL = 'Hooks::DataChannel',
}
