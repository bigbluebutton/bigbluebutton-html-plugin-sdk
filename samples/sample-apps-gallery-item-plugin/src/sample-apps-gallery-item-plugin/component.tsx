import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactModal from 'react-modal';

import {
  BbbPluginSdk, AppsGalleryInterface, AppsGalleryEntry,
  PluginApi, pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleAppsGalleryItemPluginProps } from './types';
import './style.css';

function SampleAppsGalleryItemPlugin({
  pluginUuid: uuid,
}: SampleAppsGalleryItemPluginProps): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const buttonToUserListItem:
          AppsGalleryInterface = new AppsGalleryEntry({
            icon: 'user',
            name: 'Sample Apps Gallery Entry',
            onClick: () => {
              pluginLogger.info('The apps gallery item from plugin was clicked');
              setModalOpen(true);
            },
          });

    pluginApi.setAppsGalleryItems([
      buttonToUserListItem,
    ]);
  }, []);

  return (
    <ReactModal
      className="plugin-modal"
      overlayClassName="modal-overlay"
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <div
        style={{
          width: '100%', height: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column',
        }}
      >
        <h1>Hey, I am a modal sample</h1>
        <button
          type="button"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          Close Modal
        </button>
      </div>
    </ReactModal>
  );
}

export default SampleAppsGalleryItemPlugin;
