export function getSessionToken(): string {
  return document.location.href.split('sessionToken=')[1];
}
