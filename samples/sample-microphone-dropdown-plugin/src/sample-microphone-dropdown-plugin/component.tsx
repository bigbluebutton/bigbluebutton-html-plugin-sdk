import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleMicrophoneDropdownPluginProps } from './types';


function SampleMicrophoneDropdownPlugin({
  pluginUuid: uuid,
}: SampleMicrophoneDropdownPluginProps): React.ReactElement<SampleMicrophoneDropdownPluginProps> {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToMicrophoneDropdown:
      BbbPluginSdk.MicrophoneDropdownItem = new BbbPluginSdk.MicrophoneDropdownOption({
        label: 'Click to send alert message',
        icon: 'user',
        tooltip: 'This will open an alert dialog',
        allowed: true,
        onClick: () => {
          alert("Alert popup from plugin");
        },
      });
      
    const separatorToMicrophoneDropdown:
      BbbPluginSdk.MicrophoneDropdownItem = new BbbPluginSdk.MicrophoneDropdownSeparator();
    pluginApi.setMicrophoneDropdownItems([separatorToMicrophoneDropdown, buttonToMicrophoneDropdown]);
  }, []);

  return null;
}

export default SampleMicrophoneDropdownPlugin;
