export function errorMessage(container, errors) {
  let errorMessage = '';

  if (typeof errors === 'string') {
    errorMessage = `<p class="text-red-600 text-center">${errors}</p>`;
  } else {
    Object.values(errors).forEach((msg) => {
      errorMessage += `<p class="text-red-600 text-center">${msg}</p>`;
    });
  }

  container.innerHTML = errorMessage;
  container.classList.remove('hidden');
}
