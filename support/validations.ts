import * as constants from 'config/constants';
import * as types from 'config/types';
import { prettyPrintJson } from 'support/miscUtils';

import { APIResponse, expect } from '@playwright/test';

/**
 * Validate the JSON response of the GET /asset request.
 *
 * @param {APIResponse} response The returned response from the request.
 */
export async function validateListAssets(response: APIResponse) {
  expect(response.ok()).toBeTruthy();
  const responseJson: types.ListAssetsResponse = await response.json();
  console.log(
    'validateListAssets is parsing ' +
      Object.keys(responseJson.content).length +
      ' entries: ' +
      prettyPrintJson(responseJson, 300)
  );

  for (const curEntryNum in responseJson.content) {
    const curEntry: types.ListAssetsEntry = responseJson.content[curEntryNum];
    expect(curEntry.id, 'The returned id is not a valid uuid. Found: ' + curEntry.id).toMatch(
      constants.uuidRegex
    );
    expect(
      curEntry.status,
      "The returned status is not in 'ACTIVE', 'INACTIVE'. Found: " + curEntry.status
    ).toMatch(/^ACTIVE|INACTIVE$/);
    expect(
      curEntry.type,
      "The returned type is not in 'FIAT', 'CRYPTO'. Found: " + curEntry.type
    ).toMatch(/^FIAT|CRYPTO$/);
  }
}

/**
 * Check if the given number is a float.
 * Source: https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
 *
 * @param {*} num The number to check.
 * @return {boolean} Is the given number a float?
 */
export function isFloat(num: any): boolean {
  return Number(num) === num && num % 1 !== 0;
}

/**
 * Check if the given number is an int.
 * Source: https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
 *
 * @param {*} num The number to check.
 * @return {boolean} Is the given number an int?
 */
export function isInt(num: any): boolean {
  return Number(num) === num && num % 1 === 0;
}
