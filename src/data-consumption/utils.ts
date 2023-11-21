import { CustomSubscriptionArguments } from './domain/shared/custom-subscription/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function sortedStringify(obj: {[key: string]: any} | undefined): string {
  if (obj) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj = sortedKeys.reduce((accumulator, key) => {
      accumulator[key] = obj[key];
      return accumulator;
    }, {} as {[key: string]: any});
    return JSON.stringify(sortedObj);
  } return '';
}

export function makeCustomHookIdentifier(query?: string, variables?: object): string {
  return query + sortedStringify(variables);
}

export function makeCustomHookIdentifierFromArgs(
  args: CustomSubscriptionArguments,
): string {
  return makeCustomHookIdentifier(args.query, args.variables);
}
