import { postGetTokenFetch } from 'apiHelpers/braveNewCoinApi';
import * as constants from 'config/constants';
import * as types from 'config/types';
import { prettyPrintJson } from 'support/miscUtils';

/**
 * Global Setup
 * @param {FullConfig} config The playwright config to use.
 */
async function globalSetup() {
  // Make the API request and store the response data as a global variable
  const accessTokenData: types.AccessTokenResponse = await postGetTokenFetch();
  console.log('accessTokenData: ' + prettyPrintJson(accessTokenData));
  process.env.accessTokenData = JSON.stringify(accessTokenData);
}

export default globalSetup;
