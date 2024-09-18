export function createModal(content) {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.classList = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg w-11/12 max-w-md relative z-60">
      <button id="closeModal" class="absolute top-2 right-2 text-black text-3xl p-4 focus:outline-none">X</button>
      <div id="modalContent">${content}</div>
    </div>
  `;

  document.body.append(modal);

  document.getElementById('closeModal').addEventListener('click', () => {
    closeModal();
  });

  modal.addEventListener('click', (event) => {
    if (event.target.id === 'modal') closeModal();
  });
}

export function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.remove();
  }
}
