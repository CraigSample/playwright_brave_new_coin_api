import * as constants from 'config/constants';
import * as types from 'config/types';

import { APIRequestContext, APIResponse, expect } from '@playwright/test';

const accessTokenData: types.AccessTokenResponse = JSON.parse(process.env.accessTokenData || '{}');

/**
 * The calculate_premium test class.
 *
 * @class CalculatePremium
 */
export class BraveNewWorldApi {
  readonly request: APIRequestContext;

  /**
   * @param {APIRequestContext} request api request object
   */
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * GET /asset.
   * See https://docs.bravenewcoin.com/#operation/listAssets.
   * @async
   * @param {number} expectedResponse The expected HTTP response status code.
   * @param {object} [options] Optional parameters for the query.
   * @param {string} [options.symbol] Only return assets which have a particular ticker symbol
   *  e.g. BTC.
   * @param {string} [options.status] ACTIVE or INACTIVE. Only return assets which have the
   *  particular status.
   * @param {string} [options.assetType] CRYPTO or FIAT. Only return assets of the particular type.
   * @returns {Promise<APIResponse>} A Promise that resolves to the APIResponse object.
   * @returns {Promise<APIResponse>} The response of the call.
   * @memberof BraveNewWorldApi
   */
  async getAsset(
    expectedResponse: number,
    options?: { symbol?: string; status?: string; assetType?: string }
  ): Promise<APIResponse> {
    const requestOptions = {
      headers: {
        Authorization: 'Bearer ' + accessTokenData.access_token
      }
    };

    const queryParams = new URLSearchParams();
    if (options?.symbol) {
      queryParams.append('symbol', options.symbol);
    }
    if (options?.status) {
      queryParams.append('status', options.status);
    }
    if (options?.assetType) {
      queryParams.append('type', options.assetType);
    }
    const url = constants.baseURL + '/asset?' + queryParams.toString();
    console.log('getAsset url: ' + url);

    const response = await this.request.get(url, requestOptions);
    expect(
      response.status(),
      'GET "' +
        url +
        '" did not return ' +
        expectedResponse +
        '. Received: ' +
        response.status() +
        ' ' +
        (await response.text())
    ).toBe(expectedResponse);

    return response;
  }

  /**
   * GET /asset/{id}.
   * See https://docs.bravenewcoin.com/#operation/getAssetById
   * @async
   * @param {number} expectedResponse The expected HTTP response status code.
   * @param {string} assetId The unique resource identifier of an asset.
   * @returns {Promise<APIResponse>} A Promise that resolves to the APIResponse object.
   * @memberof BraveNewWorldApi
   */
  async getAssetById(expectedResponse: number, assetId: string): Promise<APIResponse> {
    const requestOptions = {
      headers: {
        Authorization: 'Bearer ' + accessTokenData.access_token
      }
    };
    const url = constants.baseURL + '/asset/' + assetId;
    console.log('getAssetById url: ' + url);

    const response = await this.request.get(url, requestOptions);
    expect(
      response.status(),
      'GET "' +
        url +
        '" did not return ' +
        expectedResponse +
        '. Received: ' +
        response.status() +
        ' ' +
        (await response.text())
    ).toBe(expectedResponse);

    return response;
  }

  /**
   * GET /ohlcv.
   * See https://docs.bravenewcoin.com/#operation/listOhlcv
   * Retrieves daily Open-High-Low-Close-Volume (OHLCV) data for an asset index.
   * @param {number} expectedResponse The expected HTTP response status code.
   * @param {Object} [options] Optional parameters.
   * @param {string} [options.startAfter] Retrieve OHLCV for the indexId or indexType required,
   *  starting after this particular record id. Every record in the dataset has a universal
   *  identifier (UUID). This parameter provides for pagination through large selections
   *  since every response includes a nextId that can be used here.
   * @param {number} [options.size] Integer 1 to 2000. The maximum size to return in the
   *  result set up to the overall limit of 2000. This parameter is ignored if no timestamp is
   *  provided. Otherwise, since records are in reverse data order, use in conjunction with
   *  timestamp to make selections back in time. Defaults to the internal value of 10.
   * @param {string} [options.indexId] Retrieve all the OHLCV values for a particular asset or
   *  market by its id. The index id is a universal identifier (UUID) that will differ based on
   *  the index type.
   * @param {string} [options.timestamp] Retrieve all daily OHLCV records up to the timestamp
   *  provided. All dates are stored in UTC. Timestamp strings should be in the form
   *  YYYY-MM-DDThh:mm:ssZ.
   * @param {string} [options.indexType] Restrict the OHLCV results to the index type. Either MWA or
   *  GWA.
   * @returns {Promise<APIResponse>} A Promise that resolves with the HTTP response data.
   * @memberof BraveNewWorldApi
   */
  async getDailyOhlcv(
    expectedResponse: number,
    options?: {
      startAfter?: string;
      size?: number;
      indexId?: string;
      timestamp?: string;
      indexType?: string;
    }
  ): Promise<APIResponse> {
    const requestOptions = {
      headers: {
        Authorization: 'Bearer ' + accessTokenData.access_token
      }
    };
    const queryParams = new URLSearchParams();
    if (options?.startAfter) {
      queryParams.append('startAfter', options.startAfter);
    }
    if (options?.size) {
      queryParams.append('size', String(options.size));
    }
    if (options?.indexId) {
      queryParams.append('indexId', options.indexId);
    }
    if (options?.timestamp) {
      queryParams.append('timestamp', options.timestamp);
    }
    if (options?.indexType) {
      queryParams.append('indexType', options.indexType);
    }

    const url = constants.baseURL + '/ohlcv?' + queryParams.toString();
    console.log('getDailyOhlcv url: ' + url);

    const response = await this.request.get(url, requestOptions);
    expect(
      response.status(),
      'GET "' +
        url +
        '" did not return ' +
        expectedResponse +
        '. Received: ' +
        response.status() +
        ' ' +
        (await response.text())
    ).toBe(expectedResponse);

    return response;
  }

  /**
   * GET /market.
   * See https://docs.bravenewcoin.com/#operation/listMarkets
   * @async
   * @param {number} expectedResponse The expected HTTP response status code.
   * @param {object} [options] Optional parameters for the query.
   * @param {string} [options.baseAssetId] Only return markets which contain the asset id on the
   * base side of the market.
   * @param {string} [options.quoteAssetId] Only return markets which contain the asset id on the
   *  quote side of the market.
   * @returns {Promise<APIResponse>} A Promise that resolves to the APIResponse object.
   * @memberof BraveNewWorldApi
   */
  async getMarket(
    expectedResponse: number,
    options?: { baseAssetId?: string; quoteAssetId?: string }
  ): Promise<APIResponse> {
    const requestOptions = {
      headers: {
        Authorization: 'Bearer ' + accessTokenData.access_token
      }
    };
    const queryParams = new URLSearchParams();
    if (options?.baseAssetId) {
      queryParams.append('baseAssetId', options.baseAssetId);
    }
    if (options?.quoteAssetId) {
      queryParams.append('quoteAssetId', options.quoteAssetId);
    }

    const url = constants.baseURL + '/market?' + queryParams.toString();
    console.log('getMarket url: ' + url);

    const response = await this.request.get(url, requestOptions);
    expect(
      response.status(),
      'GET "' +
        url +
        '" did not return ' +
        expectedResponse +
        '. Received: ' +
        response.status() +
        ' ' +
        (await response.text())
    ).toBe(expectedResponse);

    return response;
  }

  /**
   * GET /market/{id}.
   *
   * @param {number} expectedResponse The expected response code.
   * @param {string} marketId The unique resource identifier of a market.
   * @returns {Promise<APIResponse>} The response of the call.
   * @memberof BraveNewWorldApi
   */
  async getMarketById(expectedResponse: number, marketId: string): Promise<APIResponse> {
    const requestOptions = {
      headers: {
        Authorization: 'Bearer ' + accessTokenData.access_token
      }
    };

    const url = constants.baseURL + '/market/' + marketId;
    console.log('getMarket url: ' + url);

    const response = await this.request.get(url, requestOptions);
    expect(
      response.status(),
      'GET "' +
        url +
        '" did not return ' +
        expectedResponse +
        '. Received: ' +
        response.status() +
        ' ' +
        (await response.text())
    ).toBe(expectedResponse);

    return response;
  }

  /**
   * GET /market-cap.
   * See https://docs.bravenewcoin.com/#operation/listMarketCaps
   * @async
   * @param {number} expectedResponse - The expected HTTP response status code.
   * @param {string} assetId The unique resource identifier of an asset.
   * @param {boolean} [percentChange=false] When true the percentage changes in the price and 24
   *  hour volume across 1, 7 and 30 days will be included in the response payload. Defaults to
   *  False.
   * @returns {Promise<APIResponse>} A Promise that resolves to the APIResponse object.
   * @memberof BraveNewWorldApi
   */
  async getMarketCap(
    expectedResponse: number,
    assetId: string,
    percentChange: boolean = false
  ): Promise<APIResponse> {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const queryParams = new URLSearchParams();
    queryParams.append('assetId', assetId);
    if (percentChange) {
      queryParams.append('percentChange', String(percentChange));
    }

    const url = constants.baseURL + '/market-cap?' + queryParams.toString();
    console.log('getMarketCap url: ' + url);

    const response = await this.request.get(url, requestOptions);
    expect(
      response.status(),
      'GET "' +
        url +
        '" did not return ' +
        expectedResponse +
        '. Received: ' +
        response.status() +
        ' ' +
        (await response.text())
    ).toBe(expectedResponse);

    return response;
  }

  /**
   * POST /oauth/token.
   * See https://docs.bravenewcoin.com/#operation/clientCredentials
   * @param {number} expectedResponse The expected response code.
   * @param {types.AccessTokenRequest} payload The access token request payload.
   * @returns {Promise<APIResponse>} The response of the call.
   * @memberof BraveNewWorldApi
   */
  async postGetToken(
    expectedResponse: number,
    payload: types.AccessTokenRequest
  ): Promise<APIResponse> {
    const requestOptions = {
      data: payload.toString()
    };

    const url = constants.baseURL + '/oauth/token';
    console.log('postGetToken url: ' + url);

    const response = await this.request.post(url, requestOptions);
    expect(
      response.status(),
      'POST "' +
        url +
        '" did not return ' +
        expectedResponse +
        '. Received: ' +
        response.status() +
        ' ' +
        (await response.text())
    ).toBe(expectedResponse);

    return response;
  }
}

/**
 * POST /oauth/token using the fetch method.
 * See https://docs.bravenewcoin.com/#operation/clientCredentials
 * @param {types.AccessTokenRequest} payload The access token request payload.
 * @returns {Promise<types.AccessTokenResponse>} The returned json payload of the call.
 */
export async function postGetTokenFetch(): Promise<types.AccessTokenResponse> {
  const url = constants.baseURL + '/oauth/token';
  console.log('postGetTokenFetch url: ' + url);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': constants.bncKey,
      'X-RapidAPI-Host': constants.bncHost
    },
    body: JSON.stringify({
      audience: constants.bncAudience,
      client_id: constants.bncClientId,
      grant_type: 'client_credentials'
    })
  };

  const response = await fetch(url, options);

  const data = (await response.json()) as types.AccessTokenResponse;
  return data;
}
