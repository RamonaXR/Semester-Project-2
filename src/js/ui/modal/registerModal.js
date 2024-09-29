import { registerUser } from '../../API/registerUser.js';
import { createModal, closeModal } from './createModal.js';
import { errorMessage } from '../messages/errorMessage.js';
import { successMessage } from '../messages/successMessage.js';
import { validationFeedback } from '../../utils/validation/validationFeedback.js';
import { validateField } from '../../utils/validation/validateField.js';
import { register } from './modalContent.js';
import { MSG_PASSWORD_INVALID, MSG_EMAIL_INVALID, REG_EMAIL } from '../../data/constants.js';

/**
 * Initializes the registration modal and handles form validation, avatar preview, and user registration.
 *
 * @function registerModal
 * @description This function attaches an event listener to the register button. When clicked, it opens the registration modal and validates the form fields in real-time. It handles avatar preview functionality and submits the form to register a user. Success and error messages are displayed accordingly.
 *
 * @throws Will display an error message if the registration fails or if validation errors occur.
 */
export function registerModal() {
  const registerButton = document.getElementById('registerButton');
  const content = register();

  if (registerButton) {
    registerButton.addEventListener('click', () => {
      createModal(content);

      const fields = {
        username: document.getElementById('username'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        avatarUrl: document.getElementById('avatarUrl'),
        avatarPreview: document.getElementById('avatarPreview'),
      };

      const errorElements = {
        username: document.getElementById('usernameError'),
        email: document.getElementById('emailError'),
        password: document.getElementById('passwordError'),
      };

      const validationRules = {
        email: { required: true, pattern: REG_EMAIL, errorMessage: MSG_EMAIL_INVALID },
        username: { required: true, minLength: 3, errorMessage: 'Username must be at least 3 characters' },
        password: { required: true, minLength: 8, errorMessage: MSG_PASSWORD_INVALID },
      };

      // Real-time validation for each field
      Object.keys(fields).forEach((fieldName) => {
        if (fieldName !== 'avatarUrl' && fieldName !== 'avatarPreview') {
          fields[fieldName].addEventListener('input', () => {
            const error = validateField(fieldName, fields[fieldName].value, validationRules);
            validationFeedback(error, errorElements[fieldName]);
          });
        }
      });

      // Avatar preview functionality
      const changeAvatarButton = document.getElementById('changeAvatarButton');
      if (changeAvatarButton) {
        changeAvatarButton.addEventListener('click', () => {
          const newAvatarUrl = fields.avatarUrl.value.trim();
          if (newAvatarUrl) {
            fields.avatarPreview.src = newAvatarUrl;
          }
        });

        // Trigger avatar update when Enter is pressed
        fields.avatarUrl.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            const newAvatarUrl = fields.avatarUrl.value.trim();
            if (newAvatarUrl) {
              fields.avatarPreview.src = newAvatarUrl;
            }
          }
        });
      }

      // Form submission handler
      document.getElementById('registrationForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validate fields before submission
        const isValid = Object.keys(fields).every((fieldName) => {
          if (fieldName === 'avatarUrl' || fieldName === 'avatarPreview') return true;

          const error = validateField(fieldName, fields[fieldName].value, validationRules);
          validationFeedback(error, errorElements[fieldName]);
          return !error;
        });

        if (!isValid) {
          errorMessage(document.getElementById('messageContainer'), 'Please correct the errors in the form.');
          return;
        }

        // If all fields are valid, prepare to register the user
        // Convert email to lowercase and prepare avatar data
        const email = fields.email.value.toLowerCase().trim();
        const avatarUrl = fields.avatarUrl.value.trim() || 'https://i.pravatar.cc/200';
        const avatar = { url: avatarUrl, alt: `${fields.username.value}'s avatar` };

        const result = await registerUser(fields.username.value, fields.email.value, fields.password.value, avatar);

        // Show success or error message based on API response
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
