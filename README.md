# Bigblubutton HTML5 SDK for plugins

## Information

SDK for developing BigBlueButton plugins, an example implementation of it can be found in `./sample-whiteboard-toolbar-plugin` (Refer to `./sample-whiteboard-toolbar-plugin/README.md`).

## API
### Integration features

#### Available places for plugin
For now the only place that accepts the plugin architecture is: 
 - Whiteboard toolbar button;

#### Available Hooks for information
You have the `useCurrentPresentation` hook available from the SDK to find out information regarding the current presentation. It will naturally update whenever any presentation information changes.
