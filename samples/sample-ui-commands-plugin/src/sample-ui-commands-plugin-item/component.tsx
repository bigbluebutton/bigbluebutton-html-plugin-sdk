import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk } from 'bigbluebutton-html-plugin-sdk';
import { SampleUiCommandsPluginProps } from './types';

function SampleUiCommandsPlugin(
  { pluginUuid: uuid, pluginApi }: SampleUiCommandsPluginProps,
): React.ReactElement {
  BbbPluginSdk.initialize(pluginApi, uuid);

  useEffect(() => {
    pluginApi.uiCommands.chat.form.open();
    pluginApi.uiCommands.chat.form.fill({
      text: 'Just an example message filled by the plugin',
    });
  }, []);

  return null;
}

export default SampleUiCommandsPlugin;
