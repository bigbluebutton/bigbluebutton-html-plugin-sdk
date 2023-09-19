import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SamplePresentationDropdownPluginProps } from './types';

function SamplePresentationDropdownPlugin({
  pluginUuid: uuid,
}: SamplePresentationDropdownPluginProps): React.ReactElement<SamplePresentationDropdownPluginProps> {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const presentationDropdownOption:
      BbbPluginSdk.PresentationDropdownItem = new BbbPluginSdk.PresentationDropdownOption({
        label: 'Click to see alert from plugin',
        icon: 'user',
        tooltip: 'This will open a modal dialog',
        allowed: true,
        onClick: () => {
          alert("Alert from plugin")
        },
      });
      
    const presentationDropdownSeparator:
      BbbPluginSdk.PresentationDropdownItem = new BbbPluginSdk.PresentationDropdownSeparator();
    pluginApi.setPresentationDropdownItems([presentationDropdownSeparator, presentationDropdownOption]);
  }, []);

  return null;
}

export default SamplePresentationDropdownPlugin;
