import { GraphqlResponseWrapper } from '../../../core';

export interface TimerData {
  accumulated: number;
  active: boolean;
  songTrack: string;
  time: number;
  stopwatch: boolean;
  running: boolean;
  startedAt: string | null;
  elapsed: boolean;
  timePassed: number;
}

export type UseTimerFunction = () => GraphqlResponseWrapper<TimerData>;
