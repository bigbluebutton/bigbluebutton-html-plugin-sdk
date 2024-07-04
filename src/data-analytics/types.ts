export interface DataAnalyticsObject {
  learningAnalyticsDashboardColumnTitle: string;
  learningAnalyticsDashboardValue: string;
}

export interface DataAnalyticsEventDetails {
  pluginName: string;
  dataAnalyticsObject: DataAnalyticsObject;
}

export type SendDataAnalytics = (dataAnalyticsObject: DataAnalyticsObject) => void;
