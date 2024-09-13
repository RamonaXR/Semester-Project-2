import { loadFromStorage } from '../../localStorage/loadFromStorage.js';
import { createModal, closeModal } from './createModal.js';

const profileButton = document.getElementById('profileButton');

if (profileButton) {
  profileButton.addEventListener('click', () => {
    const session = loadFromStorage('profile');

    if (!session) {
      console.error('No user session found.');
      return;
    }

    const modalContent = `
      <div class="bg-white p-6 shadow-lg">
        <h2 class="text-lg font-bold mb-4 text-dark text-center">${session.username}</h2>

        <div class="flex flex-col items-center mb-4">
          <img src="${session.avatar.url}" alt="${session.username}'s avatar" class="h-24 w-24 rounded-full object-cover mb-2" />
          <button class="bg-primary text-white px-4 py-1 rounded">Change avatar</button>
        </div>

        <p class="text-center mb-4">Current credits: ${session.credits}</p>

        <div class="flex justify-center">
          <button id="logoutButton" class="bg-primary text-white px-4 py-2 rounded">Log Out</button>
        </div>
      </div>
    `;

    createModal(modalContent);

    document.getElementById('logoutButton').addEventListener('click', () => {
      closeModal();
      window.location.reload();
    });
  });
}
