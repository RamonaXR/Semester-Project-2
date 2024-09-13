import { loginUser } from '../../API/loginUser';

export function getLoginData() {
  const loginForm = document.querySelector('#loginForm');
  console.log('This is loginForm', loginForm);

  if (!loginForm) return;

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = event.target.email.value.toLowerCase().trim();
    console.log(email);
    const password = event.target.password.value.trim();
    console.log(password);

    //This is a good place to add validation

    // if validation is not ok, return

    await loginUser(email, password);
  });
}
