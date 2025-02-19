import * as React from 'react';
import { useEffect } from 'react';

import {
  ActionsBarButton, ActionsBarInterface, ActionsBarPosition, ActionsBarSelector,
  ActionsBarSeparator, ActionsBarToggleGroup, BbbPluginSdk, GraphqlResponseWrapper,
  PluginApi, UsersBasicInfoResponseFromGraphqlWrapper,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleActionsBarPluginProps } from './types';

function SampleActionsBarPlugin({
  pluginUuid: uuid,
}: SampleActionsBarPluginProps): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const options = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    { value: 4, label: 'four' },
    { value: 5, label: 'five' },
    { value: 6, label: 'six' },
  ];

  useEffect(() => {
    const buttonToUserListItem:
      ActionsBarInterface = new ActionsBarButton({
        icon: 'user',
        tooltip: 'This will log on the console.',
        onClick: () => {
          pluginLogger.info('The actions bar button from plugin was clicked');
        },
        position: ActionsBarPosition.RIGHT,
      });
    const separatorToUserListItem:
      ActionsBarInterface = new ActionsBarSeparator({
        position: ActionsBarPosition.RIGHT,
      });
    const selectorItem: ActionsBarInterface = new ActionsBarSelector({
      title: 'Selector',
      options,
      defaultOption: options[4],
      onChange: (value, event) => {
        console.log({ value, event });
        pluginLogger.info('The actions bar selector has changed', { value, event });
      },
      position: ActionsBarPosition.RIGHT,
      width: 150, // To define a specific width, uncomment this line
    });
    const separatorIconItem: ActionsBarInterface = new ActionsBarSeparator({
      position: ActionsBarPosition.RIGHT,
      icon: 'whiteboard',
    });
    const toggleGroupItem: ActionsBarInterface = new ActionsBarToggleGroup({
      title: 'Toggle',
      options: options.slice(0, 2), // Toggle groups can have more than 2 options
      defaultOption: options[2],
      onChange: (value, event) => {
        pluginLogger.info('The actions bar toggle group has changed', { value, event: event.nativeEvent });
      },
      position: ActionsBarPosition.RIGHT,
      // exclusive: false, // To allow for checking more than one option, uncomment this line
    });

    pluginApi.setActionsBarItems([
      separatorToUserListItem,
      buttonToUserListItem,
      selectorItem,
      separatorIconItem,
      toggleGroupItem,
    ]);
  }, []);

  const users: GraphqlResponseWrapper<UsersBasicInfoResponseFromGraphqlWrapper> = pluginApi
    .useUsersBasicInfo();

  useEffect(() => {
    pluginLogger.info('Users Overview - ', users);
  }, [users]);
  return null;
}

export default SampleActionsBarPlugin;
