import { GraphqlResponseWrapper } from '../../../../core';
import { PluginSettingsResponseFromGraphqlWrapper } from './types';

export const filterPluginSpecificSettings = (
  completeSettings: GraphqlResponseWrapper<PluginSettingsResponseFromGraphqlWrapper>,
  pluginName: string,
) => {
  const plugins = completeSettings
    .data?.meeting_clientSettings[0].clientSettingsJson.public?.plugins;

  const pluginSpecificSettings = plugins?.filter((p) => p.name === pluginName)[0];
  if (pluginSpecificSettings) {
    return {
      ...completeSettings,
      data: pluginSpecificSettings.settings,
    };
  }
  return {
    ...completeSettings,
    data: undefined,
  };
};
