import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleOptionsDropdownPluginProps } from './types';

function SampleOptionsDropdownPlugin(
  { pluginUuid: uuid }: SampleOptionsDropdownPluginProps
): React.ReactElement<SampleOptionsDropdownPluginProps>{
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {    
    pluginApi.setOptionsDropdownItems([
      new BbbPluginSdk.OptionsDropdownOption({
        label: 'Send an alert popup',
        icon: 'copy',
        tooltip: 'this is a button injected by plugin',
        allowed: true,
        onClick: () => {
          alert("Alert sent from plugin")
        },
      }),
      new BbbPluginSdk.OptionsDropdownSeparator(),
    ]);
  }, []);

  return null;
}

export default SampleOptionsDropdownPlugin;
