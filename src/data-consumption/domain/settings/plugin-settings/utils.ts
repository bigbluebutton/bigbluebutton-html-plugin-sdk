import { GraphqlResponseWrapper } from '../../../../core';
import { FilterPluginSpecificSettingsFunction, PluginSettingsResponseFromGraphqlWrapper } from './types';

export const filterPluginSpecificSettings: FilterPluginSpecificSettingsFunction = (
  completeSettings: GraphqlResponseWrapper<PluginSettingsResponseFromGraphqlWrapper>,
) => {
  const pluginSettings = completeSettings
    .data?.meeting_clientPluginSettings[0]?.settings;
  return {
    ...completeSettings,
    data: pluginSettings,
  };
};
