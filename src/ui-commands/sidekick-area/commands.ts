import { sidekickAreaOptions } from './options/commands';
import { sidekickAreaPanel } from './panel/commands';
import { UiCommandsSidekickArea } from './types';

export const sidekickArea: UiCommandsSidekickArea = {
  options: sidekickAreaOptions,
  panel: sidekickAreaPanel,
};
