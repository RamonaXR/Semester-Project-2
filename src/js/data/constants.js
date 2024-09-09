// constants.js

export const API_BASE_URL = 'https://v2.api.noroff.dev';
export const API_AUTH = '/auth';
export const API_REGISTER = '/register';
export const API_LOGIN = '/login';
export const API_PROFILES = '/auction/profiles';
export const API_LISTINGS = '/auction/listings';

// API Key
export const API_KEY = 'be4ab55c-d5b0-44c3-8a11-67a7dafddd10';

// Validation
export const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
export const REG_PASSWORD = /^[a-zA-Z0-9!@#$%^&*()_+={}:;'",.<>?[\]-]+$/;

// Validation Messages
export const MSG_EMAIL_INVALID = 'Invalid email. Please use a @stud.noroff.no email and avoid illegal characters.';
export const MSG_PASSWORD_INVALID = 'Invalid password. Must be at least 8 characters long and contain no illegal characters.';

// Utility function to generate headers for API requests
export const getHeaders = (accessToken, apiKey = API_KEY) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'X-Noroff-API-Key': apiKey,
    'Content-Type': 'application/json',
  },
});
