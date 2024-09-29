/**
 * Removes the loader element from the DOM if it exists.
 *
 * @function removeLoader
 * @description This function selects the loader element by its ID and removes it from the DOM, effectively stopping the loading animation.
 */
export function removeLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.remove();
  }
}
