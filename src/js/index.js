import './ui/modal/registerModal.js';
import './ui/modal/loginModal.js';
import './ui/modal/profileModal.js';
import { getProfile } from './API/getProfile.js';
import { authUpdate } from './auth/authUpdate.js';
import { logoutAuth } from './auth/logoutAuth.js';
//import { updateUserUI } from './ui/user/updateUserUi.js';

authUpdate();
logoutAuth();
getProfile();
//updateUserUI();
