// constants.js

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
