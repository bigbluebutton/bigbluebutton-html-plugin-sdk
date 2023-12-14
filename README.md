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

### Getters available through the API:
- `getSessionToken`: returns the user session token located on the user's URL.

- `getJoinUrl`: returns the join url associated with the parameters passed as an argument. Since it fetches the BigBlueButton API, this getter method is asynchronous.

### Realtime data consumption
- `useCurrentPresentation` hook: provides information regarding the current presentation;

- `useLoadedUserList` hook: provides information regarding the loaded user list (displayed in the screen);

- `useCurrentUser` hook: provides information regarding the current user;

- `useUsersBasicInfo` hook: provides information regarding all users (only crucial information: userId, name and role);

- `useCustomSubscription` hook: with this hook, the developer can query pretty much anything graphql can provide. Note: Make sure that, on BBB version change, the custom subscriptions you make will work as expected.

- `usePluginSettings` hook: it provides all the specific settings regarding the current plugin it's been loaded from.

### Real time data exchange
- `useDataChannel` hook: this will allow you to exchange information (Send and receive) amongst different users through the same plugin;

### Real time event reaction
- `useUiEvent` hook: this will allow you to react to certain events fired from the BBB core (refer to the sample-ui-events-plugin in the samples directory for example on how to use some of the events);

### Ui Commands to automatize tasks in BBB
`uiCommands` object: It basically contains all the possible commands available to the developer to interact with the core BBB UI, see the ones implemented down below:
  - chat:
    - form: 
      - open: this function will open the sidebar chat panel automatically;
      - fill: this function will fill the form input field of the chat passed in the argument as {text: string}
