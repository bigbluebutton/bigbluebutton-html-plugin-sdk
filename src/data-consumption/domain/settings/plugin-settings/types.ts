import { GraphqlResponseWrapper } from '../../../../core';

export interface PluginSettingsData {
  [key: string]: object;
}

export interface PluginSettingsResponseFromGraphqlWrapper {
  meeting_clientPluginSettings: {
    settings: PluginSettingsData;
  }[];
}

export type UsePluginSettingsFunction = () => GraphqlResponseWrapper<
  PluginSettingsData
>;
