import { GraphqlResponseWrapper } from '../../../../core';
import { PluginSettingsResponseFromGraphqlWrapper } from './types';

export const filterPluginSpecificSettings = (
  completeSettings: GraphqlResponseWrapper<PluginSettingsResponseFromGraphqlWrapper>,
) => {
  const pluginSettings = completeSettings
    .data?.meeting_clientPluginSettings[0]?.settings;
  return {
    ...completeSettings,
    data: pluginSettings,
  };
};
