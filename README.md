# BigBlueButton SDK for HTML5 Client Plugins

This repository contains the SDK for developing BigBlueButton plugins.
Plugins are React components that can be loaded from external sources
by the BigBlueButton HTML5 client to extend its functionalities.

## Overview

An overview of the plugin architecture and capabilities can be found [here](https://github.com/bigbluebutton/plugins/blob/main/README.md#capabilities-and-technical-details).

For comprehensive documentation including architecture details, please refer to the [official BigBlueButton plugins documentation](https://docs.bigbluebutton.org/plugins/).

## Examples

A variety of example implementations to manipulate different parts of the BBB client can be found in the [`samples`](samples) folder.

## Usage

This is a general instruction on how to use a plugin.
For a detailed configuration example of each use case,
have a look at the READMEs in the respective [samples](samples)-folders.

### Running the Plugin from Source

For development purposes you can run a plugin locally from source.

For example if you take the [`sample-action-button-dropdown-plugin`](samples/sample-action-button-dropdown-plugin),
you do the following:

*Running from source code with local BBB-server*

1. Start the development server:

   ```bash
   cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-action-button-dropdown-plugin
   npm install
   npm start
   ```

2. Add reference to it on BigBlueButton's `/create` call or add it on `/usr/share/bbb-web/WEB-INF/classes/bigbluebutton.properties`:

```
pluginManifests=[{"url": "http://localhost:4701/manifest.json"}]
```

*Running from source code with a remote BBB-server*

If you are running your BBB-server elsewhere, than you can't simply point the manifest URL to a local address, you'll need to either serve the built version into a CDN or serve the dev version using a service to make it public. And for the second option we'd recommend NGROK. Here are the instructions to do that:

1. Create an account on https://ngrok.com/ (Official website of NGROK);

2. Install NGROK in your computer. They have a guide for that right after you created your account;

3. Start the Plugin development server:

```bash
cd $HOME/src/plugin-pick-random-user-plugin
npm install
npm start
```

4. Start the NGROK server into your machine with the following command:

```bash
ngrok http http://172.17.0.1:4701
```

Make sure to point NGROK to the correct local URL (In our case - The samples are made this way, for instance - we used `http://172.17.0.1:4701`)

Right after that, NGROK will create an interface into your terminal and will display the URL which your static files are being served.

Here's an example of URL: `https://<uuid>.ngrok-free.app`

You can already interact with this URL and access both 

`https://<uuid>.ngrok-free.app/manifest.json`

or

`https://<uuid>.ngrok-free.app/PickRandomUserPlugin.js`


5. Add this create parameter into the API-mate of the server you are testing it on:

```
pluginManifests=[{"url": "https://<uuid>.ngrok-free.app/manifest.json"}]
```

And there you go, you can test it freely.

### Building the Plugin (Production)

To build a plugin for production use
(again, using the example of [`sample-action-button-dropdown-plugin`](samples/sample-action-button-dropdown-plugin)),
follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-action-button-dropdown-plugin
npm ci
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleActionButtonDropdownPlugin.js` along with the `manifest.json`.
These files can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's `manifest.json` URL to `bigbluebutton.properties` or you can simply send it via `/create` parameter:

```
pluginManifests=[{"url":"<your-domain>/path/to/manifest.json"}]
```

#### Hosting the Plugin on a BBB Server

While the plugin can be hosted on any Server, it is also possible to host the bundled file directly on
a BigBlueButton server. For that you copy `dist/SampleActionButtonDropdownPlugin.js` and `dist/manifest.json` to the folder `/var/www/bigbluebutton-default/assets/plugins/sampleActionButtonDropdownPlugin`.
In this case, the your manifest URL will be `https://<your-host>/plugins/sampleActionButtonDropdownPlugin/manifest.json`.

### Manifest Json

Here is a complete `manifest.json` example with all possible configurations:

```json
{
  "requiredSdkVersion": "~0.0.59",
  "name": "MyPlugin",
  "version": "1.0.0",
  "javascriptEntrypointUrl": "MyPlugin.js",
  "javascriptEntrypointIntegrity": "sha384-Bwsz2rxm...",
  "localesBaseUrl": "https://cdn.domain.com/my-plugin/",
  "dataChannels": [
    {
      "name": "public-channel",
      "pushPermission": ["moderator","presenter"], // "moderator","presenter", "all"
      "replaceOrDeletePermission": ["moderator", "creator"] // "moderator", "presenter","all", "creator"
    }
  ],
  "eventPersistence": {
    "isEnabled": true, // By default it is not enabled
  },
  "remoteDataSources": [
    {
      "name": "allUsers",
      "url": "${meta_pluginSettingsUserInformation}",
      "fetchMode": "onMeetingCreate", // Possible values: "onMeetingCreate", "onDemand" 
      "permissions": ["moderator", "viewer"]
    }
  ],
  "serverCommandsPermission": {
    "chat.sendCustomPublicChatMessage": ["presenter", "moderator"]
  },
  "settingsSchema": [
    {
      "name": "myJson",
      "label": "myJson",
      "required": true,
      "defaultValue": {
        "abc": 123
      },
      "type": "json" // Possible values: "int", "float", "string", "boolean", "json"
    }
  ]
}
```

**Manifest field descriptions:**

| Field | Required | Description |
|-------|----------|-------------|
| `requiredSdkVersion` | Yes | Specifies the SDK version compatibility (e.g., `~0.0.59`) |
| `name` | Yes | Plugin name as referenced in configuration |
| `version` | No | Plugin version for cache-busting (appends `?version=X` to JS URL) |
| `javascriptEntrypointUrl` | Yes | URL to the main JavaScript bundle |
| `javascriptEntrypointIntegrity` | No | Subresource Integrity (SRI) hash for security |
| `localesBaseUrl` | No | Base URL for internationalization locale files |
| `dataChannels` | No | Array of data channels for inter-client communication |
| `eventPersistence` | No | Configuration for persisting events to meeting recording |
| `remoteDataSources` | No | External API endpoints for fetching data |
| `serverCommandsPermission` | No | Role-based permissions for server commands |
| `settingsSchema` | No | Configuration schema for plugin settings |

**Possible values for permissions:**
- `pushPermission`: `"moderator"`, `"presenter"`, `"all"`, `"viewer"`
- `replaceOrDeletePermission`: `"moderator"`, `"presenter"`, `"all"`, `"viewer"`, `"creator"`
- `serverCommandsPermission`: `"moderator"`, `"presenter"`, `"all"`, `"viewer"`
- `remoteDataSources.permissions`: `"moderator"`, `"viewer"`, `"presenter"`

**Possible values for fetchMode:**
- `"onMeetingCreate"`: Fetch once when meeting is created and cache the result
- `"onDemand"`: Fetch every time the plugin requests the data

**Possible values for settingsSchema.type:**
- `"int"`: Integer number
- `"float"`: Floating-point number
- `"string"`: Text string
- `"boolean"`: True/false value
- `"json"`: JSON object

To better understand remote-data-sources, please, refer to [this section](#external-data-resources)

**settingsSchema:**

The settingsSchema serves two main purposes:

1. **Validation:** Ensures that all required settings are provided for a plugin. If any required setting is missing, the plugin will not load.
2. **Configuration Exposure:** Lists all available settings for the plugin, enabling external systems—such as a Learning Management System (LMS)—to present these settings to a meeting organizer. This allows the organizer to configure the plugin manually before the meeting begins.

| **Name**       | **Required** | **Description**                                                                                                |
| -------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `name`         | Yes          | The name of the setting as defined in the YAML file                                                            |
| `label`        | No           | A user-facing label that appears in the integration UI                                                         |
| `required`     | Yes          | Indicates whether this setting must be provided (`true` or `false`)                                            |
| `defaultValue` | No           | The default value to use if no setting is explicitly defined                                                   |
| `type`         | Yes          | The expected data type for the setting. Possible values: `"int"`, `"float"`, `"string"`, `"boolean"`, `"json"` |

**Example**

Given the `settingsSchema` defined in the `manifest.json` seen, the corresponding YAML configuration file (`/etc/bigbluebutton/bbb-html5.yml`) would look like:

```yml
public:
  plugins:
    - name: MyPlugin
      settings:
        myJson:
          abc: my123
          def: 3234
```

## Testing SDK

To setup and run the automated tests for the plugin SDK samples, check the [testing doc](/tests/README.md)

## API

### Extensible UI areas

Foreach of the following ui-extensible-area, we have a different setter function accessible via `pluginApi`.

Mind that, although each area has its own structure, all the functions follows a certain argument structure, and returns nothing, that would be:

```ts
pluginApi.setterFunctionExample([{
  objectProperty1: 'string',
  objectProperty2: 123,
}])
```

See, it is basically a function that requires an array as an argument, with which the more items you push to that array, the more of that extensible area you will have.

That being said, here are the extensible areas we have so far:

- Action bar items (button, separator)
- Action Button Dropdown Items (option, separator)
- Audio settings dropdown items (option, separator)
- Camera settings dropdown items (option, separator)
- Options settings dropdown items (option, separator)
- Nav bar items (button, info)
- Presentation dropdown items (option, separator)
- Presentation toolbar items (button, separator, spinner)
- User camera settings dropdown items (option, separator)
- User list dropdown items (option, separator)
- User list item additional information (item, label)
- Floating window item (floatingWindow)
- Generic Content (main, sidekick)
- User Camera Helper (button)
- Screenshare Helper (button)

Mind that no plugin will interfere into another's extensible area. So feel free to set whatever you need into a certain plugin with no worries.

**Example usage for different extensible areas:**

```typescript
BbbPluginSdk.initialize(pluginUuid);
const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

useEffect(() => {
  // 1. Action Bar Items (bottom toolbar)
  pluginApi.setActionsBarItems([
    new ActionsBarButton({
      icon: { iconName: 'user' },
      tooltip: 'My custom action',
      onClick: () => pluginLogger.info('Action bar button clicked'),
      position: ActionsBarPosition.RIGHT,
    }),
    new ActionsBarSeparator({
      position: ActionsBarPosition.RIGHT,
    }),
  ]);

  // 2. Action Button Dropdown Items (three dots menu in action bar)
  pluginApi.setActionButtonDropdownItems([
    new ActionButtonDropdownSeparator(),
    new ActionButtonDropdownOption({
      label: 'Custom dropdown option',
      icon: 'copy',
      tooltip: 'This is a custom option',
      onClick: () => pluginLogger.info('Dropdown option clicked'),
    }),
  ]);

  // 3. Options Dropdown Items (three dots menu in top-right)
  pluginApi.setOptionsDropdownItems([
    new OptionsDropdownSeparator(),
    new OptionsDropdownOption({
      label: 'Plugin Settings',
      icon: 'settings',
      onClick: () => pluginLogger.info('Options clicked'),
    }),
  ]);

  // 4. Nav Bar Items (top navigation bar)
  pluginApi.setNavBarItems([
    new NavBarButton({
      icon: 'user',
      label: 'Custom Nav Button',
      tooltip: 'Navigate to custom area',
      position: NavBarItemPosition.RIGHT,
      color: 'primary',
      circle: true,
      hideLabel: true,
      size: 'sm', // Available sizes: 'sm', 'md', 'lg', 'jumbo'.
      style: { marginLeft: '4px' },
      onClick: () => pluginLogger.info('Nav button clicked'),
      hasSeparator: true,
    }),
    new NavBarInfo({
      label: 'Plugin Active',
      position: NavBarItemPosition.CENTER,
      hasSeparator: false,
    }),
  ]);

  // 5. Presentation Toolbar Items (presentation controls)
  pluginApi.setPresentationToolbarItems([
    new PresentationToolbarButton({
      label: 'Custom Tool',
      tooltip: 'Use custom presentation tool',
      onClick: () => pluginLogger.info('Presentation tool clicked'),
    }),
    new PresentationToolbarSeparator(),
  ]);

  // 6. User List Dropdown Items (per-user menu)
  pluginApi.setUserListDropdownItems([
    new UserListDropdownSeparator(),
    new UserListDropdownOption({
      label: 'View Profile',
      icon: 'user',
      onClick: (userId) => {
        pluginLogger.info('View profile for user:', userId);
      },
    }),
  ]);

  // 7. Audio Settings Dropdown Items
  pluginApi.setAudioSettingsDropdownItems([
    new AudioSettingsDropdownOption({
      label: 'Audio Plugin Settings',
      icon: 'settings',
      onClick: () => pluginLogger.info('Audio settings clicked'),
    }),
  ]);

  // 8. Camera Settings Dropdown Items
  pluginApi.setCameraSettingsDropdownItems([
    new CameraSettingsDropdownOption({
      label: 'Camera Plugin Settings',
      icon: 'video',
      onClick: () => pluginLogger.info('Camera settings clicked'),
    }),
  ]);

  // 9. Floating Window
  pluginApi.setFloatingWindows([
    new FloatingWindow({
      top: 100,
      left: 100,
      width: 400,
      height: 300,
      movable: true,
      resizable: true,
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      contentFunction: (element: HTMLElement) => {
        const root = ReactDOM.createRoot(element);
        root.render(
          <div style={{ padding: '20px' }}>
            <h2>Custom Floating Window</h2>
            <p>This is custom plugin content!</p>
          </div>
        );
        return root;
      },
    }),
  ]);

  // 10. Generic Content Sidekick Area
  pluginApi.setGenericContentItems([
    new GenericContentSidekickArea({
      id: 'my-plugin-content',
      name: 'Plugin Content',
      section: 'Custom Section',
      buttonIcon: 'copy',
      open: false,
      contentFunction: (element: HTMLElement) => {
        const root = ReactDOM.createRoot(element);
        root.render(
          <div style={{ padding: '20px' }}>
            <h1>Sidekick Content</h1>
            <p>Custom sidekick panel content here!</p>
          </div>
        );
        return root;
      },
    }),
  ]);

  // 11. User List Item Additional Information
  pluginApi.setUserListItemAdditionalInformation([
    new UserListItemAdditionalInformation({
      userId: 'specific-user-id', // or use a function to determine dynamically
      label: 'VIP',
      icon: 'star',
    }),
  ]);

  // 12. Presentation Dropdown Items
  pluginApi.setPresentationDropdownItems([
    new PresentationDropdownOption({
      label: 'Export Presentation',
      icon: 'download',
      onClick: () => pluginLogger.info('Export presentation clicked'),
    }),
  ]);

  // 13. User Camera Dropdown Items
  pluginApi.setUserCameraDropdownItems([
    new UserCameraDropdownOption({
      label: 'Camera Effects',
      icon: 'video',
      displayFunction: ({ userId }) => {
        // Show only for specific users or conditions
        return true;
      },
      onClick: ({ userId, streamId }) => {
        pluginLogger.info('Camera option clicked:', userId, streamId);
      },
    }),
  ]);

}, []);

```

**Key Points:**
- Each extensible area has its own setter function (e.g., `setActionsBarItems`, `setOptionsDropdownItems`)
- Items are set as arrays, allowing multiple items per area
- Use separators to visually group related items
- Items from different plugins won't conflict - each plugin manages its own items
- Most items support icons, labels, tooltips, and onClick handlers
- Some items support positioning (LEFT, CENTER, RIGHT) or display conditions

### Auxiliary functions

- `getSessionToken`: returns the user session token located on the user's URL.
- `getJoinUrl`: returns the join url associated with the parameters passed as an argument. Since it fetches the BigBlueButton API, this getter method is asynchronous.
- `useLocaleMessages`: returns the messages to be used in internationalization functions (recommend to use `react-intl`, as example, refer to official plugins)

**Example usage:**

```typescript
BbbPluginSdk.initialize(pluginUuid);
const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

// Get session token
const sessionToken = pluginApi.getSessionToken();
console.log('Session token:', sessionToken);

// Get join URL (async)
useEffect(() => {
  pluginApi.getJoinUrl({
    fullName: 'John Doe',
    role: 'MODERATOR',
    // other join parameters...
  }).then((joinUrl) => {
    console.log('Join URL:', joinUrl);
  });
}, []);

// Use locale messages for internationalization
const localeMessages = pluginApi.useLocaleMessages();
console.log('Current locale:', localeMessages);

return null;

```

### Realtime data consumption

- `useCurrentPresentation` hook: provides information regarding the current presentation;
- `useLoadedUserList` hook: provides information regarding the loaded user list (displayed in the screen);
- `useCurrentUser` hook: provides information regarding the current user;
- `useUsersBasicInfo` hook: provides information regarding all users (only crucial information: userId, name and role);
- `useLoadedChatMessages` hook: provides information regarding the loaded chat messages;
- `useCustomSubscription` hook: with this hook, the developer can query pretty much anything graphql can provide. Note: Make sure that, on BBB version change, the custom subscriptions you make will work as expected.
- `usePluginSettings` hook: it provides all the specific settings regarding the current plugin it's been loaded from.
- `useTalkingIndicator` hook: it gives you information on the user-voice data, that is, who is talking or muted.
- `useMeeting` hook: it gives you information on the current meeting that the user is on.

So for these types of hooks, the return will follow the same structure:

```ts
export interface GraphqlResponseWrapper<TData> {
  loading: boolean;
  data?: TData;
  error?: ApolloError;
}
```

So we have the `data`, which is different for each hook, that's why it's a generic, the error, that will be set if, and only if, there is an error, otherwise it is undefined, and loading, which tells the developer if the query is still loading (being fetched) or not.

**Example usage:**

```typescript
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  // Get current user information
  const { data: currentUser, loading: userLoading, error: userError } =
    pluginApi.useCurrentUser();

  // Get meeting information
  const { data: meeting, loading: meetingLoading } = pluginApi.useMeeting();

  // Get current presentation
  const { data: presentation } = pluginApi.useCurrentPresentation();

  // Get all users basic info
  const { data: usersBasicInfo } = pluginApi.useUsersBasicInfo();

  // Get loaded chat messages
  const { data: chatMessages } = pluginApi.useLoadedChatMessages();

  // Get talking indicators
  const { data: talkingIndicators } = pluginApi.useTalkingIndicator();

  // Get plugin settings
  const { data: pluginSettings } = pluginApi.usePluginSettings();

  useEffect(() => {
    if (currentUser && !userLoading) {
      pluginLogger.info('Current user:', currentUser);
      pluginLogger.info('User is presenter:', currentUser.presenter);
      pluginLogger.info('User is moderator:', currentUser.isModerator);
    }
    if (userError) {
      pluginLogger.error('Error fetching user:', userError);
    }
  }, [currentUser, userLoading, userError]);

  useEffect(() => {
    if (meeting) {
      pluginLogger.info('Meeting ID:', meeting.meetingId);
      pluginLogger.info('Meeting name:', meeting.name);
    }
  }, [meeting]);

  useEffect(() => {
    if (presentation) {
      pluginLogger.info('Current page:', presentation.currentPage?.num);
      pluginLogger.info('Total pages:', presentation.totalPages);
    }
  }, [presentation]);

  useEffect(() => {
    if (chatMessages) {
      pluginLogger.info('Total messages:', chatMessages.length);
      chatMessages.forEach((msg) => {
        pluginLogger.info(`Message from ${msg.senderUserId} (${msg.senderRole}): ${msg.message}`);
      });
    }
  }, [chatMessages]);

  // Custom subscription example
  const { data: customData } = pluginApi.useCustomSubscription<CustomDataType>(`
    subscription MyCustomSubscription {
      user {
        userId
        name
        role
      }
    }
  `);

  useEffect(() => {
    if (customData) {
      pluginLogger.info('Custom subscription data:', customData);
    }
  }, [customData]);

```

### Realtime Data Creation

**`useCustomMutation` Hook**

The `useCustomMutation` hook enables you to post data to the backend (Postgres) using existing GraphQL mutations, respecting user permissions.

It works similarly to Apollo Client’s `useMutation`, returning a *trigger function* and a *result object* with information about the mutation execution. These will be described in more detail below.

One important difference is that the mutation query **must** be provided as a string. This is due to how the SDK communicates with the HTML5 client. As a consequence, you must explicitly define the type of the `variables` argument for the trigger function, as shown in the example below.

```typescript
interface MutationVariablesType {
  reactionEmoji: string;
}

const [trigger, result] = pluginApi.useCustomMutation<MutationVariablesType>(`
  mutation SetReactionEmoji($reactionEmoji: String!) {
    userSetReactionEmoji(reactionEmoji: $reactionEmoji)
  }
`);

// Later in the code, you can trigger the mutation:
trigger({
  variables: {
    reactionEmoji: '👏',
  },
});
```

Note that the same type (`MutationVariablesType`) passed as the generic parameter to `useCustomMutation` is also the type of the `variables` object in the trigger function.

The `result` object returned by the hook contains the following fields:

```typescript
const {
  called,
  data,
  error,
  loading,
} = result;
```

which follow this interface:

```typescript
interface MutationResultObject {
  called: boolean;   // Indicates if the trigger function has been called
  data?: object;     // Response data after the mutation is triggered
  error?: object;    // Error details from the mutation execution
  loading: boolean;  // Whether the mutation is currently loading (triggered or in progress)
}
```

### Real time data exchange

- `useDataChannel` hook: this will allow you to exchange information (Send and receive) amongst different users through the same plugin;

So for this hook to read the data from the data channel, the developer will be able to choose the format in which they want it.The possible formats are described down below:

- ALL_ITEMS: Fetches all items from specific data-channel and specific subchannel-name since the beginning of the meeting from the newest to the latest (It can be used as a history);
- LATEST_ITEM: Fetches only the latest item pushed to the data-channel within a specific subchannel-name since the beginning of the meeting;
- NEW_ITEMS: Fetches the new items pushed to the data-channel within a specific subchannel-name since the moment that the `useDataChannel` hook has been called (It will not see entries sent previous to that moment);

An interesting thing about this hook is that it is generic, so, you can use a custom type, and this will be  found not only in the consumer part of the data structure returned, but also in functions in which you need to specify an object to be persisted, meaning it will force the object to be of the type you mentioned previously (that is the case for `pushEntry` and `replaceEntry`). One can find examples of usage of this in the data-channel plugin sample or most of the official ones. The syntax is described below:

```typescript
const {
  data: response, // Data that will be returned
  pushEntry: pushEntryFunction, // Function to push another item to the data-channel
  deleteEntry: deleteEntryFunction, // Function to delete specific item or wipe all
  replaceEntry: replaceEntryFunction, // Function replace a specific item
} = useDataChannel<CustomType>(
  channelName, // Defined according to what is on manifest.json
  DataChannelTypes.ALL_ITEMS, // | LATEST_ITEM | NEW_ITEMS -> ALL_ITEMS is default
  subChannelName = 'default', // If no subchannelName is specified, it will be 'default'
);
```

Wiping all data off will delete every item from the specific data-channel within the specific subchannel-name.

**Data-channel configuration:**

The data-channel name must be in the `manifest.json` along with all the permissions for writing, reading and deleting, see example below:

```json
{
  "requiredSdkVersion": "~0.0.59",
  "name": "PluginName",
  "javascriptEntrypointUrl": "PluginName.js",
  "dataChannels":[
    {
      "name": "channel-name",
      "pushPermission": ["moderator","presenter"],
      "replaceOrDeletePermission": ["moderator", "creator"]
    }
  ]
}
``` 

If no permission is mentioned in that file (writing or deleting), no one will be able proceed with that specific action:

The `pushEntryFunction` has a minor detail to pay attention to, it is possible to specify the users who you want to send the item to, if none is specified, all will receive the item, such as done ahead:

```typescript
pushEntryFunction(objectToBePushed: T, options: {
  receivers?: ObjectTo[];
})
export interface ToUserId {
  userId: string;
}
export interface ToRole {
  role: DataChannelPushEntryFunctionUserRole;
}

export type ObjectTo = ToUserId | ToRole;
```

### Real time ui data consumption

- `useUiData` hook: This will return certain data from the UI depending on the parameter the developer uses. It works just like the useUiEvent hook, but instead of passing a callback as a parameter to be run every time the event occurs, it will return the data directly, keep in mind that the second parameter is the default value that this function will assume. Possible choices:
  - IntlLocaleUiDataNames.CURRENT_LOCALE;
  - ChatFormUiDataNames.CURRENT_CHAT_INPUT_TEXT;
  - ChatFormUiDataNames.CHAT_INPUT_IS_FOCUSED;
  - ExternalVideoVolumeUiDataNames.CURRENT_VOLUME_VALUE;
  - ExternalVideoVolumeUiDataNames.IS_VOLUME_MUTED;
  - UserListUiDataNames.USER_LIST_IS_OPEN;
  - LayoutPresentationAreaUiDataNames.CURRENT_ELEMENT;

Example of usage:

```ts
  const currentLocale = pluginApi.useUiData(IntlLocaleUiDataNames.CURRENT_LOCALE, {
    locale: 'en',
    fallbackLocale: 'en',
  });
  // Do something with the currentLocale:
  currentLocale.locale;
  currentLocale.fallbackLocale;

```

Mind that foreach enum we have, a different type of fallback is needed as the second argument. In the example above, we want the `intl`, so the second argument, will follow the structure depicted.

One other thing is that the type of the return is precisely the same type required as the second argument.

### Ui Commands to automatize tasks in BBB

`uiCommands` object: It basically contains all the possible commands available to the developer to interact with the core BBB UI, see the ones implemented down below:

- actions-bar:
  - setDisplayActionBar: this function decides whether to display the actions bar
- camera:
  - setSelfViewDisableAllDevices: Sets the self-view camera disabled/enabled for all camera devices of a user;
  - setSelfViewDisable: Sets the self-view camera disabled/enabled for specific camera.
- chat:
  - form:
    - open: this function will open the sidebar chat panel automatically;
    - fill: this function will fill the form input field of the chat passed in the argument as `{text: string}`
- conference:
  - setSpeakerLevel: this function will set the speaker volume level(audio output) of the conference to a certain number between 0 and 1;
- external-video:
  - volume:
    - set: this function will set the external video volume to a certain number between 0 and 1 (that is 0% and);
- layout:
  - changeEnforcedLayout: (deprecated) Changes the enforced layout
  - setEnforcedLayout: Sets the enforced layout
- navBar:
  - setDisplayNavBar: Sets the displayNavBar to true (show it) or false (hide it).
- notification:
  - send: This function will send a notification for the client to render, keep in mind that it's only client-side. Should you want it to be rendered in multiple clients, use this with a data-channel;
- presentation-area:
  - open: this function will open the presentation area content automatically;
  - close: this function will close the presentation area content automatically;
- screenshare:
  - stop: Stops broadcasting the screenshare if user is presenter and is sharing screen (it is ignored otherwise);
- sidekick-area:
  - options:
    - renameGenericContentMenu: this function will rename the menu of the generic content in the sidekick-area (must have the ID of the sidekick and the newName);
    - renameGenericContentSection: this function will rename the section in which the menu with the specified ID is;
    - setMenuBadge: this will set a badge for a specific generic content in the sidekick area;
    - removeMenuBadge: this will remove any badges that a specific generic content might have;
    - panel:
      - open: this function will open the sidekick options panel automatically;
      - close: this function will close the sidekick options panel automatically (and also the sidebar content if open, to avoid inconsistencies in ui);
- sidekick-options-container:
  - open: this function will open the sidekick options panel automatically;
  - close: this function will close the sidekick options panel automatically (and also the sidebar content if open, to avoid inconsistencies in ui);
- user-status:
  - setAwayStatus: this function will set the away status of the user to a certain status;

**Example usage:**

```typescript
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  useEffect(() => {
    // Open and fill chat form
    pluginApi.uiCommands.chat.form.open();
    pluginApi.uiCommands.chat.form.fill({
      text: 'Just an example message filled by the plugin',
    });

    // Set speaker volume to 50%
    pluginApi.uiCommands.conference.setSpeakerLevel(0.5);

    // Set external video volume to 75%
    pluginApi.uiCommands.externalVideo.volume.set(0.75);

    // Change layout
    pluginApi.uiCommands.layout.setEnforcedLayout('FOCUS');

    // Show/hide nav bar
    pluginApi.uiCommands.navBar.setDisplayNavBar(false);

    // Send a notification
    pluginApi.uiCommands.notification.send({
      type: 'info',
      message: 'This is a notification from the plugin',
      icon: 'user',
    });

    // Open presentation area
    pluginApi.uiCommands.presentationArea.open();

    // Sidekick area commands
    pluginApi.uiCommands.sidekickArea.options.setMenuBadge('my-content-id', '5');
    pluginApi.uiCommands.sidekickArea.options.renameGenericContentMenu(
      'my-content-id',
      'New Menu Name'
    );
    pluginApi.uiCommands.sidekickArea.options.renameGenericContentSection(
      'my-content-id',
      'New Section Name'
    );

    // Camera commands
    pluginApi.uiCommands.camera.setSelfViewDisableAllDevices(true);
    pluginApi.uiCommands.camera.setSelfViewDisable('camera-stream-id', false);

    // Set away status
    pluginApi.uiCommands.userStatus.setAwayStatus(true);
  }, []);

```

So the idea is that we have a `uiCommands` object and at a point, there will be the command to do the intended action, such as open the chat form and/or fill it, as demonstrated above

### Server Commands

  `serverCommands` object: It contains all the possible commands available to the developer to interact with the BBB core server, see the ones implemented down below:

  - chat:
    - sendPublicChatMessage: This function sends a message to the public chat on behalf of the currently logged-in user.

    - sendCustomPublicMessage: This function sends a text message to the public chat, optionally including custom metadata.
      > **Note**: The custom messages sent by plugins are not automatically rendered by the client. To display these messages, a plugin must handle the rendering using `useLoadedChatMessages` and `useChatMessageDomElements`.

  - caption:
    - save: this function saves the given text, locale and caption type
    - addLocale: this function sends a locale to be added to the available options

  - presentation:
    - upload: uploads a new presentation to BigBlueButton;

**Example usage:**

```typescript
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  useEffect(() => {
    // Add a button that sends a chat message
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownOption({
        label: 'Send chat message',
        icon: 'chat',
        onClick: () => {
          // Send a public chat message
          pluginApi.serverCommands.chat.sendPublicChatMessage({
            textMessageInMarkdownFormat: 'Hello from plugin!',
            pluginCustomMetadata: pluginUuid,
          });
        },
      }),
      new ActionButtonDropdownOption({
        label: 'Send custom message',
        icon: 'copy',
        onClick: () => {
          // Send a custom public chat message with metadata
          pluginApi.serverCommands.chat.sendCustomPublicMessage({
            textMessageInMarkdownFormat: '**Custom message** with metadata',
            pluginCustomMetadata: {
              type: 'notification',
              pluginId: pluginUuid,
              timestamp: Date.now(),
            },
          });
        },
      }),
      new ActionButtonDropdownOption({
        label: 'Save caption',
        icon: 'closed_caption',
        onClick: () => {
          // Save a caption
          pluginApi.serverCommands.caption.save({
            text: 'This is a caption text',
            locale: 'en-US',
            captionType: 'TYPED',
          });
        },
      }),
      new ActionButtonDropdownOption({
        label: 'Add caption locale',
        icon: 'closed_caption',
        onClick: () => {
          // Add a new locale option for captions
          pluginApi.serverCommands.caption.addLocale({
            locale: 'pt-BR',
            localeName: 'Portuguese (Brazil)',
          });
        },
      }),
    ]);
  }, []);

```

**Note on permissions:** Some server commands have permission controls based on roles defined in the manifest. See the [Manifest Json](#manifest-json) section for configuration details.

### Dom Element Manipulation

- `useChatMessageDomElements` hook: This hook will return the dom element of a chat message reactively, so one can modify whatever is inside, such as text, css, js, etc.;
- `useUserCameraDomElements` hook: This hook will return the dom element of each of the user's webcam corresponding to the streamIds passed reactively, so one can modify whatever is inside, such as text, css, js, etc., and also can get the video element within it;

**Example usage:**

```typescript
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);
  const [chatIdsToHighlight, setChatIdsToHighlight] = useState<string[]>([]);
  const [streamIdsToStyle, setStreamIdsToStyle] = useState<string[]>([]);

  // Example 1: Manipulate chat messages (highlight mentions)
  const { data: chatMessages } = pluginApi.useLoadedChatMessages();

  useEffect(() => {
    if (chatMessages) {
      // Filter messages that mention someone with @ pattern
      const MENTION_REGEX = /@([A-Z][a-z]+ ){0,2}[A-Z][a-z]+/;
      const messageIds = chatMessages
        .filter((msg) => MENTION_REGEX.test(msg.message))
        .map((msg) => msg.messageId);
      setChatIdsToHighlight(messageIds);
    }
  }, [chatMessages]);

  // Get DOM elements for the chat messages we want to manipulate
  const chatMessagesDomElements = pluginApi.useChatMessageDomElements(chatIdsToHighlight);

  useEffect(() => {
    if (chatMessagesDomElements && chatMessagesDomElements.length > 0) {
      chatMessagesDomElements.forEach((chatMessageDomElement) => {
        const MENTION_REGEX = /@([A-Z][a-z]+ ){0,2}[A-Z][a-z]+/;
        const mention = chatMessageDomElement.innerHTML.match(MENTION_REGEX);

        if (mention) {
          // Highlight the mention with custom styling
          chatMessageDomElement.innerHTML = chatMessageDomElement.innerHTML.replace(
            mention[0],
            `<span style="color: #4185cf; background-color: #f2f6f8; padding: 2px 4px; border-radius: 3px;">${mention[0]}</span>`
          );
        }

        // Style the parent element
        const { parentElement } = chatMessageDomElement;
        if (parentElement) {
          parentElement.style.paddingTop = '0.5rem';
          parentElement.style.paddingBottom = '0.5rem';
          parentElement.style.borderLeft = '3px solid #4185cf';
          parentElement.style.backgroundColor = '#f8f9fa';
        }

        pluginLogger.info('Styled chat message:', chatMessageDomElement);
      });
    }
  }, [chatMessagesDomElements]);

  // Example 2: Manipulate user camera streams
  const { data: videoStreams } = pluginApi.useCustomSubscription<VideoStreamsType>(`
    subscription VideoStreams {
      user_camera {
        streamId
        user {
          userId
          name
        }
      }
    }
  `);

  useEffect(() => {
    if (videoStreams?.user_camera) {
      // Get all stream IDs
      const streamIds = videoStreams.user_camera.map((stream) => stream.streamId);
      setStreamIdsToStyle(streamIds);
    }
  }, [videoStreams]);

  // Get DOM elements for user cameras
  const userCameraDomElements = pluginApi.useUserCameraDomElements(streamIdsToStyle);

  useEffect(() => {
    if (userCameraDomElements && userCameraDomElements.length > 0) {
      userCameraDomElements.forEach((cameraElement) => {
        // Add a custom border to the camera
        cameraElement.element.style.border = '3px solid #0c5cb3';
        cameraElement.element.style.borderRadius = '8px';
        cameraElement.element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        // Access the video element directly
        if (cameraElement.videoElement) {
          cameraElement.videoElement.style.objectFit = 'cover';
          pluginLogger.info('Styled video element for stream:', cameraElement.streamId);
        }

        // Add a custom overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '5px';
        overlay.style.right = '5px';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.color = 'white';
        overlay.style.padding = '4px 8px';
        overlay.style.borderRadius = '4px';
        overlay.style.fontSize = '12px';
        overlay.textContent = '🎥 Live';
        cameraElement.element.style.position = 'relative';
        cameraElement.element.appendChild(overlay);
      });
    }
  }, [userCameraDomElements]);
```

**Important notes:**
- Use DOM manipulation carefully and only when necessary
- Always check if elements exist before manipulating them
- Prefer using the provided hooks over direct DOM queries
- Be aware that excessive DOM manipulation can impact performance
- When styling chat messages, avoid changing the actual text content as it may cause issues with recordings for more information on that, see [guidelines section](https://docs.bigbluebutton.org/plugins/#dom-element-manipulation-guidelines)

### Learning Analytics Dashboard integration

This integration allow you to insert/update entry in LAD (Learning Analytics Dashboard) via `upsertUserData` function and also delete entries via `deleteUserData` function.

It's an object available in the `pluginApi` that wraps those 3 functions:

- `pluginApi.learningAnalyticsDashboard.upsertUserData`
- `pluginApi.learningAnalyticsDashboard.deleteUserData`
- `pluginApi.learningAnalyticsDashboard.clearAllUsersData`

For the `upsert` function, the argument's data object structure must be:

```ts
interface LearningAnalyticsDashboardUserData {
  cardTitle: string;
  columnTitle: string;
  value: string;
}
```

For the `deleteUserData` function, the argument's data object structure must be:

```ts
interface LearningAnalyticsDashboardDeleteUserData {
  cardTitle: string;
  columnTitle: string;
}
```

For the `clearAllUsersData` function, the argument is the cardTitle (optionally), and when it's not sent, all the entries for a specific plugin will be deleted. (And if the card ends up empty, it will be removed) 

If the user is a moderator, there is the possibility to publish data on behalf of other users by using the second **optional** parameter named `targetUserId`

So that the data will appear in the following form:

|   User    | Count | `<columnTitle>` |
|    ---    |  :--  |      --:        |
| user-name |   1   |   `<value>`     |

**Example usage:**

```typescript
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);
  const [interactionCount, setInteractionCount] = useState(0);

  // Example: Track user interactions and send to Learning Analytics Dashboard
  useEffect(() => {
    const handleUserInteraction = () => {
      const newCount = interactionCount + 1;
      setInteractionCount(newCount);

      // Send data to Learning Analytics Dashboard
      pluginApi.sendGenericDataForLearningAnalyticsDashboard({
        cardTitle: 'User Interactions', // For future use
        columnTitle: 'Total Clicks',
        value: newCount.toString(),
      });

      pluginLogger.info('Sent interaction data to dashboard:', newCount);
    };

    // Example: Track button clicks
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownOption({
        label: 'Track Interaction',
        icon: 'user',
        onClick: handleUserInteraction,
      }),
    ]);
  }, [interactionCount]);

  // Example: Send engagement metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const engagementScore = Math.floor(Math.random() * 100);

      pluginApi.sendGenericDataForLearningAnalyticsDashboard({
        cardTitle: 'Engagement Metrics',
        columnTitle: 'Engagement Score',
        value: `${engagementScore}%`,
      });

      pluginLogger.info('Sent engagement score:', engagementScore);
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

  // Example: Track specific plugin events
  const { data: chatMessages } = pluginApi.useLoadedChatMessages();

  useEffect(() => {
    if (chatMessages) {
      const messageCount = chatMessages.length;

      pluginApi.sendGenericDataForLearningAnalyticsDashboard({
        cardTitle: 'Chat Activity',
        columnTitle: 'Messages Sent',
        value: messageCount.toString(),
      });
    }
  }, [chatMessages]);

```

**Use cases for Learning Analytics:**
- Track user participation and engagement
- Monitor plugin-specific metrics (e.g., poll responses, quiz answers)
- Measure feature usage and adoption
- Collect custom learning indicators
- Generate post-meeting reports with plugin data


See example of use ahead:

```ts
const targetUserId = 'abcd-efg';
pluginApi.learningAnalyticsDashboard.upsertUserData(
  {
    cardTitle: 'Example Title',
    columnTitle: 'link sent by user',
    value: '[link](https://my-website.com/abc.png)'
  },
  targetUserId,
);

pluginApi.learningAnalyticsDashboard.deleteUserData(
  {
    cardTitle: 'Example Title',
    columnTitle: 'link sent by user',
  },
  targetUserId,
);

pluginApi.learningAnalyticsDashboard.clearAllUsersData(columnTitle);

pluginApi.learningAnalyticsDashboard.clearAllUsersData(); // Or without the Column Title
```

Note 1: the `value` field (in the upsert function's argument) supports markdown, so feel free to use it as you wish.

Note 2: pluginApi.sendGenericDataForLearningAnalyticsDashboard is now being deprecated, but has the same data structure as upsert (without the possibility to send entry on behalf of another user)

### External data resources

This is the new integration with external servers to fetch data in a secure manner.

This is possible by simply configuring the dataResource name in the manifest and then its endpoint in the URL meta parameter that goes in the create request. The manifest would look like:

```json
{
  // ...rest of manifest configuration
  "remoteDataSources": [
      {
          "name": "allUsers",
          "url": "${meta_pluginSettingsUserInformation}",
          "fetchMode": "onMeetingCreate", // Possible values: "onMeetingCreate", "onDemand" 
          "permissions": ["moderator", "viewer"] // Possible values: "moderator", "viewer", "presenter"
      }
  ]
}
```

Going through each parameter to better understand it's structure:

- `name`: It is the name of the remote data source, that is the name you'll use later on in the plugin when developing it;
- `url`: The Url to which the data will be fetched (it can be hard-coded in the `manifest.json`, but we recommend passing it as a `meta_` parameter);
- `fetchMode`: It tells the plugin-server if it should fetch the data only when creating the meeting, or every time the function is called in the plugin portion;
  - If one chooses `onMeetingCreate`, the data will be fetched when the create endpoint of the meeting is called, then it's cached in the plugin-server so that every time the plugin wants that data, the plugin-server will respond with the cached data;
  - On the other hand, if `onDemand` is selected, every time the plugin calls this method, the plugin-server will fetch the data and then proxy it to the plugin;
- `permissions`: This tells the back-end which role of the meeting can access this remote data;

Here is the `/create` parameters you would have to pass to make this remote-data-source api work:

```
meta_pluginSettingsUserInformation=https://<your-external-source-with-your-authentication>/api/users
pluginManifests=[{"url": "http://<domain-of-your-manifest>/your-plugin/manifest.json"}]
```

See that we send the `meta_` parameter, for more information, refer to the [meta parameters section](#meta_-parameters)

Lastly, in the plugin, just use the function like:

```typescript
pluginApi.getRemoteData('allUsers').then((response: Response) => {
  if (response.ok) {
    response.json().then((r: CourseData) => {
      // Do something with the jsonified data (if it's a json)
    }).catch((reason) => {
      pluginLogger.error('Error while processing the json from success response: ', reason);
    });
  }
}).catch((reason) => {
  pluginLogger.error('Error while fetching external resource: ', reason);
});
```

### Fetch ui data on demand

- `getUiData` async function: This will return certain data from the UI depending on the parameter the developer uses. Unlike the `useUiData` this function does not return real-time information as it changes. See the currently supported:
  - PresentationWhiteboardUiDataNames.CURRENT_PAGE_SNAPSHOT;

**Example usage:**

```typescript
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  useEffect(() => {
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownOption({
        label: 'Capture whiteboard snapshot',
        icon: 'copy',
        onClick: async () => {
          // Fetch the current whiteboard page as a PNG snapshot
          const snapshotData = await pluginApi.getUiData(
            PresentationWhiteboardUiDataNames.CURRENT_PAGE_SNAPSHOT
          );

          if (snapshotData?.pngBase64) {
            console.log('Whiteboard snapshot (base64 PNG):', snapshotData.pngBase64);

            // Example: Download the snapshot
            const link = document.createElement('a');
            link.href = `data:image/png;base64,${snapshotData.pngBase64}`;
            link.download = `whiteboard-snapshot-${Date.now()}.png`;
            link.click();
          }
        },
      }),
    ]);
  }, []);

```

### Customize manifest.json

The following sections explain how you can dynamically customize your manifest.json for different runs.

#### Meta_ parameters

This is not part of the API, but it's a way of passing information to the manifest. Any value can be passed like this, one just needs to put something like `${meta_nameOfParameter}` in a specific config of the manifest, and in the `/create` call, set this meta-parameter to whatever is preferred, like `meta_nameOfParameter="Sample message"`

This feature is mainly used for security purposes, see [external data section](#external-data-resources). But can be used for customization reasons as well.

**Example:**

```json
{
  "requiredSdkVersion": "~0.0.59",
  "name": "MyPlugin",
  "javascriptEntrypointUrl": "MyPlugin.js",
  "remoteDataSources": [
    {
      "name": "userData",
      "url": "${meta_userDataEndpoint}",
      "fetchMode": "onMeetingCreate",
      "permissions": ["moderator", "viewer"]
    }
  ]
}
```

Then in the `/create` call:

```
meta_userDataEndpoint=https://my-api.com/users
pluginManifests=[{"url": "https://my-cdn.com/my-plugin/manifest.json"}]
```

#### Plugin_ parameters

`plugin_` parameters work similarly to `meta_` parameters, allowing data to be passed dynamically to the manifest. While they can serve the same purposes — like security or customization — they are specifically scoped to individual plugins.

**Format:**

```
plugin_<pluginName>_<parameter-name>
```

- `<pluginName>` — The name of the plugin as defined in `manifest.json`.
- `<parameter-name>` — The parameter's name. It may include letters (uppercase or lowercase), numbers and hyphens (`-`).

This naming convention ensures that each plugin has its own namespace for parameters. Other plugins cannot access values outside their own namespace. For example:

```
plugin_MyPlugin_api-endpoint=https://api.example.com
plugin_MyPlugin_theme-color=blue
```

This isolates the parameter to `MyPlugin` and avoids conflicts with other plugins.

**Example manifest.json:**

```json
{
  "requiredSdkVersion": "~0.0.59",
  "name": "MyPlugin",
  "javascriptEntrypointUrl": "MyPlugin.js",
  "dataChannels": [
    {
      "name": "${plugin_MyPlugin_channel-name:defaultChannel}",
      "pushPermission": ["moderator", "presenter"],
      "replaceOrDeletePermission": ["moderator", "creator"]
    }
  ],
  "remoteDataSources": [
    {
      "name": "pluginData",
      "url": "${plugin_MyPlugin_api-endpoint}",
      "fetchMode": "onDemand",
      "permissions": ["moderator"]
    }
  ]
}
```

Then in the `/create` call:

```
plugin_MyPlugin_channel-name=customChannelName
plugin_MyPlugin_api-endpoint=https://my-api.com/plugin-data
pluginManifests=[{"url": "https://my-cdn.com/my-plugin/manifest.json"}]
```

#### Default value (fallback) for missing placeholder's parameters

If a plugin expects a placeholder (via `meta_` or `plugin_`) but doesn't receive a value, the plugin will fail to load. To prevent this, both types of placeholders support default values. This allows the system administrator to define fallback values, ensuring the plugin loads correctly.

**Example with a default value:**

```json
{
  "requiredSdkVersion": "~0.0.59",
  "name": "MyPlugin",
  "javascriptEntrypointUrl": "MyPlugin.js",
  "dataChannels": [
    {
      "name": "${plugin_MyPlugin_data-channel-name:storeState}",
      "pushPermission": ["moderator", "presenter"],
      "replaceOrDeletePermission": ["moderator", "creator"]
    }
  ],
  "remoteDataSources": [
    {
      "name": "apiData",
      "url": "${meta_apiEndpoint:https://default-api.com/data}",
      "fetchMode": "onMeetingCreate",
      "permissions": ["moderator"]
    }
  ]
}
```

In this example:
- If `plugin_MyPlugin_data-channel-name` is not provided, it will fall back to `"storeState"`
- If `meta_apiEndpoint` is not provided, it will fall back to `"https://default-api.com/data"`

### Event persistence

This feature will allow the developer to save an information (an event) in the `event.xml` file of the meeting, if it's being recorded.

To use it, one first need to add the following lines to their `manifest.json`:

```json
{
  // ...rest of manifest configuration
  "eventPersistence": {
      "isEnabled": true,
  }
}
```

Then, the API in the SDK for that is:

```ts
pluginApi.persistEvent(eventName: string, payloadJson: Object);
```

See example in the `sample-use-meeting` plugin here in this repository. It is as follows:

```ts
useEffect(() => {
    setInterval(() => {
      pluginLogger.info('persisting event');
      pluginApi.persistEvent('eventFromUseMeetingSample', { foo: 'bar' });
    }, 5000);
  }, []);
```

After the meeting is ended (considering it has been recorded), one can simply do the following steps to see the events:

In the server terminal run:
```bash
sudo updatedb
vi $(locate events.xml | grep <meeting-id>)
```

Where `<meeting-id>` is the id of the the meeting you just recorded. Then, amongst all the other events in the file, if you search it, you will find the following:

```xml
<event timestamp="25004947" module="PLUGIN" eventname="PluginGeneratedEvent">
  <payloadJson>{"foo":"bar"}</payloadJson>
  <pluginEventName>eventFromUseMeetingSample</pluginEventName>
  <date>2024-10-30T18:00:11.929Z</date>
  <pluginName>SampleUseMeeting</pluginName>
  <userId>w_sxlfjbcb0yxs</userId>
  <timestampUTC>1730311211929</timestampUTC>
</event>
```

## Common Patterns and Best Practices

This section covers common patterns and best practices for plugin development.

### Plugin Initialization Pattern

Always initialize your plugin in this order:

```typescript
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { useEffect } from 'react';

function MyPlugin({ pluginUuid }: MyPluginProps) {
  // 1. Initialize the SDK (must be first)
  BbbPluginSdk.initialize(pluginUuid);

  // 2. Get the plugin API instance
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  // 3. Use hooks to fetch data
  const { data: currentUser } = pluginApi.useCurrentUser();

  // 4. Set up UI extensions in useEffect
  useEffect(() => {
    // Register UI items here
    pluginApi.setActionButtonDropdownItems([...]);
  }, []); // Empty dependency array for one-time setup

  // 5. Return null (plugins typically don't render directly)
  return null;
}
```

### Error Handling Pattern

```typescript
function MyPlugin({ pluginUuid }: MyPluginProps) {
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  const { data, loading, error } = pluginApi.useCurrentUser();

  useEffect(() => {
    if (error) {
      pluginLogger.error('Error fetching user data:', error);
      // Show user-friendly notification
      pluginApi.uiCommands.notification.send({
        type: 'error',
        message: 'Failed to load plugin. Please refresh the page.',
        icon: 'warning',
      });
      return;
    }

    if (loading) {
      pluginLogger.info('Loading user data...');
      return;
    }

    if (data) {
      // Proceed with plugin logic
      pluginLogger.info('User data loaded successfully');
    }
  }, [data, loading, error]);

  return null;
}
```

### State Management Pattern

```typescript
function MyPlugin({ pluginUuid }: MyPluginProps) {
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi = BbbPluginSdk.getPluginApi(pluginUuid);
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownOption({
        label: `Counter: ${count}`,
        icon: 'copy',
        onClick: () => {
          setCount(prevCount => prevCount + 1);
          setIsActive(true);
        },
      }),
    ]);
  }, [count]); // Re-render when count changes

  return null;
}
```

### Data Channel Communication Pattern

```typescript
interface MessageType {
  userId: string;
  message: string;
  timestamp: number;
}

function MyPlugin({ pluginUuid }: MyPluginProps) {
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  const {
    data: messages,
    pushEntry,
    deleteEntry,
  } = pluginApi.useDataChannel<MessageType>(
    'my-channel',
    DataChannelTypes.ALL_ITEMS,
    'default'
  );

  const sendMessage = (text: string) => {
    if (pushEntry) {
      pushEntry({
        userId: 'current-user-id',
        message: text,
        timestamp: Date.now(),
      });
    }
  };

  const clearMessages = () => {
    if (deleteEntry) {
      deleteEntry(RESET_DATA_CHANNEL);
    }
  };

  useEffect(() => {
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownOption({
        label: 'Send Message',
        icon: 'chat',
        onClick: () => sendMessage('Hello!'),
      }),
      new ActionButtonDropdownOption({
        label: 'Clear Messages',
        icon: 'delete',
        onClick: clearMessages,
      }),
    ]);
  }, []);

  useEffect(() => {
    if (messages?.data) {
      pluginLogger.info('Messages:', messages.data);
    }
  }, [messages]);

  return null;
}
```

### Best Practices

1. **Always initialize the SDK first** before using any plugin API
2. **Use TypeScript** for type safety and better development experience
3. **Handle loading and error states** gracefully
4. **Clean up resources** (intervals, event listeners) in useEffect cleanup
5. **Use pluginLogger** instead of console.log for better debugging
6. **Test your plugin** with different user roles (moderator, presenter, viewer)
7. **Use the samples** as reference - they demonstrate best practices
8. **Document your plugin** - include a README with usage instructions

### Performance Tips

- **Minimize re-renders**: Use proper dependency arrays in useEffect
- **Avoid excessive DOM manipulation**: Use the provided hooks when possible
- **Debounce frequent operations**: Use debouncing for frequent UI updates
- **Clean up subscriptions**: Always return cleanup functions from useEffect
- **Use memoization**: Use React.useMemo and React.useCallback for expensive operations


### Frequently Asked Questions (FAQ)

**How do I remove a certain extensible area that I don't want anymore?**
It is pretty simple: just set an empty array of elements of that specific extensible area.
Or simply remove the specific item of the array and set the new array to that extensible area in the next iteration.

See example below:

```ts
// First iteration:
  // Define both variables:
  const dropdownToUserListItem = { ... };
  const buttonToUserListItem = { ... };
  pluginApi.setActionsBarItems([dropdownToUserListItem, buttonToUserListItem]);

// Second iteration:
  // Redefine variable(s):
  const newButtonToUserListItem = { ... };
  pluginApi.setActionsBarItems([newButtonToUserListItem]);

// Third iteration:
  // I don't want any of this extensible-area:
  pluginApi.setActionsBarItems([]);
  // All set from this plugin will disappear from the UI;
```

**How to properly build a plugin?**
Just go to your plugin folder, install dependencies and run the build command as follows:

```bash
cd my-plugin-folder/
npm i
npm run build-bundle
```

At this point, another folder will be created into the plugin directory called "dist/" inside of that folder you will find the plugin itself `MyPlugin.js`. Remember that the name of this file will be the same as defined in the `webpack.config.js`, such as:

```js
module.exports = {
  // ... Other configurations
  output: {
    filename: 'MyPlugin.js'
  }
  // ... Other configurations
}
```

**Does the builded plugin need to be in the same BBB server?**
No, feel free to host it anywhere you want, just make sure to point the URL from `manifest.json` correctly (into the create endpoint or `bigbluebutton.properties`).

**I am making my plugin based on a sample inside the SDK, but somehow, the sample is not working properly, what do I do to run it in dev mode and make it work?**
Well there are several motives to why the sample is not working properly, so I will go through each one of them briefly:

- The config has not been set properly in `manifest.json`, see [this section to configure your plugin](#running-the-plugin-from-source);
- The plugin is not even running in dev mode, it could be the port already in use, or typescript and/or javascript errors (Make sure to initialize the `pluginApi` as any of the samples inside a react function component);
- It could be an error with that sample indeed, or that feature the plugin uses broke (it is not usual, but can happen since BBB is constantly changing and enhancing its features with its wonderful community). If that happens, just open an issue in the [SDK&#39;s github](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk) detailing the error you are facing. And thank you in advance for reporting it back to us so we can improve each time.

**How to troubleshoot the plugins? See if it has loaded in the BBB, for instance.**
Well, each time a set of plugins listed to be run into a specific meeting start, it will fire some logs based on the amount of plugins that it need to load inside the client. So open the console in the browser by pressing F12 key in your keyboard and search for the following log:

```log
<ratio of loaded plugins> plugins loaded
```

If 1 out of 5 plugins loaded, you'll see "1/5 plugins loaded", and so on.

Also, when a plugin loaded, the client will log it's name like:

```log
Loaded plugin MyPlugin
```

Sometimes, there could be the case of a plugin to not load properly and an error will log with the following message:

```log
Error when loading plugin MyPlugin, error:  {"isTrusted":true}
```

In this case, the URL that leads to the plugin is not available or leads to an error. But it can log something different, so pay attention to what the error message will tell you.

Lastly, there are, of course, other scenarios and different informative logs, but these are the most common and important ones. Please contact us if you feel we left something out!
