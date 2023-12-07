import { UserListEventsNames } from './enums';

export type UserListEventPayloads = {
  [UserListEventsNames.USER_LIST_OPENED]: void;
  [UserListEventsNames.USER_LIST_CLOSED]: void;
};
