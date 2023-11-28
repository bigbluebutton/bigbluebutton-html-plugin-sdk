import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactModal from 'react-modal';
import './style.css';

import { BbbPluginSdk, PluginApi, CurrentPresentation, ActionButtonDropdownSeparator, ActionButtonDropdownOption } from 'bigbluebutton-html-plugin-sdk';
import { SampleActionButtonDropdownPluginProps } from './types';

function SampleActionButtonDropdownPlugin({ pluginUuid: uuid }: SampleActionButtonDropdownPluginProps) {
  BbbPluginSdk.initialize(uuid);
  const [showModal, setShowModal] = useState<boolean>(false);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [currentSlideText, setCurrentSlideText] = useState<string>('');
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
      console.log(`Error while requesting data from bbb-web. Could not get the base text, error: ${err.message}`);
    }).finally(() => {
      setTimeout(() => {
        setShowModal(false);
      }, 10000);
    });
  };

  const handleCloseModalAndResetPoll = (): void => {
    setShowModal(false);
  };

  useEffect(() => {
    if (currentUser?.presenter){
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
      ]);
    }
  }, [currentPresentation, currentUser]);

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
