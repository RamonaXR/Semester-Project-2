export function errorMessage(container, errors) {
  console.log('container', container);
  if (!errors) return;
  console.log('error', errors);
  let errorMessage = '';

  if (typeof errors === 'string') {
    errorMessage = `<p class="text-red-600 text-center">${errors}</p>`;
  } else {
    Object.values(errors).forEach((msg) => {
      errorMessage += `<p class="text-red-600 text-center">${msg}</p>`;
    });
  }

  if (container.classList === 'msgContainerParent') {
    const messageContainer = document.querySelector('.msgContainer');
    console.log('error Container', messageContainer);
    container.classList.add('flex');
    messageContainer.innerHTML = errorMessage;
  } else {
    container.innerHTML = errorMessage;
    container.classList.remove('hidden');
  }
}
