import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactModal from 'react-modal';
import './style.css';

import {
  BbbPluginSdk,
  PluginApi,
  CurrentPresentation,
  ActionButtonDropdownSeparator,
  ActionButtonDropdownOption,
  GenericComponent,
} from 'bigbluebutton-html-plugin-sdk';
import { LayoutComponentListEnum } from 'bigbluebutton-html-plugin-sdk/dist/cjs/ui-commands/layout/enums';
import * as ReactDOM from 'react-dom/client';
import { SampleActionButtonDropdownPluginProps } from './types';
import { GenericComponentExample } from '../generic-component-example/component';
import logger from '../../utils/logger';

export interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleActionButtonDropdownPlugin(
  { pluginUuid: uuid }: SampleActionButtonDropdownPluginProps,
) {
  BbbPluginSdk.initialize(uuid);
  const [showModal, setShowModal] = useState<boolean>(false);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [currentSlideText, setCurrentSlideText] = useState<string>('');
  const [showingPresentationContent, setShowingPresentationContent] = useState(false);
  const { data: currentUser } = pluginApi.useCurrentUser();

  const { data: currentPresentation } = pluginApi.useCurrentPresentation();

  const requestLastPages = (currentTxtUri: string) => fetch(currentTxtUri)
    .then((response) => response.text());

  const handleFetchPresentationData = (currentPres: CurrentPresentation) => {
    const currentTxtUri = currentPres.currentPage.urlsJson.text;
    requestLastPages(currentTxtUri).then((currentPageContent) => {
      setCurrentSlideText(currentPageContent);
      setShowModal(true);
    }).catch((err) => {
      logger.error(`Error while requesting data from bbb-web. Could not get the base text, error: ${err.message}`);
    }).finally(() => {
      setTimeout(() => {
        setShowModal(false);
      }, 10000);
    });
  };

  const handleCloseModalAndResetPoll = (): void => {
    setShowModal(false);
  };

  const handleChangePresentationAreaContent = () => {
    if (showingPresentationContent) {
      pluginApi.uiCommands.layout.unset(LayoutComponentListEnum.GENERIC_COMPONENT);
      setShowingPresentationContent(false);
    } else {
      pluginApi.uiCommands.layout.set(LayoutComponentListEnum.GENERIC_COMPONENT);
      setShowingPresentationContent(true);
    }
  };

  useEffect(() => {
    if (currentUser?.presenter) {
      pluginApi.setActionButtonDropdownItems([
        new ActionButtonDropdownSeparator(),
        new ActionButtonDropdownOption({
          label: 'Fetch presentation content',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            handleFetchPresentationData(currentPresentation);
          },
        }),
        new ActionButtonDropdownOption({
          label: showingPresentationContent ? 'Return previous presentation content' : 'Set different content in presentation area',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: handleChangePresentationAreaContent,
        }),
      ]);
    }
  }, [currentPresentation, currentUser]);

  useEffect(() => {
    pluginApi.setGenericComponents([
      new GenericComponent({
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
      new GenericComponent({
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
    ]);
  }, []);

  return (
    <ReactModal
      className="plugin-modal"
      overlayClassName="modal-overlay"
      isOpen={showModal}
      onRequestClose={handleCloseModalAndResetPoll}
    >
      <div
        style={{
          width: '100%', height: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column',
        }}
      >
        <h1>Hey, I am a modal sample</h1>
        <div className="current-slide-text-container">
          {currentSlideText}
        </div>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close Modal
        </button>
      </div>
    </ReactModal>
  );
}

export default SampleActionButtonDropdownPlugin;
