import { BbbPluginSdk, DataChannelDispatcherUserRole, GraphqlResponseWrapper, PluginApi } from "bigbluebutton-html-plugin-sdk";
import { DataChannelMessagesWrapper, DispatcherFunction } from "bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types";
import { DataExampleType } from "../../sample-action-button-dropdown-plugin-item/component";
import * as React from "react";

interface TestComponentProps {
    uuid: string;
}

export const TestComponent = (props: TestComponentProps) => {
    const {
        uuid,
    } = props;

    const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

    const loadedUserList = pluginApi.useLoadedUserList();
    return (
        <div style={{
            background:'white',
            width: '100%',
            height: '100%',
        }}>
            <h1>Generic component title</h1>
            <h2>Here is the loaded user-list</h2>
            <ul>
                {loadedUserList.data?.map((user) => (
                    <li>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}