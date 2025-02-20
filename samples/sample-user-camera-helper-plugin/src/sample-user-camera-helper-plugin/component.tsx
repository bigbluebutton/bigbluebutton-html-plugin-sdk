import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  pluginLogger,
  UserCameraHelperButton,
  UserCameraHelperItemPosition,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUserCameraHelperPluginProps, VideoStreamsSubscriptionResultType } from './types';
import { VIDEO_STREAMS_SUBSCRIPTION } from '../queries';

function SampleUserCameraHelperPlugin({ pluginUuid: uuid }: SampleUserCameraHelperPluginProps):
React.ReactElement<SampleUserCameraHelperPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const { data: videoStreams } = pluginApi.useCustomSubscription<
    VideoStreamsSubscriptionResultType
  >(VIDEO_STREAMS_SUBSCRIPTION);

  useEffect(() => {
    const randomElement = videoStreams?.user_camera[
      Math.floor(Math.random() * (videoStreams?.user_camera.length ?? 0))
    ];

    pluginApi.setUserCameraHelperItems([
      new UserCameraHelperButton({
        icon: 'popout_window',
        disabled: false,
        label: 'This will log on the console',
        tooltip: 'this is a button injected by plugin',
        position: UserCameraHelperItemPosition.TOP_RIGHT,
        onClick: ({ browserClickEvent }) => {
          pluginLogger.info('Logging from the user camera extensible area', browserClickEvent.clientX);
        },
        displayFunction: ({ userId }) => randomElement?.user.userId === userId,
      }),
    ]);
  }, [videoStreams]);

  return null;
}

export default SampleUserCameraHelperPlugin;
