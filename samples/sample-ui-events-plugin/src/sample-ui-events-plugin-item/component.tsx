import * as React from 'react';

import {
  BbbPluginSdk,
  ChatFormUiDataNames,
  ExternalVideoVolumeUiDataNames,
  PluginApi, pluginLogger, UserListUiDataNames,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUiEventsPluginProps } from './types';

function SampleUiEventsPlugin({ pluginUuid: uuid }: SampleUiEventsPluginProps):
React.ReactElement<SampleUiEventsPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const userListOpened = pluginApi
    .useUiData(UserListUiDataNames.USER_LIST_IS_OPEN, { value: true });
  const currentChatText = pluginApi.useUiData(ChatFormUiDataNames.CURRENT_CHAT_INPUT_TEXT, { text: '' });
  const currentChatFocused = pluginApi
    .useUiData(ChatFormUiDataNames.CHAT_INPUT_IS_FOCUSED, { value: false });
  const currentExternalVideoVolume = pluginApi
    .useUiData(ExternalVideoVolumeUiDataNames.CURRENT_VOLUME_VALUE, { value: 1 });
  const isMutedExternalVideo = pluginApi
    .useUiData(ExternalVideoVolumeUiDataNames.IS_VOLUME_MUTED, { value: false });

  React.useEffect(() => {
    pluginLogger.info('Showing the uiData: ', {
      userListOpened,
      currentChatText,
      currentChatFocused,
      currentExternalVideoVolume,
      isMutedExternalVideo,
    });
  }, [userListOpened,
    currentChatText,
    currentChatFocused,
    currentExternalVideoVolume,
    isMutedExternalVideo]);
  return null;
}

export default SampleUiEventsPlugin;
