import { GraphqlResponseWrapper } from '../../../../core';

export interface UserVoice {
  talking: boolean;
  startTime: number;
  muted: boolean;
  userId: string;
}

export type UseTalkingIndicatorFunction = () => GraphqlResponseWrapper<UserVoice[]>;
