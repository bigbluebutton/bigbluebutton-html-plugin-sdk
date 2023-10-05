import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleUserListItemAdditionalInformationPluginProps } from './types';

function SampleUserListItemAdditionalInformationPlugin({
  pluginUuid: uuid,
}: SampleUserListItemAdditionalInformationPluginProps): React.ReactElement<SampleUserListItemAdditionalInformationPluginProps> {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const loadedUserList = BbbPluginSdk.useLoadedUserList();

  useEffect(() => {
    if (loadedUserList !== undefined && loadedUserList.length > 0) {
      const listOfUserListIconToSend:
      Array<BbbPluginSdk.UserListItemIcon> = loadedUserList.map(
        (user) => {
          const userListItemIcon:
            BbbPluginSdk.UserListItemIcon = new BbbPluginSdk.UserListItemIcon({
              icon: 'warning',
              userId: user.userId,
            });
          return userListItemIcon as BbbPluginSdk.UserListItemIcon;
        },
      );
      
      const listOfUserListLabelToSend:
      Array<BbbPluginSdk.UserListItemIcon> = loadedUserList.map(
        (user) => {
          const userListItemLabel:
            BbbPluginSdk.UserListItemIcon = new BbbPluginSdk.UserListItemLabel({
              label: `user-${user.name}`,
              icon: 'user',
              userId: user.userId,
            });
          return userListItemLabel as BbbPluginSdk.UserListItemIcon;
        },
      );

      pluginApi.setUserListItemAdditionalInformation([...listOfUserListIconToSend, ...listOfUserListLabelToSend]);
    }
  }, [loadedUserList]);

  return null;
}

export default SampleUserListItemAdditionalInformationPlugin;
