import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactModal from 'react-modal';
import './style.css';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SamplePresentationToolbarPluginProps } from './types';

function SamplePresentationToolbarPlugin({ pluginUuid: uuid }: SamplePresentationToolbarPluginProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [currentSlideText, setCurrentSlideText] = useState<string>('');

  const currentPresentation = BbbPluginSdk.useCurrentPresentation();

  const setPresentationItemSpinner = () => {
    setIsIdle(true);
  };

  const setPresentationButtonWaitForClick = () => {
    setIsIdle(false);
  };

  const requestLastPages = (currentTxtUri: string) => fetch(currentTxtUri)
    .then((response) => response.text());

  const handleFetchPresentationData = (currentPres: BbbPluginSdk.Presentation) => {
    const currentTxtUri = currentPres.currentPage.urls.text;
    requestLastPages(currentTxtUri).then((currentPageContent) => {
      setCurrentSlideText(currentPageContent);
      setShowModal(true);
    }).catch((err) => {
      console.log(`Error while requesting data from bbb-web. Could not get the base text, error: ${err.message}`);
    }).finally(() => {
      setTimeout(() => {
        setShowModal(false);
        setPresentationButtonWaitForClick();
      }, 10000);
    });
  };

  const handleCloseModalAndResetPoll = (): void => {
    setShowModal(false);
  };

  useEffect(() => {
    let currentObjectToSendToClient: BbbPluginSdk.PresentationToolbarItem;
    if (!isIdle) {
      currentObjectToSendToClient = new BbbPluginSdk.PresentationToolbarButton({
        label: '10 seconds',
        tooltip: 'this is a button injected by plugin',
        onClick: () => {
          handleFetchPresentationData(currentPresentation);
          setPresentationItemSpinner();
        },
      });
    } else {
      currentObjectToSendToClient = new BbbPluginSdk.PresentationToolbarSpinner();
    }
    pluginApi.setPresentationToolbarItems([currentObjectToSendToClient]);
  }, [isIdle, currentPresentation]);

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

export default SamplePresentationToolbarPlugin;
