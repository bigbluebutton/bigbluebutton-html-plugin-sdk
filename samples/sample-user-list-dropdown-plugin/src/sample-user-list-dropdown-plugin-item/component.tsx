import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactModal from 'react-modal';
import './style.css';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleUserListDropdownPluginProps } from './types';

import { IsModeratorTag } from '../IsModeratorTag/component';

interface ModalInfo {
  userId: string
  userName: string
  talking: boolean
  isModerator: boolean
}

function SampleUserListDropdownPlugin({
  pluginUuid: uuid,
}: SampleUserListDropdownPluginProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({} as ModalInfo);
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const loadedUserList = BbbPluginSdk.useLoadedUserList();
  const pres = BbbPluginSdk.useCurrentPresentation();

  useEffect(() => {
    if (loadedUserList !== undefined && loadedUserList.length > 0) {
      const listOfObjectsToSend:
      Array<BbbPluginSdk.UserListDropdownItemWrapper> = loadedUserList.map(
        (user) => {
          const currentObjectToSendToClient:
            BbbPluginSdk.UserListDropdownItem = new BbbPluginSdk.UserListDropdownButton({
              label: 'Click to see participant information',
              icon: 'user',
              tooltip: 'This will open a modal dialog',
              allowed: true,
              onClick: () => {
                setModalInfo({
                  userId: user.userId,
                  userName: user.name,
                  talking: user?.voice?.talking,
                  isModerator: user.isModerator,
                } as ModalInfo);
                setShowModal(true);
              },
            });
          return {
            userId: user.userId,
            userListDropdownItem: currentObjectToSendToClient,
          } as BbbPluginSdk.UserListDropdownItemWrapper;
        },
      );
      pluginApi.setUserListDropdownItems(listOfObjectsToSend);
    }
  }, [loadedUserList, pres]);

  return (
    <ReactModal
      className="plugin-modal"
      overlayClassName="modal-overlay"
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>
          Modal sample for user
          <br />
          {modalInfo.userName}
        </h1>
        <table className="user-info-modal">
          <tr>
            <td className="table-right">Name: </td>
            <td className="table-left">{modalInfo.userName}</td>
          </tr>
          <tr>
            <td className="table-right">User id: </td>
            <td className="table-left">{modalInfo.userId}</td>
          </tr>
          <tr>
            <td className="table-right">Role: </td>
            <td className="table-left">
              <IsModeratorTag
                isModerator={modalInfo.isModerator}
              />
            </td>
          </tr>
        </table>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
          }}
          className="button-style"
        >
          Close Modal
        </button>
      </div>
    </ReactModal>
  );
}

export default SampleUserListDropdownPlugin;
