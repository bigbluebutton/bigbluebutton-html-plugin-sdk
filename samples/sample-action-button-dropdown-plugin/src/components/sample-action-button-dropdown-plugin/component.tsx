import * as React from 'react';

import {
  BbbPluginSdk,
  ActionButtonDropdownSeparator,
  ActionButtonDropdownOption,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';

import { SampleActionButtonDropdownPluginProps } from './types';

export interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleActionButtonDropdownPlugin(
  { pluginApi, pluginUuid: uuid }: SampleActionButtonDropdownPluginProps,
): React.ReactElement<SampleActionButtonDropdownPluginProps> {
  BbbPluginSdk.initialize(pluginApi, uuid);
  const { data: currentUser } = pluginApi.useCurrentUser();

  React.useEffect(() => {
    if (currentUser?.presenter) {
      pluginApi.setActionButtonDropdownItems([
        new ActionButtonDropdownSeparator(),
        new ActionButtonDropdownOption({
          label: 'Button injected by plugin',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            pluginLogger.info('Log that the button from sample-action-button-dropdown-plugin has been clicked');
          },
        }),
      ]);
    }
  }, [currentUser]);
  return null;
}

export default SampleActionButtonDropdownPlugin;
