import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  pluginLogger,
  UserCameraDropdownOption,
  UserCameraDropdownSeparator,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUserCameraDropdownPluginProps, VideoStreamsSubscriptionResultType } from './types';
import { VIDEO_STREAMS_SUBSCRIPTION } from '../queries';

function SampleUserCameraDropdownPlugin(
  { pluginUuid: uuid, pluginApi }: SampleUserCameraDropdownPluginProps,
):
React.ReactElement<SampleUserCameraDropdownPluginProps> {
  BbbPluginSdk.initialize(pluginApi, uuid);

  const { data: videoStreams } = pluginApi.useCustomSubscription<
    VideoStreamsSubscriptionResultType
  >(VIDEO_STREAMS_SUBSCRIPTION);

  useEffect(() => {
    const randomElement = videoStreams?.user_camera[
      Math.floor(Math.random() * (videoStreams?.user_camera.length ?? 0))
    ];

    pluginApi.setUserCameraDropdownItems([
      new UserCameraDropdownSeparator(),
      new UserCameraDropdownOption({
        label: 'This will log on the console',
        icon: 'user',
        displayFunction: ({ userId }) => randomElement?.user.userId === userId,
        onClick: ({ userId, streamId, browserClickEvent }) => {
          pluginLogger.info(`Alert sent from plugin, see userId: ${userId}; ${streamId}; ${browserClickEvent.clientX}`);
        },
      }),
    ]);
  }, [videoStreams]);

  return null;
}

export default SampleUserCameraDropdownPlugin;
