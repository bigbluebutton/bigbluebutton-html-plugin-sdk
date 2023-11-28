import { JoinUrlParameters } from './types';
import { getSessionToken } from '../session-token/getter';

function objectToUrlParameters(parameters: JoinUrlParameters): string {
  const queryString = Object.entries(parameters)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return queryString;
}

export async function getJoinUrl(parameters: JoinUrlParameters): Promise<string> {
  const urlParameters = objectToUrlParameters(parameters);
  const url = `${document.location.origin}/bigbluebutton/api/getJoinUrl?sessionToken=${getSessionToken()}&${urlParameters}`;
  const response = await fetch(url);
  const responseUrl = await response.json();
  return responseUrl.response.url as string;
}
