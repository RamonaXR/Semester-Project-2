import { logoutAuth } from './auth/logoutAuth.js';
import { initialize } from './listeners/initialize.js';
import './ui/modal/modalContent.js';
//import { updateUserUI } from './ui/user/updateUserUi.js';

setTimeout(initialize, 1000);
logoutAuth();
