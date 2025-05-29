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
      // Sample of a button that uses a custom SVG for the button.
      ActionsBarInterface = new ActionsBarButton({
        icon: {
          svgContent: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cctv-icon lucide-cctv">
              <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
              <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
              <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
              <path d="M2 21v-4" />
              <path d="M7 9h.01" />
            </svg>) as React.SVGProps<SVGSVGElement>,
        },
        tooltip: 'This will log on the console.',
        onClick: () => {
          pluginLogger.info('The actions bar button from plugin was clicked');
        },
        position: ActionsBarPosition.RIGHT,
        dataTest: 'actionsBarButtonCustomSvg',
      });
    const separatorToUserListItem:
      ActionsBarInterface = new ActionsBarSeparator({
        position: ActionsBarPosition.RIGHT,
        dataTest: 'actionsBarButtonSeparator',
      });
    const selectorItem: ActionsBarInterface = new ActionsBarSelector({
      title: 'Selector',
      options,
      defaultOption: options[4],
      onChange: (value, event) => {
        pluginLogger.info('The actions bar selector has changed', { value, event });
      },
      position: ActionsBarPosition.RIGHT,
      width: 150, // To define a specific width, uncomment this line
      dataTest: 'actionsBarButtonSelector',
    });
    const separatorIconItem: ActionsBarInterface = new ActionsBarSeparator({
      position: ActionsBarPosition.RIGHT,
      icon: 'whiteboard',
      dataTest: 'actionsBarButtonSelectorIcon',
    });
    const toggleGroupItem: ActionsBarInterface = new ActionsBarToggleGroup({
      title: 'Toggle',
      options: options.slice(0, 2), // Toggle groups can have more than 2 options
      defaultOption: options[1],
      onChange: (value, event) => {
        pluginLogger.info('The actions bar toggle group has changed', { value, event: event.nativeEvent });
      },
      position: ActionsBarPosition.RIGHT,
      // exclusive: false, // To allow for checking more than one option, uncomment this line
      dataTest: 'actionsBarButtonToggleGroup',
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
