import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  pluginLogger,
  UserListDropdownFixedContentInformation,
  UserListDropdownInterface,
  UserListDropdownOption,
  UserListDropdownSeparator,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUserListDropdownPluginProps } from './types';

function SampleUserListDropdownPlugin({
  pluginUuid: uuid,
}: SampleUserListDropdownPluginProps): React.ReactElement<SampleUserListDropdownPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const { data: loadedUserList } = pluginApi.useLoadedUserList();
  useEffect(() => {
    if (loadedUserList !== undefined && loadedUserList.length > 0) {
      const listOfInformationToSend:
      Array<UserListDropdownInterface> = loadedUserList.map(
        (user) => {
          const buttonToUserListItem:
            UserListDropdownInterface = new UserListDropdownFixedContentInformation({
              label: 'Warning test',
              iconRight: 'warning',
              userId: user.userId,
              textColor: 'red',
              allowed: true,
            });
          return buttonToUserListItem as UserListDropdownInterface;
        },
      );

      const listOfOptionsToSend:
      Array<UserListDropdownInterface> = loadedUserList.map(
        (user) => {
          const buttonToUserListItem:
            UserListDropdownInterface = new UserListDropdownOption({
              label: 'Click to log something in the console',
              icon: 'user',
              userId: user.userId,
              tooltip: 'This will log something in the console',
              allowed: true,
              onClick: () => {
                pluginLogger.info('Log from sample user-list-dropdown-plugin');
              },
            });
          return buttonToUserListItem as UserListDropdownInterface;
        },
      );

      const listOfDropdownsToSend:
      Array<UserListDropdownInterface> = loadedUserList.map(
        (user) => {
          const dropdownToUserListItem:
            UserListDropdownInterface = new UserListDropdownSeparator({
              userId: user.userId,
            });
          return dropdownToUserListItem as UserListDropdownInterface;
        },
      );
      pluginApi.setUserListDropdownItems(
        [...listOfInformationToSend, ...listOfDropdownsToSend, ...listOfOptionsToSend],
      );
    }
  }, [loadedUserList]);

  return null;
}

export default SampleUserListDropdownPlugin;
