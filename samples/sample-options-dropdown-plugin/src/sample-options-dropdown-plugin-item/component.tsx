import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, OptionsDropdownOption, OptionsDropdownSeparator, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { SampleOptionsDropdownPluginProps } from './types';

function SampleOptionsDropdownPlugin(
  { pluginUuid: uuid }: SampleOptionsDropdownPluginProps
): React.ReactElement<SampleOptionsDropdownPluginProps>{
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {    
    pluginApi.setOptionsDropdownItems([
      new OptionsDropdownOption({
        label: 'Send an alert popup',
        icon: 'copy',
        onClick: () => {
          alert("Alert sent from plugin")
        },
      }),
      new OptionsDropdownSeparator(),
    ]);
  }, []);

  return null;
}

export default SampleOptionsDropdownPlugin;
