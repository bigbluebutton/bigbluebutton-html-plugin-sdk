# Sample Action Button Dropdown

## What is it?

The Sample Action Button Dropdown Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a separator after the ordinary actions menu options, a button that displays the label "Fetch presentation content" and another button that reads "Set different content in presentation area". When you click the first button, the menu will close and open a pop-up with the current presentation. And for the second button, the idea is to open a new content in the presentation area.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```
pluginManifests=[{"url":"http://172.17.0.1:4701/manifest.json"}]
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleActionButtonDropdownPlugin.js`-file is hosted.
