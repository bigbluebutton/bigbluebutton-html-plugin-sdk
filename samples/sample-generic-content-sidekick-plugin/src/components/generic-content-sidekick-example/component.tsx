import { LoadedUserListData } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';
import { GenericContentSidekickExampleProps } from './types';

export function GenericContentSidekickExample(props: GenericContentSidekickExampleProps) {
  const {
    pluginApi,
  } = props;
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
