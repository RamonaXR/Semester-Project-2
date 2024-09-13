export function createModal(content) {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.classList = 'fixed inset-0 bg-dark92 flex items-center justify-center';
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg w-11/12 max-w-md relative">
      <button id="closeModal" class="absolute top-2 right-2 text-black">X</button>
      <div id="modalContent">${content}</div>
    </div>
  `;

  document.body.append(modal);

  document.getElementById('closeModal').addEventListener('click', () => {
    closeModal();
  });
}

export function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.remove();
  }
}
