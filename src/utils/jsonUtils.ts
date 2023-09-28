import { GraphqlVariables } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function sortedStringify(obj: GraphqlVariables | undefined): string {
  if (obj) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj = sortedKeys.reduce((accumulator, key) => {
      accumulator[key] = obj[key];
      return accumulator;
    }, {} as GraphqlVariables);
    return JSON.stringify(sortedObj);
  } return '';
}

export function concatenateQueryAndVariables(query: string, variables?: GraphqlVariables): string {
  return query + sortedStringify(variables);
}

export function concatenateParameterQueryAndVariables(
  parameter: {query: string, variables?: GraphqlVariables},
): string {
  return parameter.query + sortedStringify(parameter.variables);
}
