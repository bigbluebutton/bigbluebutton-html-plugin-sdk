import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleAudioSettingsDropdownPluginProps } from './types';


function SampleAudioSettingsDropdownPlugin({
  pluginUuid: uuid,
}: SampleAudioSettingsDropdownPluginProps): React.ReactElement<SampleAudioSettingsDropdownPluginProps> {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToAudioSettingsDropdown:
      BbbPluginSdk.AudioSettingsDropdownItem = new BbbPluginSdk.AudioSettingsDropdownOption({
        label: 'Click to send alert message',
        icon: 'user',
        onClick: () => {
          alert("Alert popup from plugin");
        },
      });
      
    const separatorToAudioSettingsDropdown:
      BbbPluginSdk.AudioSettingsDropdownItem = new BbbPluginSdk.AudioSettingsDropdownSeparator();
    pluginApi.setAudioSettingsDropdownItems([separatorToAudioSettingsDropdown, buttonToAudioSettingsDropdown]);
  }, []);

  return (
    <></>
  );
}

export default SampleAudioSettingsDropdownPlugin;
