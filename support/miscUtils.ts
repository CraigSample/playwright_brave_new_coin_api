import * as constants from 'config/constants';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

/**
 * Check if the given string is a jwt token and that the token has a numeric exp.
 * @param {string} jwtToken The string to check for jwt token compliance.
 * @returns {boolean} Is the given string compliant?
 */
export function isJwtToken(jwtToken: string): boolean {
  if (constants.jwtRegex.test(jwtToken)) {
    const decoded: object = jwt_decode(jwtToken);
    console.log('isJwtToken decoded jwt: ' + prettyPrintJson(decoded));
    if (typeof decoded['exp'] === 'number') {
      return true;
    }
  }
  return false;
}

/**
 * Convert a json style string or object to a pretty printed version.
 * @param {string | object} jsonString The json string to convert.
 * @param {number | null} [outputLength=null] Limits the length of the output. Defaults to null.
 * @returns {string | object} Pretty printed json string.
 */
export function prettyPrintJson(
  jsonString: string | object,
  outputLength: number | null = null
): string | object {
  try {
    let convertible = jsonString;
    if (typeof jsonString === 'string') {
      convertible = JSON.parse(jsonString);
    }
    if (outputLength) {
      return JSON.stringify(convertible, null, 2).substring(0, outputLength) + '...';
    } else {
      return JSON.stringify(convertible, null, 2);
    }
  } catch (err) {
    return jsonString;
  }
}
