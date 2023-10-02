import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleUserListIconPluginProps } from './types';

function SampleUserListIconPlugin({
  pluginUuid: uuid,
}: SampleUserListIconPluginProps): React.ReactElement<SampleUserListIconPluginProps> {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const loadedUserList = BbbPluginSdk.useLoadedUserList();

  useEffect(() => {
    if (loadedUserList !== undefined && loadedUserList.length > 0) {
      const listOfUserListIconToSend:
      Array<BbbPluginSdk.UserListIconItem> = loadedUserList.map(
        (user) => {
          const userListIconItem:
            BbbPluginSdk.UserListIconItem = new BbbPluginSdk.UserListIcon({
              icon: 'warning',
              userId: user.userId,
            });
          return userListIconItem as BbbPluginSdk.UserListIconItem;
        },
      );

      pluginApi.setUserListIconItems([...listOfUserListIconToSend]);
    }
  }, [loadedUserList]);

  return null;
}

export default SampleUserListIconPlugin;
