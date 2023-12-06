export const PLUGIN_SETTINGS_QUERY = `
  subscription pluginSettingsSubscription {
    meeting_clientSettings {
      clientSettingsJson
    }
  }
`;
