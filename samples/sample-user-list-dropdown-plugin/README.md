# Sample User List Dropdown Plugin

## What is it?

The Sample User List Dropdown Plugin serves as a demonstration of how developers can create their own custom plugins, in this case it goes into the user list dropdown of each participant. This plugin includes another option for each user in the user list that displays the label "Click to see participant information". When you click on the button, a modal appears with some information about the user such as name, userId and role in the meeting.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.
## Building the Plugin
```bash
cd $HOME/src/sample-user-list-dropdown-plugin
npm ci
npm run build-bundle
```
The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleUserListDropdownPlugin.js`. This file can be hosted on any HTTPS server along with its `manifest.json`.

If you install the Plugin separated to the manifest, remember to change the `javascriptEntrypointUrl` in the `manifest.json` to the correct endpoint.

To use the plugin in BigBlueButton, send this parameter along in create call:

```
pluginManifests=[{"url":"<your-domain>/path/to/manifest.json"}]
```

Or additionally, you can add this same configuration in the `.properties` file from `bbb-web` in `/usr/share/bbb-web/WEB-INF/classes/bigbluebutton.properties`
