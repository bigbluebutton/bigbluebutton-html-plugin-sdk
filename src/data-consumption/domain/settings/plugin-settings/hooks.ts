import { useCustomSubscription } from '../../shared/custom-subscription/hooks';
import { PLUGIN_SETTINGS_QUERY } from './queries';
import { PluginSettingsResponseFromGraphqlWrapper } from './types';
import { filterPluginSpecificSettings } from './utils';

export const usePluginSettings = (
  pluginName: string,
) => filterPluginSpecificSettings(useCustomSubscription<
    PluginSettingsResponseFromGraphqlWrapper>(
      PLUGIN_SETTINGS_QUERY,
    ), pluginName);
