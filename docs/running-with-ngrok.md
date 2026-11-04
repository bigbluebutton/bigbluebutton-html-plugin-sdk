# Running a Plugin from Source with NGROK

The recommended way to run a plugin from source is described in the official documentation, at [Running the Plugin from Source](https://docs.bigbluebutton.org/plugins/#running-the-plugin-from-source). Use this guide if you don't have ssh access to a BBB server where you can run the plugin's development server.

If you are running your BBB-server elsewhere, then you can't simply point the manifest URL to a local address, you'll need to either serve the built version into a CDN or serve the dev version using a service to make it public. And for the second option we'd recommend NGROK.

For example if you take the [`sample-media-area-plugin`](../samples/sample-media-area-plugin),
you do the following:

1. Create an account on https://ngrok.com/ (Official website of NGROK);

2. Install NGROK in your computer. They have a guide for that right after you created your account;

3. Start the Plugin development server:

   ```bash
   cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-media-area-plugin
   npm install
   npm start
   ```

4. Start the NGROK server into your machine with the following command:

   ```bash
   ngrok http http://172.17.0.1:4701
   ```

   Make sure to point NGROK to the correct local URL (In our case - The samples are made this way, for instance - we used `http://172.17.0.1:4701`)

   Right after that, NGROK will create an interface into your terminal and will display the URL which your static files are being served.

   Here's an example of URL: `https://<uuid>.ngrok-free.app`

   You can already interact with this URL and access both

   `https://<uuid>.ngrok-free.app/manifest.json`

   or

   `https://<uuid>.ngrok-free.app/SampleMediaAreaPlugin.js`

   *Heads up:* on the free plan, NGROK shows an interstitial warning page ("You are about to visit...") to requests coming from a browser. The BBB client loads the plugin's JavaScript with a `<script>` tag, which can't send the `ngrok-skip-browser-warning` header that skips this page, so the browser may receive that HTML page instead of your plugin and the plugin won't load. To avoid it, open `https://<uuid>.ngrok-free.app` in the same browser you'll use to join the meeting and click *Visit Site* before joining; NGROK then remembers your choice for that domain. A paid NGROK plan doesn't show this page at all.

5. Add this create parameter into the API-mate of the server you are testing it on:

   ```
   pluginManifests=[{"url": "https://<uuid>.ngrok-free.app/manifest.json"}]
   ```

And there you go, you can test it freely.
