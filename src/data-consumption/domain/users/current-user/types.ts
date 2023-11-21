import { GraphqlResponseWrapper } from '../../../../core';

export interface CurrentUserData {
  userId: string;
  name: string;
  role: string;
  presenter: boolean
}

export type UseCurrentUser = () => GraphqlResponseWrapper<CurrentUserData> | undefined;
