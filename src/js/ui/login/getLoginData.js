import { loginUser } from '../../API/loginUser';
import { validateField } from '../../utils/validation/validateField';
import { validationFeedback } from '../../utils/validation/validationFeedback';
import { errorMessage } from '../messages/errorMessage';
import { REG_EMAIL, MSG_EMAIL_INVALID, MSG_PASSWORD_INVALID } from '../../data/constants';

/**
 * Retrieves login data from the login form, validates user input, and handles the login process.
 *
 * @function getLoginData
 * @description This function attaches event listeners to the login form fields to validate input in real-time and upon form submission.
 *              It ensures that the email and password fields follow the specified validation rules, and triggers the login process via the `loginUser` function.
 *              In case of validation errors or failed login attempts, appropriate feedback is displayed to the user.
 *
 * @throws Will log an error and display an error message if the login process fails due to a network issue or unexpected error.
 */
export function getLoginData() {
  const loginForm = document.querySelector('#loginForm');

  if (!loginForm) return;

  const fields = {
    email: loginForm.querySelector('#email'),
    password: loginForm.querySelector('#password'),
  };

  const errorElements = {
    email: loginForm.querySelector('#emailError'),
    password: loginForm.querySelector('#passwordError'),
  };

  const validationRules = {
    email: { required: true, pattern: REG_EMAIL, errorMessage: MSG_EMAIL_INVALID },
    password: { required: true, minLength: 8, errorMessage: MSG_PASSWORD_INVALID },
  };

  Object.keys(fields).forEach((fieldName) => {
    fields[fieldName].addEventListener('input', () => {
      const error = validateField(fieldName, fields[fieldName].value, validationRules);
      validationFeedback(error, errorElements[fieldName]);
    });
  });

  loginForm.addEventListener('submit', async (event) => {
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

    const email = fields.email.value.toLowerCase().trim();
    const password = fields.password.value.trim();

    try {
      const result = await loginUser(email, password);

      if (result && !result.success) {
        errorMessage(document.getElementById('messageContainer'), result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      errorMessage(document.getElementById('messageContainer'), 'An unexpected error occurred. Please try again later.');
    }
  });
}
