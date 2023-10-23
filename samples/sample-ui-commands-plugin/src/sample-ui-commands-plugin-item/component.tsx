import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleUiCommandsPluginProps } from './types';

function SampleUiCommandsPlugin({ pluginUuid: uuid }: SampleUiCommandsPluginProps): React.ReactElement {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.uiCommands.pollCreation.form.open();
    pluginApi.uiCommands.pollCreation.form.fill({
      question: "Hey, I am a question here, let's see!",
      answers: [{
          "val": "first answer"
        },
        {
          "val": "second answer"
        },
        {
          "val": "third answer"
        }
      ],
      pollType: BbbPluginSdk.PollType.Letter,
    } as BbbPluginSdk.FillingDataForm);
  }, []);

  return null;
}

export default SampleUiCommandsPlugin;
