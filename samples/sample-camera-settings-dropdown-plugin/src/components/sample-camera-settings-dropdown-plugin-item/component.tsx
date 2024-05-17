import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, CameraSettingsDropdownOption, CameraSettingsDropdownSeparator, PluginApi,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleCameraSettingsDropdownPluginProps } from './types';

function SampleCameraSettingsDropdownPlugin(
  { pluginUuid: uuid }: SampleCameraSettingsDropdownPluginProps,
): React.ReactElement<SampleCameraSettingsDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.setCameraSettingsDropdownItems([
      new CameraSettingsDropdownSeparator(),
      new CameraSettingsDropdownOption({
        label: 'This will log on the console',
        icon: 'user',
        onClick: () => {
          pluginLogger.info('Log from camera settings plugin');
        },
      }),
    ]);
  }, []);

  return null;
}

export default SampleCameraSettingsDropdownPlugin;
