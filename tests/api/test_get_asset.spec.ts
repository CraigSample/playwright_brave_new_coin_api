import { BraveNewWorldApi } from 'apiHelpers/braveNewCoinApi';
import * as types from 'config/types';
import { validateListAssets } from 'support/validations';

import { test } from '@playwright/test';

const endpointName = 'listAssets';

// TODO: Add remaining tests and documentation for each test case - WIP.

test('TC-@1 @asset Test listAssets endpoint with no parameters.', async ({ request }) => {
  const api = new BraveNewWorldApi(request);

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(200);
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse);
  });
});

test('TC-@2 @asset Test listAssets endpoint with the symbol parameter.', async ({ request }) => {
  const api = new BraveNewWorldApi(request);
  const symbol = 'DOT';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(200, { symbol: symbol });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse);
  });
});
