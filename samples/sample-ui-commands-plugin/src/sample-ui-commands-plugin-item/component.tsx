import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { SampleUiCommandsPluginProps } from './types';

function SampleUiCommandsPlugin(
  { pluginUuid: uuid }: SampleUiCommandsPluginProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.uiCommands.chat.form.open();
    pluginApi.uiCommands.chat.form.fill({
      text: 'Just an example message filled by the plugin',
    });
  }, []);

  return null;
}

export default SampleUiCommandsPlugin;
