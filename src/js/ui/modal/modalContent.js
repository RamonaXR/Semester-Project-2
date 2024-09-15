import { loadFromStorage } from '../../localStorage/loadFromStorage';

export function login() {
  const content = `
  <form id="loginForm" class="bg-white p-6 shadow-lg">
  <h2 class="text-lg font-bold mb-4 text-dark text-center">Login to BidderShop</h2>
  
  <label for="email" class="block mb-2">Email:</label>
  <input type="email" id="email" class="border p-2 w-full mb-4" required />
  <small id="emailError" class="text-red-500 hidden"></small>
  
  <label for="password" class="block mb-2">Password:</label>
  <input type="password" id="password" class="border p-2 w-full mb-4" required />
  <small id="passwordError" class="text-red-500 hidden"></small> 
  
  <div id="messageContainer" class="hidden"></div>
  
  <button type="submit" class="bg-primary text-white px-4 py-2 mt-4 rounded">Login</button>
  </form>
  `;
  return content;
}

export async function profile() {
  const session = await loadFromStorage('userSession');
  console.log(session);
  const content = `
  <div class="bg-white p-6 shadow-lg">
    <h2 class="text-lg font-bold mb-4 text-dark text-center">${session.name}</h2>
  
    <div class="flex flex-col items-center mb-4">
      <img src="${session.avatar.url}" alt="${session.name}'s avatar" class="h-24 w-24 rounded-full object-cover mb-2" />
      <button class="bg-primary text-white px-4 py-1 rounded">Change avatar</button>
    </div>
  
    <p class="text-center mb-4">Current credits: ${session.credits}</p>
  
    <div class="flex justify-center">
      <button id="logoutButton" class="bg-primary text-white px-4 py-2 rounded">Log Out</button>
    </div>
  </div>
  `;
  return content;
}

export function register() {
  const defaultAvatarUrl = 'https://i.pravatar.cc/200';
  const content = `
  <form id="registrationForm" class="bg-white p-6 shadow-lg">
    <h2 class="text-lg font-bold mb-4 text-dark text-center">Register for BidderShop</h2>
  
    <div class="flex flex-col items-center mb-4">
      <label for="avatarUrl" class="block mb-2">Upload Avatar:</label>
      <img id="avatarPreview" src="${defaultAvatarUrl}" alt="Avatar Preview" class="h-24 w-24 rounded-full object-cover mb-2" />
      <input type="url" id="avatarUrl" class="border p-2 w-full mb-2" placeholder="${defaultAvatarUrl}" />
      <button type="button" id="changeAvatarButton" class="bg-primary text-white px-4 py-1 rounded">Change Avatar</button>
    </div>
  
    <label for="username" class="block mb-2">Username:</label>
    <input type="text" id="username" class="border p-2 w-full mb-4" required placeholder="Enter your username" />
    <small id="usernameError" class="text-red-500 hidden"></small>
  
    <label for="email" class="block mb-2">Email:</label>
    <input type="email" id="email" class="border p-2 w-full mb-4" required placeholder="Enter your email" />
    <small id="emailError" class="text-red-500 hidden"></small>
  
    <label for="password" class="block mb-2">Password:</label>
    <input type="password" id="password" class="border p-2 w-full mb-4" required placeholder="Enter your password" />
    <small id="passwordError" class="text-red-500 hidden"></small>
  
    <div id="messageContainer" class="hidden"></div> 
  
    <div class="flex justify-center">
      <button type="submit" class="bg-primary text-white px-4 py-2 mt-4 rounded">Register</button>
    </div>
  </form>
  `;
  return content;
}
