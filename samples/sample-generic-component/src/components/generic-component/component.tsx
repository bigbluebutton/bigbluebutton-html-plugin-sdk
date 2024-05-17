import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

import {
  BbbPluginSdk,
  PluginApi,
  ActionButtonDropdownSeparator,
  ActionButtonDropdownOption,
  GenericComponentMainContent,
  LayoutPresentatioAreaUiDataNames,
  UiLayouts,
  GenericComponentSidekickContent,
} from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import { SampleGenericComponentPluginProps } from './types';
import { GenericComponentExample } from '../generic-component-example/component';

export interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleGenericComponentPlugin(
  { pluginUuid: uuid }: SampleGenericComponentPluginProps,
):React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [
    showingGenericComponentInPresentationArea,
    setShowingGenericComponentInPresentationArea,
  ] = useState(false);
  const { data: currentUser } = pluginApi.useCurrentUser();
  const layoutInformation = pluginApi.useUiData(LayoutPresentatioAreaUiDataNames.CURRENT_ELEMENT, [{
    isOpen: true,
  }]);

  const handleChangePresentationAreaContent = () => {
    if (!showingGenericComponentInPresentationArea) {
      pluginApi.setGenericComponents([
        new GenericComponentMainContent({
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <React.StrictMode>
                <GenericComponentExample
                  uuid={uuid}
                />
              </React.StrictMode>,
            );
          },
        }),
        new GenericComponentSidekickContent({
          menuItemContentMessage: 'Show content in sidebar',
          menuItemIcon: 'user',
          menuItemTitle: 'Items from Generic component',
          open: false,
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <React.StrictMode>
                <GenericComponentExample
                  title="New Component"
                  uuid={uuid}
                />
              </React.StrictMode>,
            );
          },
        }),
        new GenericComponentSidekickContent({
          menuItemContentMessage: 'Show content in sidebar(2)',
          menuItemIcon: 'user',
          menuItemTitle: 'Items from Generic component',
          open: false,
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <React.StrictMode>
                <GenericComponentExample
                  title="New Component 2"
                  uuid={uuid}
                />
              </React.StrictMode>,
            );
          },
        }),
      ]);
    } else {
      pluginApi.setGenericComponents([]);
    }
  };

  useEffect(() => {
    const lastInTheLayout = layoutInformation[layoutInformation.length - 1];
    setShowingGenericComponentInPresentationArea(
      lastInTheLayout.currentElement === UiLayouts.GENERIC_COMPONENT && lastInTheLayout.isOpen,
    );
  }, [layoutInformation]);

  useEffect(() => {
    if (currentUser?.presenter) {
      pluginApi.setActionButtonDropdownItems([
        new ActionButtonDropdownSeparator(),
        new ActionButtonDropdownOption({
          label: showingGenericComponentInPresentationArea ? 'Return previous presentation content' : 'Set different content in presentation area',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: handleChangePresentationAreaContent,
        }),
      ]);
    }
  }, [currentUser, showingGenericComponentInPresentationArea]);

  return null;
}

export default SampleGenericComponentPlugin;
