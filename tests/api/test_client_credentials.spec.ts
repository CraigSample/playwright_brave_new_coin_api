import { BraveNewWorldApi } from 'apiHelpers/braveNewCoinApi';
import * as constants from 'config/constants';
import * as types from 'config/types';
import { prettyPrintJson } from 'support/miscUtils';
import { validateClientCredentials } from 'support/validations';

import { test } from '@playwright/test';

const endpointName = 'clientCredentials';

// TODO: Add remaining tests and documentation for each test case - WIP.

test('TC-@token_1 Test @clientCredentials endpoint with a proper payload.', async ({ request }) => {
  const api = new BraveNewWorldApi(request);

  const payload: types.AccessTokenRequest = {
    audience: constants.bncAudience,
    client_id: constants.bncClientId,
    grant_type: 'client_credentials'
  };
  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.postGetToken(200, payload);
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    const responseJson = await apiResponse.json();
    console.log('responseJson: ' + prettyPrintJson(responseJson));
    await validateClientCredentials(apiResponse);
  });
});
