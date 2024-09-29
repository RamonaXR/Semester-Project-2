/**
 * Loads and parses data from local storage for a given key.
 *
 * @function loadFromStorage
 * @param {string} key - The key of the item to retrieve from local storage.
 * @returns {any|null} The parsed value associated with the key, or `null` if the key does not exist or parsing fails.
 *
 * @throws Will log an error if JSON parsing fails for the stored value.
 */
export function loadFromStorage(key) {
  try {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
    return null;
  }
}
