import { getSessionToken } from '../session-token/getter';

function objectToUrlParameters(parameters: {[key: string]: string}): string {
  const queryString = Object.entries(parameters)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return queryString;
}

export async function getJoinUrl(parameters: {[key: string]: string}): Promise<string> {
  const urlParameters = objectToUrlParameters(parameters);
  const url = `${document.location.origin}/bigbluebutton/api/getJoinUrl?sessionToken=${getSessionToken()}&${urlParameters}`;
  const response = await fetch(url);
  const responseUrl = await response.json();
  return responseUrl.response.url as string;
}
