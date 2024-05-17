import * as React from 'react';
import { useEffect } from 'react';
import {
  AudioSettingsDropdownInterface,
  AudioSettingsDropdownOption,
  AudioSettingsDropdownSeparator,
  BbbPluginSdk, PluginApi,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';

import { SampleAudioSettingsDropdownPluginProps } from './types';

function SampleAudioSettingsDropdownPlugin(
  { pluginUuid: uuid }: SampleAudioSettingsDropdownPluginProps,
): React.ReactElement<SampleAudioSettingsDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToAudioSettingsDropdown:
      AudioSettingsDropdownInterface = new AudioSettingsDropdownOption({
        label: 'Click to send log message',
        icon: 'user',
        onClick: () => {
          pluginLogger.info('Log from audio settings dropdown plugin');
        },
      });

    const separatorToAudioSettingsDropdown:
      AudioSettingsDropdownInterface = new AudioSettingsDropdownSeparator();
    pluginApi.setAudioSettingsDropdownItems(
      [separatorToAudioSettingsDropdown, buttonToAudioSettingsDropdown],
    );
  }, []);

  return null;
}

export default SampleAudioSettingsDropdownPlugin;
