import { GraphqlResponseWrapper } from '../../../../core';

export interface PluginSettingsData {
  [key: string]: object;
}

export interface PluginGeneralSettings {
  name: string;
  url: string;
  settings: PluginSettingsData;
}

export interface CompleteSettingsDataSlice {
  // ... Other settings which are not important for this scope
  public: {
    plugins: PluginGeneralSettings[]
  };
}

export interface PluginSettingsResponseFromGraphqlWrapper {
  meeting_clientSettings: {
    clientSettingsJson: CompleteSettingsDataSlice;
  }[];
}

export type UsePluginSettingsFunction = () => GraphqlResponseWrapper<
  PluginSettingsData
>;
