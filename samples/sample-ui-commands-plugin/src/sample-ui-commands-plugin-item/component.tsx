import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  MediaAreaOption,
  MediaAreaSeparator,
  SidekickAreaCorePanelEnum,
} from 'bigbluebutton-html-plugin-sdk';
import { PrivateChatSubscriptionResult, SampleUiCommandsPluginProps } from './types';
import { GET_CHATS_SUBSCRIPTION } from './query';

function SampleUiCommandsPlugin(
  { pluginUuid: uuid }: SampleUiCommandsPluginProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const [privateChatId, setPrivateChatId] = useState<string | null>(null);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);
  // The sidekick area exposes open and close, not a toggle, and its panel is not
  // published as ui-data, so the plugin keeps track of what it opened itself.
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

  // Get all users in the meeting
  const { data: usersData } = pluginApi.useUsersBasicInfo();

  // Get current user to exclude from random selection
  const { data: currentUser } = pluginApi.useCurrentUser();

  // Subscribe to private chats to get chatId after creating
  const { data: privateChatsData } = pluginApi.useCustomSubscription?.<
    PrivateChatSubscriptionResult
  >(GET_CHATS_SUBSCRIPTION) || { data: undefined };

  // Monitor for the chatId of the private chat we created
  useEffect(() => {
    if (targetUserId && privateChatsData?.chat) {
      const targetChat = privateChatsData.chat.find(
        (chat) => chat.participant.userId === targetUserId,
      );
      if (targetChat && targetChat.chatId !== privateChatId) {
        setPrivateChatId(targetChat.chatId);
      }
    }
  }, [privateChatsData, targetUserId, privateChatId]);

  useEffect(() => {
    if (privateChatId) {
      // Open the private chat panel
      pluginApi.uiCommands?.chat.form.open({
        chatId: privateChatId,
      });

      // Fill the private chat form with a hello world message
      setTimeout(() => {
        pluginApi.uiCommands?.chat.form.fill({
          text: 'Hello World! This message was filled by the plugin.',
        });
      }, 500);
    }
  }, [privateChatId]);

  useEffect(() => {
    // Set up the action button dropdown
    pluginApi.setMediaAreaItems([
      new MediaAreaSeparator({
        dataTest: 'mediaAreaSeparator',
      }),
      new MediaAreaOption({
        label: 'Create Private Chat & Say Hello',
        icon: { iconName: 'user' },
        tooltip: 'Creates a private chat with a random user and sends Hello World',
        allowed: true,
        dataTest: 'createPrivateChatButton',
        onClick: () => {
          // Get a random user (excluding current user)
          if (usersData?.user && currentUser) {
            const otherUsers = usersData.user.filter(
              (user) => user.userId !== currentUser.userId,
            );

            if (otherUsers.length > 0) {
              const randomUser = otherUsers[
                Math.floor(Math.random() * otherUsers.length)
              ];

              // Store the target user ID to track the chat creation
              setTargetUserId(randomUser.userId);

              // Create private chat with the random user
              pluginApi.serverCommands?.chat.createPrivateChat({
                userId: randomUser.userId,
              });
            }
          }
        },
      }),
      new MediaAreaOption({
        label: 'Stop screenshare',
        icon: 'copy',
        tooltip: '',
        dataTest: 'stopScreenshareButton',
        allowed: true,
        onClick: () => {
          pluginApi.uiCommands?.screenshare.stop();
        },
      }),
      new MediaAreaOption({
        label: isProfilePanelOpen ? 'Close profile panel' : 'Open profile panel',
        icon: { iconName: 'profile' },
        tooltip: 'Toggles the profile panel in the sidekick area',
        allowed: true,
        dataTest: 'toggleProfilePanelButton',
        onClick: () => {
          if (isProfilePanelOpen) {
            pluginApi.uiCommands?.sidekickArea.panel.close(
              SidekickAreaCorePanelEnum.PROFILE,
            );
          } else {
            pluginApi.uiCommands?.sidekickArea.panel.open(
              SidekickAreaCorePanelEnum.PROFILE,
            );
          }
          setIsProfilePanelOpen((wasOpen) => !wasOpen);
        },
      }),
      new MediaAreaOption({
        label: 'Open polls',
        icon: { iconName: 'polling' },
        tooltip: 'Opens the polling panel in the sidekick area',
        // The core only registers the polling panel for the presenter, so the command
        // is ignored for anyone else.
        allowed: Boolean(currentUser?.presenter),
        dataTest: 'openPollsButton',
        onClick: () => {
          pluginApi.uiCommands?.sidekickArea.panel.open(
            SidekickAreaCorePanelEnum.POLL,
          );
        },
      }),
    ]);
  }, [usersData, currentUser, isProfilePanelOpen]);

  return null;
}

export default SampleUiCommandsPlugin;
