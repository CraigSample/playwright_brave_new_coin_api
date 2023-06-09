import { BraveNewWorldApi } from 'apiHelpers/braveNewCoinApi';
import { validateListAssets } from 'support/validations';

import { test } from '@playwright/test';

const endpointName = 'listAssets';

// TODO: Add remaining tests and documentation for each test case - WIP.

test('TC-@asset_1 Test @listAssets endpoint with no parameters.', async ({ request }) => {
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

test('TC-@asset_2 Test @listAssets endpoint with the symbol parameter.', async ({ request }) => {
  const symbol = 'DOT';
  const api = new BraveNewWorldApi(request);

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(200, { symbol: symbol });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, { specificSymbol: symbol });
  });
});

test('TC-@asset_3 Test @listAssets endpoint with the status parameter.', async ({ request }) => {
  const api = new BraveNewWorldApi(request);
  const status = 'INACTIVE';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(200, { status: status });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, { specificStatus: status });
  });
});

test('TC-@asset_4 Test @listAssets endpoint with the type parameter.', async ({ request }) => {
  const api = new BraveNewWorldApi(request);
  const assetType = 'FIAT';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(200, { assetType: assetType });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, { specificAssetType: assetType });
  });
});

test('TC-@asset_5 @negative Test @listAssets endpoint with an invalid symbol parameter: unknown.', async ({
  request
}) => {
  const api = new BraveNewWorldApi(request);
  const symbol = 'BOGUS';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(200, { symbol: symbol });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, { specificSymbol: symbol, expectedNumberEntries: 0 });
  });
});

test('TC-@asset_6 @negative Test @listAssets endpoint with an invalid status parameter: unknown.', async ({
  request
}) => {
  const api = new BraveNewWorldApi(request);
  const status = 'BOGUS';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(400, { status: status });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, {
      expectedFail: true
    });
  });
});

test('TC-@asset_7 @negative Test @listAssets endpoint with an invalid type parameter: unknown.', async ({
  request
}) => {
  const api = new BraveNewWorldApi(request);
  const assetType = 'BOGUS';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(400, { assetType: assetType });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, {
      expectedFail: true
    });
  });
});

test('TC-@asset_8 @negative Test @listAssets endpoint with an invalid symbol parameter: lower case.', async ({
  request
}) => {
  const api = new BraveNewWorldApi(request);
  const symbol = 'btc';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(200, { symbol: symbol });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, { specificSymbol: symbol, expectedNumberEntries: 0 });
  });
});

test('TC-@asset_9 @negative Test @listAssets endpoint with an invalid status parameter: lower case.', async ({
  request
}) => {
  const api = new BraveNewWorldApi(request);
  const status = 'active';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(400, { status: status });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, {
      expectedFail: true
    });
  });
});

test('TC-@asset_10 @negative Test @listAssets endpoint with an invalid type parameter: lower case.', async ({
  request
}) => {
  const api = new BraveNewWorldApi(request);
  const assetType = 'crypto';

  const apiResponse = await test.step(
    'Step #1: Call the ' + endpointName + ' endpoint.',
    async () => {
      const response = await api.getAsset(400, { assetType: assetType });
      return response;
    }
  );

  await test.step('Step #2: Check the return response payload.', async () => {
    await validateListAssets(apiResponse, {
      expectedFail: true
    });
  });
});
