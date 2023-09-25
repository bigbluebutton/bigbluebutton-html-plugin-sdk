import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleCameraSettingsDropdownPluginProps } from './types';

function SampleCameraSettingsDropdownPlugin({ pluginUuid: uuid }: SampleCameraSettingsDropdownPluginProps): React.ReactElement<SampleCameraSettingsDropdownPluginProps> {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.setCameraSettingsDropdownItems([
      new BbbPluginSdk.CameraSettingsDropdownSeparator(),
      new BbbPluginSdk.CameraSettingsDropdownOption({
        label: 'Send alert from plugin',
        icon: 'user',
        onClick: () => {
          alert("Alert sent from plugin")
        },
      }),
    ]);
  }, []);

  return null;
}

export default SampleCameraSettingsDropdownPlugin;
