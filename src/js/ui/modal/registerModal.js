import { registerUser } from '../../API/registerUser.js';
import { createModal, closeModal } from './createModal.js';
import { errorMessage } from '../messages/errorMessage.js';
import { successMessage } from '../messages/successMessage.js';
import { validationFeedback } from '../../utils/validationFeedback.js';
import { validateField } from '../../utils/validateField.js';
import { register } from './modalContent.js';

export function registerModal() {
  // Path to the default avatar image

  const registerButton = document.getElementById('registerButton');
  const content = register();

  if (registerButton) {
    registerButton.addEventListener('click', () => {
      createModal(content);

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
}
