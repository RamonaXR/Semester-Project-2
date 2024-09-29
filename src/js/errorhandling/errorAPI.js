/**
 * Checks the API response for errors and returns an object indicating the success status.
 *
 * @function errorAPI
 * @param {Response} response - The fetch API response object to be checked for errors.
 * @returns {Object} An object containing the success status, and if an error occurred, the status code and error message.
 *
 * @property {boolean} success - Indicates whether the response was successful (true) or an error occurred (false).
 * @property {number} [status] - The HTTP status code of the response if an error occurred.
 * @property {string} [message] - A descriptive error message if an error occurred.
 */
export function errorAPI(response) {
  if (!response.ok) {
    const errorMessage = response.statusText || 'Unknown error occurred';
    return { success: false, status: response.status, message: errorMessage };
  }
  return { success: true };
}
