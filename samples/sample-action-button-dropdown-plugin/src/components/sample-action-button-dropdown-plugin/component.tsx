import * as React from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  ActionButtonDropdownSeparator,
  ActionButtonDropdownOption,
  pluginLogger,
  ChangeEnforcedLayoutTypeEnum,
} from 'bigbluebutton-html-plugin-sdk';

import { SampleActionButtonDropdownPluginProps } from './types';

export interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleActionButtonDropdownPlugin(
  { pluginUuid: uuid }: SampleActionButtonDropdownPluginProps,
): React.ReactElement<SampleActionButtonDropdownPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const { data: currentUser } = pluginApi.useCurrentUser();

  React.useEffect(() => {
    if (currentUser?.presenter) {
      pluginApi.setActionButtonDropdownItems([
        new ActionButtonDropdownSeparator({
          dataTest: 'actionDropdownSeparatorPlugin',
        }),
        new ActionButtonDropdownOption({
          label: 'Button injected by plugin',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          dataTest: 'actionDropdownButtonPlugin',
          onClick: () => {
            pluginLogger.info('Log that the button from sample-action-button-dropdown-plugin has been clicked');
          },
        }),
        new ActionButtonDropdownOption({
          label: 'Smart layout',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            pluginApi.uiCommands.layout.changeEnforcedLayout(
              ChangeEnforcedLayoutTypeEnum.SMART_LAYOUT,
            );
          },
        }),
        new ActionButtonDropdownOption({
          label: 'Media Only',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            pluginApi.uiCommands.layout.changeEnforcedLayout(
              ChangeEnforcedLayoutTypeEnum.MEDIA_ONLY,
            );
          },
        }),
        new ActionButtonDropdownOption({
          label: 'Participants and chat Only',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            pluginApi.uiCommands.layout.changeEnforcedLayout(
              ChangeEnforcedLayoutTypeEnum.PARTICIPANTS_AND_CHAT_ONLY,
            );
          },
        }),
        new ActionButtonDropdownOption({
          label: 'Presentation Only',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            pluginApi.uiCommands.layout.changeEnforcedLayout(
              ChangeEnforcedLayoutTypeEnum.PRESENTATION_ONLY,
            );
          },
        }),
        new ActionButtonDropdownOption({
          label: 'Video Focus',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            pluginApi.uiCommands.layout.changeEnforcedLayout(
              ChangeEnforcedLayoutTypeEnum.VIDEO_FOCUS,
            );
          },
        }),
      ]);
    }
  }, [currentUser]);
  return null;
}

export default SampleActionButtonDropdownPlugin;
