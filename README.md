# BigBlueButton SDK for for HTML plugins

## Information

SDK for developing BigBlueButton plugins, examples of implementations can be found in `./samples/sample-presentation-toolbar-plugin` (Refer to `./samples/sample-presentation-toolbar-plugin/README.md`) or `./samples/sample-user-list-dropdown-plugin`.

## API
### Extensible UI areas
- Presentation toolbar items (button, separator, spinner)

- User list dropdown items (option, separator) 

### Realtime data consumption
- `useCurrentPresentation` hook: provides information regarding the current presentation.

- `useLoadedUserList` hook: provides information regarding the loaded user list (displayed in the screen)
