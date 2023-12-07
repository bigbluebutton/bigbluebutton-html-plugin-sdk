import * as React from 'react';

import { BbbPluginSdk, ChatFormEventsNames, PluginApi, UserListEventsNames } from 'bigbluebutton-html-plugin-sdk';
import { SampleUiEventsPluginProps } from './types';

function SampleUiEventsPlugin({ pluginUuid: uuid }: SampleUiEventsPluginProps): 
React.ReactElement<SampleUiEventsPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  pluginApi.useUiEvent(UserListEventsNames.USER_LIST_OPENED, () => {
      console.log("Event testing (USER_LIST_OPENED)");
  });
  
  pluginApi.useUiEvent(ChatFormEventsNames.CHAT_INPUT_TEXT_CHANGED, (
    event
  ) => {
      console.log("Event testing (CHAT_INPUT_TEXT_CHANGED)---> ", event.detail.text);
  });

  pluginApi.useUiEvent(ChatFormEventsNames.CHAT_INPUT_FOCUSED, () => {
      console.log("Event testing (CHAT_INPUT_FOCUSED)");
  });
  
  pluginApi.useUiEvent(ChatFormEventsNames.CHAT_INPUT_UNFOCUSED, () => {
      console.log("Event testing (CHAT_INPUT_UNFOCUSED)");
  });
  
  pluginApi.useUiEvent(UserListEventsNames.USER_LIST_CLOSED, () => {
      console.log("Event testing (USER_LIST_CLOSED)");
  });



  return null;
}

export default SampleUiEventsPlugin;
