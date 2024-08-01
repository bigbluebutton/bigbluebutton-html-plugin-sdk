import { caption } from './caption/commands';
import { chat } from './chat/commands';

export const serverCommands = (pluginName: string) => ({
  caption,
  chat: chat(pluginName),
});
