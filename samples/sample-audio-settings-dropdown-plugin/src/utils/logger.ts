import { createLogger, stdSerializers } from 'browser-bunyan';

const logger = createLogger({
  name: 'clientLogger',
  serializers: stdSerializers,
  src: true,
});

export default logger;
