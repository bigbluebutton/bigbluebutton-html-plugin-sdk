import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi, UserCameraDropdownOption, UserCameraDropdownSeparator } from 'bigbluebutton-html-plugin-sdk';
import { SampleUserCameraDropdownPluginProps } from './types';

function SampleUserCameraDropdownPlugin({ pluginUuid: uuid }: SampleUserCameraDropdownPluginProps): 
React.ReactElement<SampleUserCameraDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
      pluginApi.setUserCameraDropdownItems([
        new UserCameraDropdownSeparator(),
        new UserCameraDropdownOption({
          label: 'Send alert from plugin',
          icon: 'user',
          onClick: () => {
            alert('Alert sent from plugin');
          },
        }),
      ]);

  }, []);

  return null;
}

export default SampleUserCameraDropdownPlugin;
