import { ChatMessageDomElementsArguments } from './chat/message/types';
import { UserCameraDomElementsArguments } from './user-camera/types';

export type DomElementManipulationArguments = ChatMessageDomElementsArguments
  | UserCameraDomElementsArguments;
