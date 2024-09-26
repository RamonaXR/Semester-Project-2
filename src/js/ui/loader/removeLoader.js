export function removeLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.remove();
  }
}
