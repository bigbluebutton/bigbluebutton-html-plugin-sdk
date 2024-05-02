import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, PluginApi, UserCameraDropdownOption, UserCameraDropdownSeparator,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUserCameraDropdownPluginProps } from './types';
import logger from '../utils/logger';

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
          logger.info('Alert sent from plugin');
        },
      }),
    ]);
  }, []);

  return null;
}

export default SampleUserCameraDropdownPlugin;
