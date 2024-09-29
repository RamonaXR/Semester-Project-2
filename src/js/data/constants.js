/**
 * @constant {string} API_BASE_URL - The base URL for the API endpoints.
 * @constant {string} API_AUTH - The endpoint for authentication-related actions.
 * @constant {string} API_REGISTER - The endpoint for registering a new user.
 * @constant {string} API_LOGIN - The endpoint for logging in a user.
 * @constant {string} API_PROFILES - The endpoint for accessing auction profiles.
 * @constant {string} API_LISTINGS - The endpoint for accessing auction listings.
 */

/**
 * @constant {string} API_KEY - The API key used for authorization with the Noroff API.
 */

/**
 * @constant {RegExp} REG_EMAIL - A regular expression for validating emails from the @stud.noroff.no domain.
 */

/**
 * @constant {RegExp} REG_PASSWORD - A regular expression for validating passwords, ensuring allowed characters are used.
 */

/**
 * @constant {string} MSG_EMAIL_INVALID - A message shown when an invalid email format is provided.
 * @constant {string} MSG_PASSWORD_INVALID - A message shown when a password does not meet validation criteria.
 */
export const API_BASE_URL = 'https://v2.api.noroff.dev';
export const API_AUTH = '/auth';
export const API_REGISTER = '/register';
export const API_LOGIN = '/login';
export const API_PROFILES = '/auction/profiles';
export const API_LISTINGS = '/auction/listings';

// API Key
export const API_KEY = '882f567c-c6e8-4cfd-85f6-9468e4c28e4a';

// Validation
export const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
export const REG_PASSWORD = /^[a-zA-Z0-9!@#$%^&*()_+={}:;'",.<>?[\]-]+$/;

// Validation Messages
export const MSG_EMAIL_INVALID = 'Invalid email. Please use a @stud.noroff.no email and avoid illegal characters.';
export const MSG_PASSWORD_INVALID = 'Invalid password. Must be at least 8 characters long and contain no illegal characters.';
