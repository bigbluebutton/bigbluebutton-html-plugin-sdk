# Sample UI Events

## What is it?

The Sample UI Events Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin simply logs messages whenever an event occurs in the front-end.

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleUiEventsPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleUiEventsPlugin.js`-file is hosted.
