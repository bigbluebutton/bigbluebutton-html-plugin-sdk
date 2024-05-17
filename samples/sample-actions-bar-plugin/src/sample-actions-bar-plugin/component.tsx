import * as React from 'react';
import { useEffect } from 'react';

import {
  ActionsBarButton, ActionsBarInterface, ActionsBarPosition, ActionsBarSeparator,
  BbbPluginSdk, GraphqlResponseWrapper,
  PluginApi, UsersBasicInfoResponseFromGraphqlWrapper,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleActionsBarPluginProps } from './types';

function SampleActionsBarPlugin({
  pluginUuid: uuid,
}: SampleActionsBarPluginProps): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToUserListItem:
          ActionsBarInterface = new ActionsBarButton({
            icon: 'user',
            tooltip: 'This will log on the console.',
            onClick: () => {
              pluginLogger.info('The action bar button from plugin was clicked');
            },
            position: ActionsBarPosition.RIGHT,
          });
    const dropdownToUserListItem:
      ActionsBarInterface = new ActionsBarSeparator({
        position: ActionsBarPosition.RIGHT,
      });

    pluginApi.setActionsBarItems([dropdownToUserListItem, buttonToUserListItem]);
  }, []);

  const users: GraphqlResponseWrapper<UsersBasicInfoResponseFromGraphqlWrapper> = pluginApi
    .useUsersBasicInfo();

  useEffect(() => {
    pluginLogger.info('Users Overview - ', users);
  }, [users]);
  return null;
}

export default SampleActionsBarPlugin;
