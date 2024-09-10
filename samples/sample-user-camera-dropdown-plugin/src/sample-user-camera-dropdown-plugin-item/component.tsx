import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  pluginLogger,
  ScreenshareHelperItemPosition,
  ScreenshareHelperButton,
  UserCameraDropdownOption,
  UserCameraDropdownSeparator,
  UserCameraHelperButton,
  UserCameraHelperItemPosition,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUserCameraDropdownPluginProps, VideoStreamsSubscriptionResultType } from './types';
import { VIDEO_STREAMS_SUBSCRIPTION } from '../queries';

function SampleUserCameraDropdownPlugin({ pluginUuid: uuid }: SampleUserCameraDropdownPluginProps):
React.ReactElement<SampleUserCameraDropdownPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const { data: videoStreams } = pluginApi.useCustomSubscription<
    VideoStreamsSubscriptionResultType
  >(VIDEO_STREAMS_SUBSCRIPTION);

  const userCamera = pluginApi.useUserCameraDomElements(
    videoStreams?.user_camera.map((vs) => vs.streamId),
  );

  pluginLogger.info(`logging the domElements manipulation for userCamera: (${userCamera?.length}) for streams (${videoStreams})`);

  useEffect(() => {
    const buttonScreenshare1 = new ScreenshareHelperButton({
      icon: 'user',
      disabled: false,
      label: 'This will log on the console',
      tooltip: 'this is a button injected by plugin',
      position: ScreenshareHelperItemPosition.TOP_RIGHT,
      onClick: () => {
        pluginLogger.info('Logging from the screenshare extensible area');
      },
      hasSeparator: true,
    });

    const buttonScreenshare5 = new ScreenshareHelperButton({
      icon: 'popout_window',
      disabled: false,
      label: 'This will log on the console',
      tooltip: 'this is a button injected by plugin',
      position: ScreenshareHelperItemPosition.TOP_RIGHT,
      onClick: ({ browserClickEvent }) => {
        pluginLogger.info('Logging from the screenshare extensible area, clientX: ', browserClickEvent.clientX);
      },
      hasSeparator: true,
    });

    const buttonScreenshare2 = new ScreenshareHelperButton({
      icon: 'undo',
      disabled: false,
      label: 'This will log on the console',
      tooltip: 'this is a button injected by plugin',
      position: ScreenshareHelperItemPosition.TOP_LEFT,
      onClick: () => {
        pluginLogger.info('Logging from the screenshare extensible area');
      },
      hasSeparator: true,
    });

    const buttonScreenshare3 = new ScreenshareHelperButton({
      icon: 'settings',
      disabled: false,
      label: 'This will log on the console',
      tooltip: 'this is a button injected by plugin',
      position: ScreenshareHelperItemPosition.BOTTOM_LEFT,
      onClick: () => {
        pluginLogger.info('Logging from the screenshare extensible area');
      },
      hasSeparator: true,
    });

    const buttonScreenshare4 = new ScreenshareHelperButton({
      icon: 'plus',
      disabled: false,
      label: 'This will log on the console',
      tooltip: 'this is a button injected by plugin',
      position: ScreenshareHelperItemPosition.BOTTOM_RIGHT,
      onClick: () => {
        pluginLogger.info('Logging from the screenshare extensible area');
      },
      hasSeparator: true,
    });
    pluginApi.setScreenshareHelperItems([buttonScreenshare1, buttonScreenshare5,
      buttonScreenshare2, buttonScreenshare3, buttonScreenshare4,
    ]);
  }, []);

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

export default SampleUserCameraDropdownPlugin;
