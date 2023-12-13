export const PLUGIN_SETTINGS_QUERY = `
subscription pluginSettingsSubscription ($pluginName: String!){
  meeting_clientPluginSettings(where: {name: {_eq: $pluginName}}) {
    settings
  }
}
`;
