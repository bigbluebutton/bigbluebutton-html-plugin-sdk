export const getRemoteData = (dataSourceName: string, pluginName: string) => fetch(`/api/plugin/${pluginName}/${dataSourceName}/`, {
  credentials: 'include',
  headers: {
    'x-session-token': new URLSearchParams(window.location.search).get('sessionToken') ?? '',
  },
});
