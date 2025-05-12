import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  pluginLogger,
  ScreenshareHelperItemPosition,
  ScreenshareHelperButton,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUserCameraDropdownPluginProps } from './types';

function SampleUserCameraDropdownPlugin({
  pluginUuid: uuid, pluginApi,
}: SampleUserCameraDropdownPluginProps):
React.ReactElement<SampleUserCameraDropdownPluginProps> {
  BbbPluginSdk.initialize(pluginApi, uuid);

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

  return null;
}

export default SampleUserCameraDropdownPlugin;
