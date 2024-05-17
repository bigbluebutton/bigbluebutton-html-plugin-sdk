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
  LayoutPresentatioAreaUiDataNames,
  UiLayouts,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import * as ReactDOM from 'react-dom/client';
import { SampleActionButtonDropdownPluginProps } from './types';
import { GenericComponentExample } from '../generic-component-example/component';

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
  const [
    showingGenericComponentInPresentationArea,
    setShowingGenericComponentInPresentationArea,
  ] = useState(false);
  const { data: currentUser } = pluginApi.useCurrentUser();
  const layoutInformation = pluginApi.useUiData(LayoutPresentatioAreaUiDataNames.CURRENT_ELEMENT, [{
    isOpen: true,
  }]);

  const { data: currentPresentation } = pluginApi.useCurrentPresentation();

  const requestLastPages = (currentTxtUri: string) => fetch(currentTxtUri)
    .then((response) => response.text());

  const handleFetchPresentationData = (currentPres: CurrentPresentation) => {
    const currentTxtUri = currentPres.currentPage.urlsJson.text;
    requestLastPages(currentTxtUri).then((currentPageContent) => {
      setCurrentSlideText(currentPageContent);
      setShowModal(true);
    }).catch((err) => {
      pluginLogger.error(`Error while requesting data from bbb-web. Could not get the base text, error: ${err.message}`);
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
    if (!showingGenericComponentInPresentationArea) {
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
          label: 'Fetch presentation content',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            handleFetchPresentationData(currentPresentation);
          },
        }),
        new ActionButtonDropdownOption({
          label: showingGenericComponentInPresentationArea ? 'Return previous presentation content' : 'Set different content in presentation area',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: handleChangePresentationAreaContent,
        }),
      ]);
    }
  }, [currentPresentation, currentUser, showingGenericComponentInPresentationArea]);

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
