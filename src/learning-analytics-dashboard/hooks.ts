import {
  LearningAnalyticsDashboardEventDetails,
  GenericDataForLearningAnalyticsDashboard,
} from './types';
import { LearningAnalyticsDashboardEvents } from './enums';

export const sendGenericDataForLearningAnalyticsDashboard = (
  data: GenericDataForLearningAnalyticsDashboard,
  pluginName: string,
) => {
  window.dispatchEvent(
    new CustomEvent<
    LearningAnalyticsDashboardEventDetails>(LearningAnalyticsDashboardEvents.GENERIC_DATA_SENT, {
      detail: {
        pluginName,
        data,
      },
    }),
  );
};
