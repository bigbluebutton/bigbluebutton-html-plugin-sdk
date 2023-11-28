import * as React from 'react';
import { useEffect } from 'react';

import { AudioSettingsDropdownItem, AudioSettingsDropdownOption, AudioSettingsDropdownSeparator, BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { SampleAudioSettingsDropdownPluginProps } from './types';


function SampleAudioSettingsDropdownPlugin({
  pluginUuid: uuid,
}: SampleAudioSettingsDropdownPluginProps): React.ReactElement<SampleAudioSettingsDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToAudioSettingsDropdown:
      AudioSettingsDropdownItem = new AudioSettingsDropdownOption({
        label: 'Click to send alert message',
        icon: 'user',
        onClick: () => {
          alert("Alert popup from plugin");
        },
      });
      
    const separatorToAudioSettingsDropdown:
      AudioSettingsDropdownItem = new AudioSettingsDropdownSeparator();
    pluginApi.setAudioSettingsDropdownItems([separatorToAudioSettingsDropdown, buttonToAudioSettingsDropdown]);
  }, []);

  return (
    <></>
  );
}

export default SampleAudioSettingsDropdownPlugin;
