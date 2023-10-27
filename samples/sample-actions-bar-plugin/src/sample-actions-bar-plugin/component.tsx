import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleActionsBarPluginProps } from './types';

function SampleActionsBarPlugin({
  pluginUuid: uuid,
}: SampleActionsBarPluginProps): React.ReactNode {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToUserListItem:
          BbbPluginSdk.ActionsBarItem = new BbbPluginSdk.ActionsBarButton({
            icon: 'user',
            tooltip: 'This will make an alert dialog',
            allowed: true,
            onClick: () => {
              alert("The action bar button from plugin was clicked")
            },
            hasDropdownButton: false,
            listOfDropdownItems: [],
            position: BbbPluginSdk.ActionsBarPosition.RIGHT,
          });
    const dropdownToUserListItem:
      BbbPluginSdk.ActionsBarItem = new BbbPluginSdk.ActionsBarSeparator({
          position: BbbPluginSdk.ActionsBarPosition.RIGHT,
        });
    
    pluginApi.setActionsBarItems([dropdownToUserListItem, buttonToUserListItem]);
  }, []);

  const users: BbbPluginSdk.UserOverview[] = BbbPluginSdk.useUsersOverview();

  useEffect(() => {
    console.log("Users Overview: ", users);
  }, [users])
  return null;
}

export default SampleActionsBarPlugin;
