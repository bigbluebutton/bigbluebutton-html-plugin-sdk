/* eslint-disable no-console */
export const extractObject = <T>(log: string): T | null => {
  const start = log.indexOf('{');
  const end = log.lastIndexOf('}');

  if (start === -1 || end === -1 || end <= start) return null;

  const jsonString = log.slice(start, end + 1); // include the closing }

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Invalid JSON in log:', e);
    return null;
  }
};
