export function successMessage(container, message) {
  container.innerHTML = `<p class="text-green-600 text-center">${message}</p>`;
  container.classList.remove('hidden');
}
