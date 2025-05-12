import * as React from 'react';
import { useEffect } from 'react';

import {
  CameraSettingsDropdownOption, CameraSettingsDropdownSeparator,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleCameraSettingsDropdownPluginProps } from './types';

function SampleCameraSettingsDropdownPlugin(
  { pluginApi }: SampleCameraSettingsDropdownPluginProps,
): React.ReactElement<SampleCameraSettingsDropdownPluginProps> {
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
