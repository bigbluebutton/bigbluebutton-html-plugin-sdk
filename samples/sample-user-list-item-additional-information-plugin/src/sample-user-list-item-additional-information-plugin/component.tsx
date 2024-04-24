import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, PluginApi, UserListItemIcon, UserListItemLabel,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUserListItemAdditionalInformationPluginProps } from './types';

function SampleUserListItemAdditionalInformationPlugin(
  { pluginUuid: uuid }: SampleUserListItemAdditionalInformationPluginProps,
): React.ReactElement<SampleUserListItemAdditionalInformationPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const { data: loadedUserList } = pluginApi.useLoadedUserList();

  useEffect(() => {
    if (loadedUserList !== undefined && loadedUserList.length > 0) {
      const listOfUserListIconToSend:
      Array<UserListItemIcon> = loadedUserList.map(
        (user) => {
          const userListItemIcon:
            UserListItemIcon = new UserListItemIcon({
              icon: 'warning',
              userId: user.userId,
            });
          return userListItemIcon as UserListItemIcon;
        },
      );

      const listOfUserListLabelToSend:
      Array<UserListItemIcon> = loadedUserList.map(
        (user) => {
          const userListItemLabel:
            UserListItemIcon = new UserListItemLabel({
              label: `user-${user.name}`,
              icon: 'user',
              userId: user.userId,
            });
          return userListItemLabel as UserListItemIcon;
        },
      );

      pluginApi.setUserListItemAdditionalInformation(
        [...listOfUserListIconToSend, ...listOfUserListLabelToSend],
      );
    }
  }, [loadedUserList]);

  return null;
}

export default SampleUserListItemAdditionalInformationPlugin;
