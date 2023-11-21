import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, CameraSettingsDropdownOption, CameraSettingsDropdownSeparator, CurrentPresentation, PluginApi, VariablesObjectWrapper, useCurrentPresentation, useCustomSubscription } from 'bigbluebutton-html-plugin-sdk';
import { SampleCameraSettingsDropdownPluginProps } from './types';

function SampleCameraSettingsDropdownPlugin({ pluginUuid: uuid }: SampleCameraSettingsDropdownPluginProps): React.ReactElement<SampleCameraSettingsDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.setCameraSettingsDropdownItems([
      new CameraSettingsDropdownSeparator(),
      new CameraSettingsDropdownOption({
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
