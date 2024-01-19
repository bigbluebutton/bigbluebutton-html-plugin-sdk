import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi, PresentationDropdownInterface, PresentationDropdownOption, PresentationDropdownSeparator } from 'bigbluebutton-html-plugin-sdk';
import { SamplePresentationDropdownPluginProps } from './types';

function SamplePresentationDropdownPlugin({
  pluginUuid: uuid,
}: SamplePresentationDropdownPluginProps): React.ReactElement<SamplePresentationDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const presentationDropdownOption:
      PresentationDropdownInterface = new PresentationDropdownOption({
        label: 'Click to see alert from plugin',
        icon: 'user',
        onClick: () => {
          alert("Alert from plugin")
        },
      });
      
    const presentationDropdownSeparator:
      PresentationDropdownInterface = new PresentationDropdownSeparator();
    pluginApi.setPresentationDropdownItems([presentationDropdownSeparator, presentationDropdownOption]);
  }, []);

  return null;
}

export default SamplePresentationDropdownPlugin;
