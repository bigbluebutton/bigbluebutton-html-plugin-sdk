export interface GenericDataForLearningAnalyticsDashboard {
  cardTitle: string;
  columnTitle: string;
  value: string;
}

export interface LearningAnalyticsDashboardEventDetails {
  pluginName: string;
  data: GenericDataForLearningAnalyticsDashboard;
}

export type SendGenericDataForLearningAnalyticsDashboard = (
  data: GenericDataForLearningAnalyticsDashboard) => void;
