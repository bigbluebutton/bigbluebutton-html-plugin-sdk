import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  GenericSidekickContent,
  GenericMainContent,
} from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import { SampleGenericContentPluginProps } from './types';
import { GenericContentExample } from '../generic-content-example/component';

function SampleGenericContentPlugin(
  { pluginUuid: uuid }: SampleGenericContentPluginProps,
): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    pluginApi.setGenericContents([
      new GenericSidekickContent({
        name: 'Generic Content 1',
        section: 'Section 1',
        buttonIcon: 'video',
        contentFunction: (element: HTMLElement) => {
          const root = ReactDOM.createRoot(element);
          root.render(
            <React.StrictMode>
              <GenericContentExample
                uuid={uuid}
              />
            </React.StrictMode>,
          );
        }
      }),
      new GenericSidekickContent({
        name: 'Generic Content 2',
        section: 'Section 2',
        buttonIcon: 'chat',
        contentFunction: (element: HTMLElement) => {
          const root = ReactDOM.createRoot(element);
          root.render(
            <React.StrictMode>
              <h1>This is the generic content 2</h1>
              <p>Put here anything to be rendered in the sidekick content</p>
              <iframe width="100%" height="1000px" src="https://en.wikipedia.org/wiki/Main_Page" />
            </React.StrictMode>,
          );
        }
      })
    ]);
  }, []);

  return null;
}

export default SampleGenericContentPlugin;
