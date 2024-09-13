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
