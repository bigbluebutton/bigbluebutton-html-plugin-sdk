import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactModal from 'react-modal';
import './style.css';

import { BbbPluginSdk, PluginApi, PresentationToolbarButton, PresentationToolbarInterface, CustomSubscriptionHookOptions } from 'bigbluebutton-html-plugin-sdk';
import { SampleCustomSubscriptionPluginProps } from '../types';
import { UrlsJson, Presentation, PresentationFromGraphqlWrapper } from './types';

function SampleCustomPresentationSubscriptionPlugin({ pluginUuid: uuid }: SampleCustomSubscriptionPluginProps):
 React.ReactElement{
  BbbPluginSdk.initialize(uuid)
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nextSlideUrls, setNextSlideUrls] = useState<UrlsJson>()

  const { data: currentPresentation } = pluginApi.useCurrentPresentation();
  const nextSlidePage = currentPresentation?.currentPage?.num + 1 || 1;

  const { data: dataResult } = pluginApi.useCustomSubscription<PresentationFromGraphqlWrapper>(`
      subscription Presentation($nextSlidePage: Int!) {
        pres_presentation (where: {current: {_eq: true}}) {
          presentationId
          pages (where: {num: {_eq: $nextSlidePage}}) {
            num
            urlsJson
          }
        }
      }
    `, {
    variables: {
      nextSlidePage
    }
  } as CustomSubscriptionHookOptions);

  const presentationNextPage: Presentation[] | undefined = dataResult ? dataResult.pres_presentation : undefined ;

  const handleFetchPresentationData = (presentationNextPage: Presentation[]) => {
    const nextSlideUrlsObject: UrlsJson = presentationNextPage[0].pages[0].urlsJson;
    setNextSlideUrls(nextSlideUrlsObject);
    setShowModal(true);
  };

  const handleCloseModalAndResetPoll = (): void => {
    setShowModal(false);
  };

  useEffect(() => {
    const currentObjectToSendToClient: PresentationToolbarInterface = 
      new PresentationToolbarButton({
        label: 'See preview of next slide',
        tooltip: 'It requests the content of the next slide',
        onClick: () => {
          if (presentationNextPage) {
            handleFetchPresentationData(presentationNextPage);
          }
        },
      });
    pluginApi.setPresentationToolbarItems([currentObjectToSendToClient]);
  }, [dataResult]);

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
        <h1>Preview of next slide: </h1>
        <div className="slide-text-container">
          {nextSlideUrls !== undefined ?
            <img
              width='90%'
              src={nextSlideUrls.svg}
            /> : null
          }
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

export default SampleCustomPresentationSubscriptionPlugin;
