import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactModal from 'react-modal';
import './style.css';
import { WhiteboardToolbarButtonProps } from './types';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';

declare let window: BbbPluginSdk.CustomWindowPlugin;

function WhiteboardToolbarItem({ pluginName }: WhiteboardToolbarButtonProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isIdle, setIsIdle] = useState<Boolean>(false);

  console.log("Teste antes do useState ----")
  const currentPresentation = BbbPluginSdk.useCurrentPresentation();
  console.log("Teste aqui do hook dentro do plugin", currentPresentation);

  const getPresentationIdData = Object.getPrototypeOf(async function() {}).constructor(`
    return require('/imports/api/presentations').default.find({current: true}).fetch();
  `);

  const getSlideInfo_1 = () => {
    const presentationId = getPresentationIdData()[0].id;
    const getSlideInDB = Object.getPrototypeOf(async function() {}).constructor(`
      return require('/imports/api/slides').Slides.find({current: true, presentationId: "${presentationId}"}).fetch();
    `);
    const slideData = getSlideInDB();
    return slideData[0].txtUri
  }

  const setWhiteboardButtonLoading = () => {
    setIsIdle(true);
  }

  const setWhiteboardButtonWaitForClick = () => {
    setIsIdle(false);
  }
  const requestLastPages = (currentTxtUri: string) => fetch(currentTxtUri).then((response) => response.text());

  const handleGenerateQuiz = (currentPres: BbbPluginSdk.CurrentPresentation) => {
    const currentTxtUri = currentPres.urls.text;
    console.log("1 - atual --- 2 - antigo (Teste) ----", currentTxtUri, getSlideInfo_1())
    requestLastPages(currentTxtUri).then(currentPageContent => {
      console.log(currentPageContent)
      setShowModal(true);
    }).catch((err) => {
      console.log("Error while requesting data from bbb-web. Could not get the base text, error: " + err.message);
    }).finally(() => {
      setTimeout(() => {
        setShowModal(false);
        setWhiteboardButtonWaitForClick()
      }, 10000)
    })
  }

  const handleCloseModalAndResetPoll = (): void => {
    setShowModal(false);
  }

  useEffect(() => {
    let currentObjectToSendToClient: BbbPluginSdk.WhiteboardToolbarItems;
    console.log("Teste aqui ver se atualiza certinho ----> ", currentPresentation)
    if (!isIdle){
      currentObjectToSendToClient = {
        name: pluginName,
        type: BbbPluginSdk.PresentationType.PRESENTATION_TOOLBAR_BUTTON,
        label: "10 seconds",
        tooltip: "this is a button injected by plugin",
        onClick: () => {
          handleGenerateQuiz(currentPresentation);
          setWhiteboardButtonLoading();
        },
      } as BbbPluginSdk.WhiteboardToolbarButtonObj;
    } else {
      currentObjectToSendToClient = {
        name: pluginName,
        type: BbbPluginSdk.PresentationType.PRESENTATION_TOOLBAR_LOADING,
      } as BbbPluginSdk.WhiteboardToolbarLoading
    }
    const getWhiteboardToolbarItems: BbbPluginSdk.GetWhiteboardToolbarItems = () => [currentObjectToSendToClient];
    window.bbb_plugins[pluginName] = {
      getWhiteboardToolbarItems
    };
    window.dispatchEvent(new Event(BbbPluginSdk.UPDATE_PLUGIN_DATA))
  }, [isIdle, currentPresentation])

  return (
    <ReactModal
      className="plugin-modal"
      overlayClassName="modal-overlay"
      isOpen={showModal}
      onRequestClose={handleCloseModalAndResetPoll}
    >
      <div
        style={{width: '100%', height: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column'}}
      >
        <h1>Hey, I am a modal sample</h1>
        <button
          onClick={() => {setShowModal(false)}}
        >
          Close Modal
        </button>
      </div>
    </ReactModal>
  );
}

export default WhiteboardToolbarItem;
