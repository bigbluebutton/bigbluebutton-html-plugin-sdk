import { UserListUiDataNames } from './enums';

export type UserListUiDataPayloads = {
  [UserListUiDataNames.USER_LIST_IS_OPEN]: {
    value: boolean
  };
};
