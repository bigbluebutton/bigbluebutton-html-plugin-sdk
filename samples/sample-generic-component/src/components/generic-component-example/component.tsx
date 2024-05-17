import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';

interface GenericComponentExampleProps {
    uuid: string;
    // eslint-disable-next-line react/require-default-props
    title?: string;
}

export function GenericComponentExample(props: GenericComponentExampleProps) {
  const {
    uuid,
    title,
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
      <h1>{title || 'Generic component title'}</h1>
      <h2>Here is the loaded user-list</h2>
      <ul>
        {loadedUserList.data?.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
