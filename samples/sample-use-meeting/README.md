# Sample UI Events

## What is it?

The UseMeetingPlugin is a sample to properly demonstrate useMeeting hook. It logs the meeting information in the console.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleUseMeeting
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleUseMeeting.js`-file is hosted.
