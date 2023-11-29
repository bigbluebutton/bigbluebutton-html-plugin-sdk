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

### Realtime data consumption
- `useCurrentPresentation` hook: provides information regarding the current presentation;

- `useLoadedUserList` hook: provides information regarding the loaded user list (displayed in the screen);

- `useCurrentUser` hook: provides information regarding the current user;

- `useUsersBasicInfo` hook: provides information regarding all users (only crucial information: userId, name and role);

- `useCustomSubscription` hook: with this hook, the developer can query pretty much anything graphql can provide. Note: Make sure that, on BBB version change, the custom subscriptions you make will work as expected.

### Real time data exchange
- `useDataChannel` hook: this will allow you to exchange information (Send and receive) amongst different users through the same plugin;
