# Sample User List Dropdown Plugin

## What is it?

The Sample User List Dropdown Plugin serves as a demonstration of how developers can create their own custom plugins, in this case it goes into the user list dropdown of each participant. This plugin includes another option for each user in the user list that displays the label "Click to see participant information". When you click on the button, a modal appears with some information about the user such as name, userId and role in the meeting.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleUserListDropdownPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleUserListDropdownPlugin.js`-file is hosted.
