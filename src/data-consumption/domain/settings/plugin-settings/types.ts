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

export type UsePluginSettingsWrapperFunction = (pluginName: string) => GraphqlResponseWrapper<
  PluginSettingsData
>;

export type FilterPluginSpecificSettingsFunction = (
  completeSettings: GraphqlResponseWrapper<PluginSettingsResponseFromGraphqlWrapper>,
) => GraphqlResponseWrapper<
  PluginSettingsData
>
