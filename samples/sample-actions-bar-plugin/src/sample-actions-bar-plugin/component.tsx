import * as React from 'react';
import { useEffect } from 'react';

import { ActionsBarButton, ActionsBarItem, ActionsBarPosition, ActionsBarSeparator, BbbPluginSdk, GraphqlResponseWrapper, PluginApi, UsersBasicInfoResponseFromGraphqlWrapper, useUsersBasicInfo } from 'bigbluebutton-html-plugin-sdk';
import { SampleActionsBarPluginProps } from './types';

function SampleActionsBarPlugin({
  pluginUuid: uuid,
}: SampleActionsBarPluginProps): React.ReactNode {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToUserListItem:
          ActionsBarItem = new ActionsBarButton({
            icon: 'user',
            tooltip: 'This will make an alert dialog',
            allowed: true,
            onClick: () => {
              alert("The action bar button from plugin was clicked")
            },
            hasDropdownButton: false,
            listOfDropdownItems: [],
            position: ActionsBarPosition.RIGHT,
          });
    const dropdownToUserListItem:
      ActionsBarItem = new ActionsBarSeparator({
          position: ActionsBarPosition.RIGHT,
        });
    
    pluginApi.setActionsBarItems([dropdownToUserListItem, buttonToUserListItem]);
  }, []);

  const users: GraphqlResponseWrapper<UsersBasicInfoResponseFromGraphqlWrapper> = useUsersBasicInfo();

  useEffect(() => {
    console.log("Users Overview: ", users);
  }, [users])
  return null;
}

export default SampleActionsBarPlugin;
