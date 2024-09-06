import { registerUser } from '../../API/registerUser.js';
import { createModal, closeModal } from './createModal.js';

document.getElementById('registerButton').addEventListener('click', () => {
  const modalContent = `
    <form id="registrationForm" class="bg-white p-6 shadow-lg">
      <h2 class="text-lg font-bold mb-4 text-dark">Register for BidderShop</h2>
      <label for="name" class="block mb-2">Name:</label>
      <input type="text" id="name" class="border p-2 w-full mb-4" required />
      
      <label for="email" class="block mb-2">Email:</label>
      <input type="email" id="email" class="border p-2 w-full mb-4" required />
      
      <label for="password" class="block mb-2">Password:</label>
      <input type="password" id="password" class="border p-2 w-full mb-4" required />
      
      <label for="bio" class="block mb-2">Bio (optional):</label>
      <input type="text" id="bio" class="border p-2 w-full mb-4" />
      
      <label for="avatar" class="block mb-2">Avatar URL (optional):</label>
      <input type="text" id="avatar" class="border p-2 w-full mb-4" />
      
      <button type="submit" class="bg-primary text-white px-4 py-2 rounded">Register</button>
    </form>
  `;

  createModal(modalContent);

  // Handle form submission when modal is open
  document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const bio = document.getElementById('bio').value;
    const avatar = { url: document.getElementById('avatar').value, alt: '' };

    const result = await registerUser(name, email, password, bio, avatar);

    if (result.success) {
      alert('Registration successful! You can now log in.');
      closeModal(); // Close the modal on success
    } else {
      alert('Registration failed. Please try again.');
    }
  });
});
