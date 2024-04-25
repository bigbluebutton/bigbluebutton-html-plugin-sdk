import { GraphqlResponseWrapper } from '../../../../core';

export interface Meeting {
  name: string;
  meetingId: string;
  loginUrl?: string;
}

export type UseMeetingFunction = () => GraphqlResponseWrapper<Meeting[]>;
