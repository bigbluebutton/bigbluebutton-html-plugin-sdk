import { createLogger, INFO, stdSerializers } from 'browser-bunyan';
import { ConsoleFormattedStream } from '@browser-bunyan/console-formatted-stream';

const pluginLogger = createLogger({
  name: 'PluginLogger',
  streams: [
    {
      level: INFO,
      stream: new ConsoleFormattedStream(),
    },
  ],

  serializers: stdSerializers,
  src: true,
});

export default pluginLogger;
