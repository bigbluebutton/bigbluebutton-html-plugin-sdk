import { BbbPluginSdk, PluginApi, LoadedUserListData } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';
import { GenericContentExampleProps } from './types';

export function GenericContentExample(props: GenericContentExampleProps) {
  const {
    uuid,
  } = props;
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const loadedUserList = pluginApi.useLoadedUserList();
  return (
    <div style={{
      background: 'white',
      width: '100%',
      height: '100%',
    }}
    >
      <h1>Generic component title</h1>
      <h2>Here is the loaded user-list</h2>
      <ul>
        {loadedUserList.data?.map((user: LoadedUserListData) => (
          <li key={user.userId}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
