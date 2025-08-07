import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  GenericContentSidekickArea,
  ActionButtonDropdownOption,
} from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import { SampleGenericContentSidekickPluginProps } from './types';
import { GenericContentSidekickExample } from '../generic-content-sidekick-example/component';

function SampleGenericContentSidekickPlugin(
  { pluginUuid: uuid }: SampleGenericContentSidekickPluginProps,
): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const GENERIC_CONTENT_BADGE_ID = 'first-sidekick-component';

  const countGenericContent = React.useRef(0);

  useEffect(() => {
    pluginApi.setGenericContentItems([
      new GenericContentSidekickArea({
        id: GENERIC_CONTENT_BADGE_ID,
        name: 'Generic Content 1',
        section: 'Section 1',
        buttonIcon: 'video',
        open: false,
        contentFunction: (element: HTMLElement) => {
          const root = ReactDOM.createRoot(element);
          root.render(
            <GenericContentSidekickExample
              uuid={uuid}
            />,
          );
          return root;
        },
      }),
      new GenericContentSidekickArea({
        name: 'Generic Content 2',
        section: 'Section 2',
        buttonIcon: 'chat',
        open: false,
        contentFunction: (element: HTMLElement) => {
          const root = ReactDOM.createRoot(element);
          root.render(
            <>
              <h1>This is the generic content 2</h1>
              <p>Put here anything to be rendered in the sidekick content</p>
              <iframe title="wikipedia" width="100%" height="1000px" src="https://en.wikipedia.org/wiki/Main_Page" />
            </>,
          );
          return root;
        },
      }),
    ]);
  }, []);

  useEffect(() => {
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownOption({
        label: 'Click to increment the badge',
        icon: 'user',
        tooltip: 'Use it to enable the badge',
        allowed: true,
        onClick: () => {
          countGenericContent.current += 1;
          pluginApi.uiCommands.sidekickArea.options.setMenuBadge(
            GENERIC_CONTENT_BADGE_ID,
            countGenericContent.current.toString(),
          );
        },
      }),
      new ActionButtonDropdownOption({
        label: 'Click to change section name',
        icon: 'plus',
        tooltip: 'Use it to change section name',
        allowed: true,
        onClick: () => {
          pluginApi.uiCommands.sidekickArea.options.renameGenericContentSection(
            GENERIC_CONTENT_BADGE_ID,
            `New Section Name ${countGenericContent.current.toString()}`,
          );
        },
      }),
      new ActionButtonDropdownOption({
        label: 'Click to change menu name',
        icon: 'user',
        tooltip: 'Use it to change menu name',
        allowed: true,
        onClick: () => {
          pluginApi.uiCommands.sidekickArea.options.renameGenericContentMenu(
            GENERIC_CONTENT_BADGE_ID,
            `New Menu Name ${countGenericContent.current.toString()}`,
          );
        },
      }),
    ]);
  }, []);
  return null;
}

export default SampleGenericContentSidekickPlugin;
