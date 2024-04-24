import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, OptionsDropdownOption, OptionsDropdownSeparator, PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleOptionsDropdownPluginProps } from './types';
import logger from '../utils/logger';

function SampleOptionsDropdownPlugin(
  { pluginUuid: uuid }: SampleOptionsDropdownPluginProps,
): React.ReactElement<SampleOptionsDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.setOptionsDropdownItems([
      new OptionsDropdownOption({
        label: 'Send an alert popup',
        icon: 'copy',
        onClick: () => {
          logger.info('Log from options dropdown plugin');
        },
      }),
      new OptionsDropdownSeparator(),
    ]);
  }, []);

  return null;
}

export default SampleOptionsDropdownPlugin;
