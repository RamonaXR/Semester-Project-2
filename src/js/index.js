// Index.js

import { logoutAuth } from './auth/logoutAuth.js';
import { initialize } from './listeners/initialize.js';
import { search } from './ui/search/search.js';

setTimeout(initialize, 1000);
logoutAuth();
search();
