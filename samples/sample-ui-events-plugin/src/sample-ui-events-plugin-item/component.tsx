import * as React from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleUiEventsPluginProps } from './types';

function SampleUiEventsPlugin({ pluginUuid: uuid }: SampleUiEventsPluginProps): 
React.ReactElement<SampleUiEventsPluginProps> {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  BbbPluginSdk.useUiEvent(BbbPluginSdk.BbbUiEvents.UserListOpened, () => {
      console.log("Event testing (UserListOpened)");
  });
  
  BbbPluginSdk.useUiEvent(BbbPluginSdk.BbbUiEvents.ChatInputChanged, (
    event: BbbPluginSdk.ChatChangedEventData
  ) => {
      console.log("Event testing (ChatInputChanged)---> ", event);
  });

  BbbPluginSdk.useUiEvent(BbbPluginSdk.BbbUiEvents.ChatInputFocused, () => {
      console.log("Event testing (ChatInputFocused)");
  });
  
  BbbPluginSdk.useUiEvent(BbbPluginSdk.BbbUiEvents.ChatInputUnfocused, () => {
      console.log("Event testing (ChatInputUnfocused)");
  });
  
  BbbPluginSdk.useUiEvent(BbbPluginSdk.BbbUiEvents.UserListClosed, () => {
      console.log("Event testing (UserListClosed)");
  });



  return null;
}

export default SampleUiEventsPlugin;
