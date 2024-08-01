import { ServerCommandsCaptionObject } from './caption/types';
import { ServerCommandsChatObject } from './chat/types';

export interface ServerCommands {
  caption: ServerCommandsCaptionObject;
  chat: ServerCommandsChatObject;
}
