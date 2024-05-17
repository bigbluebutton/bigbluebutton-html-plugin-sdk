import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, OptionsDropdownOption, OptionsDropdownSeparator, PluginApi,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleOptionsDropdownPluginProps } from './types';

function SampleOptionsDropdownPlugin(
  { pluginUuid: uuid }: SampleOptionsDropdownPluginProps,
): React.ReactElement<SampleOptionsDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.setOptionsDropdownItems([
      new OptionsDropdownOption({
        label: 'This will log on the console',
        icon: 'copy',
        onClick: () => {
          pluginLogger.info('Log from options dropdown plugin');
        },
      }),
      new OptionsDropdownSeparator(),
    ]);
  }, []);

  return null;
}

export default SampleOptionsDropdownPlugin;
