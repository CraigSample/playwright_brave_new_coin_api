import * as constants from 'config/constants';
import * as types from 'config/types';
import { isJwtToken, prettyPrintJson } from 'support/miscUtils';

import { APIResponse, expect } from '@playwright/test';

export async function validateClientCredentials(response: APIResponse) {
  expect(response.ok()).toBeTruthy();
  const responseJson: types.AccessTokenResponse = await response.json();

  expect(
    isJwtToken(responseJson.access_token),
    'The returned access_token value is expected to be a valid jwt token. Found: ' +
      prettyPrintJson(responseJson.access_token)
  ).toBeTruthy();
  expect(
    isInt(responseJson.expires_in),
    'The returned expires_in value is expected to be an integer. Found: ' + responseJson.expires_in
  ).toBeTruthy();
  expect(
    responseJson.expires_in,
    'The returned expires_in value is expected to be less than or equal to 86400. Found: ' +
      responseJson.expires_in
  ).toBeLessThanOrEqual(86400);
  expect(
    responseJson.token_type,
    "The returned token_type value expected to be 'Bearer'. Found: " + responseJson.token_type
  ).toBe('Bearer');
}

/**
 * Validate the JSON response of the GET /asset request.
 *
 * @param {APIResponse} response The returned response from the request.
 * @param {object} [options] Optional parameters for the query.
 * @param {string} [options.specificAssetType] Check that only a specific asset type value was
 *  returned. Ex: FIAT, CRYPTO.
 * @param {string} [options.specificStatus] Check that only a specific status value was returned.
 *  Ex: ACTIVE, INACTIVE.
 * @param {string} [options.specificSymbol] Check that only a specific asset symbol value was
 *  returned. Ex: BTC, DOT.
 * @param {number} [options.expectedNumberEntries] Check that the expected number of entries
 *  were returned.
 * @param {boolean} [options.expectedFail] Check that the response was expected to fail. Defaults
 *  to false.
 */
export async function validateListAssets(
  response: APIResponse,
  options?: {
    specificAssetType?: string;
    specificStatus?: string;
    specificSymbol?: string;
    expectedNumberEntries?: number;
    expectedFail?: boolean;
  }
) {
  const { expectedFail = false } = options || {};

  if (!expectedFail) {
    expect(response.ok()).toBeTruthy();

    let responseJson: types.ListAssetsResponse;
    try {
      responseJson = await response.json();
    } catch (error) {
      throw new Error(`Failed to parse JSON response: ${error}`);
    }

    let entries: types.ListAssetsEntry[];
    if (responseJson.content) {
      entries = Object.values(responseJson.content);
    } else {
      entries = [];
    }

    console.log(
      `validateListAssets is parsing ${entries.length} entries: ${prettyPrintJson(
        responseJson,
        300
      )}`
    );

    for (const curEntry of entries) {
      expect(curEntry.id, `Invalid uuid: ${curEntry.id}`).toMatch(constants.uuidRegex);
      expect(curEntry.status, `Invalid status: ${curEntry.status}`).toMatch(/^ACTIVE|INACTIVE$/);
      expect(curEntry.type, `Invalid type: ${curEntry.type}`).toMatch(/^FIAT|CRYPTO$/);
      if (options?.specificAssetType) {
        expect(curEntry.type, `Unexpected asset type: ${curEntry.type}`).toBe(
          options.specificAssetType
        );
      }
      if (options?.specificStatus) {
        expect(curEntry.status, `Unexpected status: ${curEntry.status}`).toBe(
          options.specificStatus
        );
      }
      if (options?.specificSymbol) {
        expect(curEntry.symbol, `Unexpected symbol: ${curEntry.symbol}`).toBe(
          options.specificSymbol
        );
      }
    }

    if (options?.expectedNumberEntries) {
      expect(
        entries.length,
        `Expected ${options.expectedNumberEntries} entries, but found ${entries.length}`
      ).toBe(options.expectedNumberEntries);
    }
  } else {
    expect(response.ok()).toBeFalsy();

    let responseJson: types.GenericBadRequest;
    try {
      responseJson = await response.json();
    } catch (error) {
      throw new Error(`Failed to parse JSON response: ${error}`);
    }

    console.log(`validateListAssets responseJson: ${prettyPrintJson(responseJson)}`);

    expect(
      responseJson.status,
      `Expected status 'BAD_REQUEST', but found ${responseJson.status}`
    ).toBe('BAD_REQUEST');
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
