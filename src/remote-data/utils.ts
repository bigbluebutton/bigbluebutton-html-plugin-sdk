import { getSessionToken } from '../core/auxiliary/session-token/getter';

export const getRemoteData = (dataSourceName: string, pluginName: string) => fetch(`/api/plugin/${pluginName}/${dataSourceName}/`, {
  credentials: 'include',
  headers: {
    'x-session-token': getSessionToken() ?? '',
  },
});
