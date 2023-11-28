export function getSessionToken(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  return params.get('sessionToken') || undefined;
}
