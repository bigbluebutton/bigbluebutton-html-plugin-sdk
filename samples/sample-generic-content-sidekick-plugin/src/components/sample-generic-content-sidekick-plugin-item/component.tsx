import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  GenericContentSidekickArea,
} from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import { SampleGenericContentSidekickPluginProps } from './types';
import { GenericContentSidekickExample } from '../generic-content-sidekick-example/component';

function SampleGenericContentSidekickPlugin(
  { pluginUuid: uuid, pluginApi }: SampleGenericContentSidekickPluginProps,
): React.ReactNode {
  BbbPluginSdk.initialize(pluginApi, uuid);

  useEffect(() => {
    pluginApi.setGenericContentItems([
      new GenericContentSidekickArea({
        name: 'Generic Content 1',
        section: 'Section 1',
        buttonIcon: 'video',
        open: false,
        contentFunction: (element: HTMLElement) => {
          const root = ReactDOM.createRoot(element);
          root.render(
            <GenericContentSidekickExample
              pluginApi={pluginApi}
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

  return null;
}

export default SampleGenericContentSidekickPlugin;
