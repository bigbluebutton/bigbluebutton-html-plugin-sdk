import * as React from 'react';
import { useEffect } from 'react';

import {
  OptionsDropdownOption, OptionsDropdownSeparator,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleOptionsDropdownPluginProps } from './types';

function SampleOptionsDropdownPlugin(
  { pluginApi }: SampleOptionsDropdownPluginProps,
): React.ReactElement<SampleOptionsDropdownPluginProps> {
  useEffect(() => {
    pluginApi.setOptionsDropdownItems([
      new OptionsDropdownSeparator(),
      new OptionsDropdownOption({
        label: 'This will log on the console',
        icon: 'copy',
        onClick: () => {
          pluginLogger.info('Log from options dropdown plugin');
        },
      }),
    ]);
  }, []);

  return null;
}

export default SampleOptionsDropdownPlugin;
