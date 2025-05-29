import * as React from 'react';

import {
  BbbPluginSdk,
  PluginApi,
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
  { pluginUuid: uuid }: SampleActionButtonDropdownPluginProps,
): React.ReactElement<SampleActionButtonDropdownPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
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
          dataTest: 'actionDropdownButtonPlugin',
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
