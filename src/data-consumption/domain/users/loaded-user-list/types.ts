import { GraphqlResponseWrapper } from '../../../../core';

export interface LoadedUserListData {
  userId: string;
  name: string;
  role: string;
}

export type UseLoadedUserListFunction = () => GraphqlResponseWrapper<LoadedUserListData[]>;
