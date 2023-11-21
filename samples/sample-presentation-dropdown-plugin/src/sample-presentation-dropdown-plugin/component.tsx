import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi, PresentationDropdownItem, PresentationDropdownOption, PresentationDropdownSeparator } from 'bigbluebutton-html-plugin-sdk';
import { SamplePresentationDropdownPluginProps } from './types';

function SamplePresentationDropdownPlugin({
  pluginUuid: uuid,
}: SamplePresentationDropdownPluginProps): React.ReactElement<SamplePresentationDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const presentationDropdownOption:
      PresentationDropdownItem = new PresentationDropdownOption({
        label: 'Click to see alert from plugin',
        icon: 'user',
        onClick: () => {
          alert("Alert from plugin")
        },
      });
      
    const presentationDropdownSeparator:
      PresentationDropdownItem = new PresentationDropdownSeparator();
    pluginApi.setPresentationDropdownItems([presentationDropdownSeparator, presentationDropdownOption]);
  }, []);

  return null;
}

export default SamplePresentationDropdownPlugin;
