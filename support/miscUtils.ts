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
