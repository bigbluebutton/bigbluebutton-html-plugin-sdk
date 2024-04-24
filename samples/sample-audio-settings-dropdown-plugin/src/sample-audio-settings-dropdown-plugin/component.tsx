import * as React from 'react';
import { useEffect } from 'react';
import {
  AudioSettingsDropdownInterface,
  AudioSettingsDropdownOption,
  AudioSettingsDropdownSeparator,
  BbbPluginSdk, PluginApi,
} from 'bigbluebutton-html-plugin-sdk';

import logger from '../utils/logger';
import { SampleAudioSettingsDropdownPluginProps } from './types';

function SampleAudioSettingsDropdownPlugin(
  { pluginUuid: uuid }: SampleAudioSettingsDropdownPluginProps,
): React.ReactElement<SampleAudioSettingsDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToAudioSettingsDropdown:
      AudioSettingsDropdownInterface = new AudioSettingsDropdownOption({
        label: 'Click to send alert message',
        icon: 'user',
        onClick: () => {
          logger.info('Alert from plugin');
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
