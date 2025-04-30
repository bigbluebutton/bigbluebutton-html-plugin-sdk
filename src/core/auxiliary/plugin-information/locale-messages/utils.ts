async function fetchLocaleAndStore(
  localeUrl: string,
  fetchConfigs?: RequestInit,
): Promise<Record<string, string>> {
  const result = await fetch(localeUrl, fetchConfigs);
  const localeMessages = await result.json();
  return localeMessages;
}

function mergeLocaleMessages(
  desiredMessages: Record<string, string>,
  fallbackMessages: Record<string, string>,
): Record<string, string> {
  return { ...fallbackMessages, ...desiredMessages };
}

export { fetchLocaleAndStore, mergeLocaleMessages };
