import { PluginBrowserWindow } from '../../../core/api/types';
import { getSessionToken } from '../session-token/getter';

declare const window: PluginBrowserWindow;

function objectToUrlParameters(parameters: { [key: string]: string }): string {
  const queryString = Object.entries(parameters)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return queryString;
}

export async function getJoinUrl(parameters: { [key: string]: string }): Promise<string> {
  const urlParameters = objectToUrlParameters(parameters);
  const baseUrl = window.meetingClientSettings?.public.app.bbbWebBase || '/bigbluebutton';
  const url = `${baseUrl}/api/getJoinUrl?sessionToken=${getSessionToken()}&${urlParameters}`;
  const response = await fetch(url, {
    credentials: 'include',
  });
  const responseUrl = await response.json();
  return responseUrl.response.url as string;
}
