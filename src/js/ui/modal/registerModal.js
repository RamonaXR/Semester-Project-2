import { registerUser } from '../../API/registerUser.js';
import { createModal, closeModal } from './createModal.js';
import { errorMessage } from '../messages/errorMessage.js';
import { successMessage } from '../messages/successMessage.js';
import { validationFeedback } from '../../utils/validationFeedback.js';
import { validateField } from '../../utils/validateField.js';

// Path to the default avatar image
const defaultAvatarUrl = 'https://i.pravatar.cc/200';

const registerButton = document.getElementById('registerButton');

if (registerButton) {
  registerButton.addEventListener('click', () => {
    const modalContent = `
      <form id="registrationForm" class="bg-white p-6 shadow-lg">
        <h2 class="text-lg font-bold mb-4 text-dark text-center">Register for BidderShop</h2>

        <div class="flex flex-col items-center mb-4">
          <label for="avatarUrl" class="block mb-2">Upload Avatar:</label>
          <img id="avatarPreview" src="${defaultAvatarUrl}" alt="Avatar Preview" class="h-24 w-24 rounded-full object-cover mb-2" />
          <input type="url" id="avatarUrl" class="border p-2 w-full mb-2" placeholder="https://i.pravatar.cc" />
          <button type="button" id="changeAvatarButton" class="bg-primary text-white px-4 py-1 rounded">Change Avatar</button>
        </div>

        <label for="username" class="block mb-2">Username:</label>
        <input type="text" id="username" class="border p-2 w-full mb-4" required placeholder="Enter your username" />
        <small id="usernameError" class="text-red-500 hidden"></small>

        <label for="email" class="block mb-2">Email:</label>
        <input type="email" id="email" class="border p-2 w-full mb-4" required placeholder="Enter your email" />
        <small id="emailError" class="text-red-500 hidden"></small>

        <label for="password" class="block mb-2">Password:</label>
        <input type="password" id="password" class="border p-2 w-full mb-4" required placeholder="Enter your password" />
        <small id="passwordError" class="text-red-500 hidden"></small>

        <div id="messageContainer" class="hidden"></div> <!-- For Success/Error messages -->

        <div class="flex justify-center">
          <button type="submit" class="bg-primary text-white px-4 py-2 mt-4 rounded">Register</button>
        </div>
      </form>
    `;

    createModal(modalContent);

    const fields = {
      username: document.getElementById('username'),
      email: document.getElementById('email'),
      password: document.getElementById('password'),
    };

    const errorElements = {
      username: document.getElementById('usernameError'),
      email: document.getElementById('emailError'),
      password: document.getElementById('passwordError'),
    };

    const validationRules = {
      email: { required: true, pattern: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/, errorMessage: 'Invalid email' },
      username: { required: true, minLength: 3, errorMessage: 'Username must be at least 3 characters' },
      password: { required: true, minLength: 8, errorMessage: 'Password must be at least 8 characters long' },
    };

    // Real-time validation for each field
    Object.keys(fields).forEach((fieldName) => {
      fields[fieldName].addEventListener('input', () => {
        const error = validateField(fieldName, fields[fieldName].value, validationRules);
        validationFeedback(error, errorElements[fieldName]);
      });
    });

    // Form submission handler
    document.getElementById('registrationForm').addEventListener('submit', async (event) => {
      event.preventDefault();

      const isValid = Object.keys(fields).every((fieldName) => {
        const error = validateField(fieldName, fields[fieldName].value, validationRules);
        validationFeedback(error, errorElements[fieldName]);
        return !error;
      });

      if (!isValid) {
        errorMessage(document.getElementById('messageContainer'), 'Please correct the errors in the form.');
        return;
      }

      const avatar = { url: document.getElementById('avatarPreview').src, alt: `${fields.username.value}'s avatar` };

      const result = await registerUser(fields.username.value, fields.email.value, fields.password.value, avatar);

      if (result.success) {
        successMessage(document.getElementById('messageContainer'), 'Registration successful!');
        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        errorMessage(document.getElementById('messageContainer'), result.message);
      }
    });
  });
} else {
  console.error('Register button not found in the DOM');
}
