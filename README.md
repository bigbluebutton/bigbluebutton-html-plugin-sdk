# BigBlueButton SDK for HTML5 Client Plugins

This repository contains the SDK for developing BigBlueButton plugins.
Plugins are React components that can be loaded from external sources
by the BigBlueButton HTML5 client to extend its functionalities.

## Examples

A variety of example implementations to manipulate different parts of the
BBB client can be found in the [`samples`](samples) folder.

## Usage

This is a general instruction on how to use a plugin.
For a detailed configuration example of each use case,
have a look at the READMEs in the respective [samples](samples)-folders.

### Running the Plugin from Source

For development purposes you can run a plugin locally from source.

For example if you take the [`sample-action-button-dropdown-plugin`](samples/sample-action-button-dropdown-plugin),
you do the following:

1. Start the development server:

   ```bash
   cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-action-button-dropdown-plugin
   npm install
   npm start
   ```
2. Add reference to it on BigBlueButton's `settings.yml`:

   ```yaml
   public:
     plugins:
       - name: SampleActionButtonDropdownPlugin
         url: http://127.0.0.1:4701/static/SampleActionButtonDropdownPlugin.js
   ```

_N.B.:_ Be aware that in this case the url is interpreted from the plugin in the browser,
so the localhost is actually your local development machine.

### Building the Plugin

To build a plugin for production use
(again, using the example of [`sample-action-button-dropdown-plugin`](samples/sample-action-button-dropdown-plugin)),
follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-action-button-dropdown-plugin
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleActionButtonDropdownPlugin.js`.
This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: SampleActionButtonDropdownPlugin
      url: <<PLUGIN_URL>>
  ... // All other configurations
```

#### Hosting the Plugin on a BBB Server

While the plugin can be hosted on any Server, it is also possible to host the bundled file directly on
a BigBlueButton server. For that you copy the `dist/SampleActionButtonDropdownPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`.
In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/SampleActionButtonDropdownPlugin.js`.

## API

### Extensible UI areas

- Action bar items (button, separator)
- Action Button Dropdown Items (option, separator)
- Audio settings dropdown items (option, separator)
- Camera settings dropdown items (option, separator)
- Nav bar items (button, info)
- Presentation dropdown items (option, separator)
- Presentation toolbar items (button, separator, spinner)
- User camera settings dropdown items (option, separator)
- User list dropdown items (option, separator)
- User list item additional information (item, label)
- Floating window item (floatingWindow)
- Generic component (genericComponent)

### Getters available through the API:

- `getSessionToken`: returns the user session token located on the user's URL.
- `getJoinUrl`: returns the join url associated with the parameters passed as an argument. Since it fetches the BigBlueButton API, this getter method is asynchronous.

### Realtime data consumption

- `useCurrentPresentation` hook: provides information regarding the current presentation;
- `useLoadedUserList` hook: provides information regarding the loaded user list (displayed in the screen);
- `useCurrentUser` hook: provides information regarding the current user;
- `useUsersBasicInfo` hook: provides information regarding all users (only crucial information: userId, name and role);
- `useLoadedChatMessages` hook: provides information regarding the loaded chat messages;
- `useCustomSubscription` hook: with this hook, the developer can query pretty much anything graphql can provide. Note: Make sure that, on BBB version change, the custom subscriptions you make will work as expected.
- `usePluginSettings` hook: it provides all the specific settings regarding the current plugin it's been loaded from.
- `useTalkingIndicator` hook: it gives you invormation on the user-voice data, that is, who is talking or muted.
- `useMeeting` hook: it gives you information on the current meeting that the user is on.

### Real time data exchange

- `useDataChannel` hook: this will allow you to exchange information (Send and receive) amongst different users through the same plugin;

So for this hook to read the data from the data channel, the developer will be able to choose the format in which they want it.The possible formats are described down below:

- ALL_ITEMS: Fetches all items from specific data-channel and specific subchannel-name since the begining of the meeting from the newest to the latest (It can be used as a history);
- LATEST_ITEM: Fetches only the latest item pushed to the data-channel within a specific subchannel-name since the begining of the meeting;
- NEW_ITEMS: Fetches the new items pushed to the data-channel within a specific subchannel-name since the moment that the `useDataChannel` hook has been called (It will not see entries sent previous to that moment);

One can find examples of usage any of the plugin samples or official ones. The syntax is described ahead:

```typescript
const [
  response, // Data that will be returned
  pushEntryFunction, // Function to push another item to the data-channel
  deleteEntryFunction, // Function to delete specific item or wipe all
] = useDataChannel(
  channelName, // Defined according to what is on settings.yml from bbb-htlm5
  DataChannelTypes.All_ITEMS, // | LATEST_ITEM | NEW_ITEMS -> ALL_ITEMS is default
  subChannelName = 'default', // If no subchannelName is specified, it will be 'default'
);
```

Wiping all data off will delete every item from the specific data-channel within the specific subchannel-name.

The data-channel name must be written in the settings.yml.

All the permission for writing and deleting must be in the yaml too just like the example below:

```yaml
public:
  plugins:
    - name: PluginName
      url: http://<your-hosted-plugin>/PluginName.js
      dataChannels:
        - name: channel-name
          # writePermission options: moderator, presenter, all
          writePermission: ['moderator','presenter']
          # deletePermission options: moderator, sender, presenter, all
          deletePermission:
            - moderator
            - sender
```

If no permission is mentioned in the yaml (writing or deleting), no one will be able proceed with that specific action:

The `pushEntryFunction` has a minor detail to pay attention to, it is possible to specify the users who you want to send the item to, if none is specified, all will receive the item, such as done ahead:

```typescript
pushEntryFunction(objectToBePushed: T, receivers?: ObjectTo[])
export interface ToUserId {
  userId: string;
}
export interface ToRole {
  role: DataChannelPushEntryFunctionUserRole;
}

export type ObjectTo = ToUserId | ToRole;
```

### Real time ui data consumption

- `useUiData` hook: This will return certain data from the UI depending on the parameter the developer uses. It works just like the useUiEvent hook, but instead of passing a callback as a parameter to be run everytime the event occurs, it will return the data directly, keep in mind that the second parameter is the default value that this function will assume. Possible choices:
  - IntlLocaleUiDataNames.CURRENT_LOCALE;
  - ChatFormUiDataNames.CURRENT_CHAT_INPUT_TEXT;
  - ChatFormUiDataNames.CHAT_INPUT_IS_FOCUSED;
  - ExternalVideoVolumeUiDataNames.CURRENT_VOLUME_VALUE;
  - ExternalVideoVolumeUiDataNames.IS_VOLUME_MUTED;
  - UserListUiDataNames.USER_LIST_IS_OPEN;

Example of usage:

```typscript
const currentLocale = pluginApi.useUiData(IntlLocaleUiDataNames.CURRENT_LOCALE, {
    locale: 'en',
    fallbackLocale: 'en',
  });
```

### Ui Commands to automatize tasks in BBB

`uiCommands` object: It basically contains all the possible commands available to the developer to interact with the core BBB UI, see the ones implemented down below:

- chat:
  - form:
    - open: this function will open the sidebar chat panel automatically;
    - fill: this function will fill the form input field of the chat passed in the argument as {text: string}
- external-video:
  - volume:
    - set: this function will set the external video volume to a certain number between 0 and 1 (that is 0% and);
- layout:
  - set: This function set the current layout with its argument (example: LayoutComponentListEnum.GENERIC_COMPONENT)
  - unset: This function unset the current layout with its argument (example: LayoutComponentListEnum.GENERIC_COMPONENT)

### Dom Element Manipulation

- `useChatMessageDomElements` hook: This hook will return the dom element of a chat message reactively, so one can modify whatever is inside, such as text, css, js, etc.;
