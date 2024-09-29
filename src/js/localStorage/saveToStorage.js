/**
 * Saves data to local storage under a specified key after serializing it to JSON.
 *
 * @function saveToStorage
 * @param {string} key - The key under which the data will be stored.
 * @param {any} data - The data to be stored, which will be serialized to JSON.
 *
 * @throws Will log an error if the data is `undefined`, `null`, or if an error occurs while saving to local storage.
 */
export function saveToStorage(key, data) {
  try {
    if (data === undefined || data === null) {
      console.error(`Attempted to save ${key}, but data is ${data}`);
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}
