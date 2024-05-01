import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, PluginApi, pluginLogger, UserCameraDropdownOption, UserCameraDropdownSeparator,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUserCameraDropdownPluginProps } from './types';

function SampleUserCameraDropdownPlugin({ pluginUuid: uuid }: SampleUserCameraDropdownPluginProps):
React.ReactElement<SampleUserCameraDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.setUserCameraDropdownItems([
      new UserCameraDropdownSeparator(),
      new UserCameraDropdownOption({
        label: 'This will log on the console',
        icon: 'user',
        onClick: () => {
          pluginLogger.info('Alert sent from plugin');
        },
      }),
    ]);
  }, []);

  return null;
}

export default SampleUserCameraDropdownPlugin;
