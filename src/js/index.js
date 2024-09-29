// Index.js

import { logoutAuth } from './auth/logoutAuth.js';
import { initialize } from './listeners/initialize.js';
import { search } from './ui/search/search.js';

/**
 * Entry point of the application that initializes key functionalities like user session management, search, and logout.
 *
 * @file Index.js
 * @description This script triggers the initialization of the application by setting up user session handling, logout functionality, and search capabilities. The `initialize` function is called after a 1-second delay to ensure proper loading, and `logoutAuth` and `search` are invoked immediately.
 */
setTimeout(initialize, 1000);
logoutAuth();
search();
