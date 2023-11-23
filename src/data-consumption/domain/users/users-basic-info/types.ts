import { GraphqlResponseWrapper } from '../../../../core';

export interface UsersBasicInfoData {
  userId: string;
  name: string;
  role: string;
}

export interface UsersBasicInfoResponseFromGraphqlWrapper {
  user: UsersBasicInfoData[];
}

export type UseUsersBasicInfoFunction = () => GraphqlResponseWrapper<
  UsersBasicInfoResponseFromGraphqlWrapper
>;
