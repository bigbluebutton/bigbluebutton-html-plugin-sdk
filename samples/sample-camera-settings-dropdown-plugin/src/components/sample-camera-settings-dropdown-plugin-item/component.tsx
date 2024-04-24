import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, CameraSettingsDropdownOption, CameraSettingsDropdownSeparator, PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleCameraSettingsDropdownPluginProps } from './types';
import logger from '../../utils/logger';

function SampleCameraSettingsDropdownPlugin(
  { pluginUuid: uuid }: SampleCameraSettingsDropdownPluginProps,
): React.ReactElement<SampleCameraSettingsDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.setCameraSettingsDropdownItems([
      new CameraSettingsDropdownSeparator(),
      new CameraSettingsDropdownOption({
        label: 'Send alert from plugin',
        icon: 'user',
        onClick: () => {
          logger.info('Log from camera settings plugin');
        },
      }),
    ]);
  }, []);

  return null;
}

export default SampleCameraSettingsDropdownPlugin;
