import { authUpdate } from '../../auth/authUpdate';

export function logout() {
  localStorage.clear();
  authUpdate();
  window.location.href = '/';
}
