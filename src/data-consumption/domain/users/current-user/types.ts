import { GraphqlResponseWrapper } from '../../../../core';

export interface Camera {
  streamId: string;
}

export interface CurrentUserData {
  userId: string;
  extId: string;
  name: string;
  role: string;
  presenter: boolean;
  cameras: Camera[];
}

export type UseCurrentUserFunction = () => GraphqlResponseWrapper<CurrentUserData> | undefined;
