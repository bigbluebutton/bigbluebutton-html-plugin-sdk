# BigBlueButton SDK for HTML plugins

## Information

SDK for developing BigBlueButton plugins, examples of implementations can be found in `./samples/sample-presentation-toolbar-plugin` (Refer to `./samples/sample-presentation-toolbar-plugin/README.md`) or `./samples/sample-user-list-dropdown-plugin`.

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

### Real time data exchange
- `useDataChannel` hook: this will allow you to exchange information (Send and receive) amongst different users through the same plugin;

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
