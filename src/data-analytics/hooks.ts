import {
  DataAnalyticsEventDetails,
  DataAnalyticsObject,
} from './types';
import { DataAnalyticsSendObjectEvents } from './enums';

export const sendDataAnalytics = (dataAnalyticsObject: DataAnalyticsObject, pluginName: string) => {
  window.dispatchEvent(
    new CustomEvent<DataAnalyticsEventDetails>(DataAnalyticsSendObjectEvents.PILED_UP_OBJECT, {
      detail: {
        pluginName,
        dataAnalyticsObject,
      },
    }),
  );
};
