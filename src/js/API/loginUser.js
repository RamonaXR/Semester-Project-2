import { API_AUTH, API_BASE_URL, API_LOGIN } from '../data/constants';
import { saveToStorage } from '../localStorage/saveToStorage';
import { fetchData } from './fetchData';

// Code coming
export async function loginUser(email, password) {
  if (!email || !password) {
    console.error('Missing email and password');
    return;
  }

  try {
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    };
    const response = await fetchData(`${API_BASE_URL}${API_AUTH}${API_LOGIN}`, options);
    console.log('response', response);
    if (response.data) {
      const data = await response.data;
      const { accessToken, ...profile } = data;
      console.log(accessToken, profile);
      saveToStorage('accessToken', accessToken);
      saveToStorage('userSession', profile);
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error logging in', error);
  }
}
