import { getLoginData } from '../login/getLoginData.js';
import { createModal } from './createModal.js';

const loginButton = document.getElementById('loginButton');

if (loginButton) {
  loginButton.addEventListener('click', () => {
    const modalContent = `
      <form id="loginForm" class="bg-white p-6 shadow-lg">
        <h2 class="text-lg font-bold mb-4 text-dark text-center">Login to BidderShop</h2>

        <label for="email" class="block mb-2">Email:</label>
        <input type="email" id="email" class="border p-2 w-full mb-4" required />

        <label for="password" class="block mb-2">Password:</label>
        <input type="password" id="password" class="border p-2 w-full mb-4" required />

        <div id="messageContainer" class="hidden"></div>

        <button type="submit" class="bg-primary text-white px-4 py-2 mt-4 rounded">Login</button>
      </form>
    `;

    createModal(modalContent);
    getLoginData();
  });
}
