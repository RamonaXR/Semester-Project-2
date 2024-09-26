import { loadFromStorage } from '../../localStorage/loadFromStorage';

export function login() {
  const content = `
  <section>
  <form id="loginForm" class="bg-white p-6 shadow-lg" aria-labelledby="loginTitle">
    <h2 id="loginTitle" class="text-lg font-bold mb-4 text-dark text-center">Login to BidderShop</h2>
    
    <label for="email" class="block mb-2">Email:</label>
    <input type="email" id="email" class="border p-2 w-full mb-4" required />
    <small id="emailError" class="text-red-500 hidden"></small>
    
    <label for="password" class="block mb-2">Password:</label>
    <input type="password" id="password" class="border p-2 w-full mb-4" required />
    <small id="passwordError" class="text-red-500 hidden"></small> 
    
    <div id="messageContainer" class="hidden" aria-live="polite"></div> 
    
    <div class="flex justify-center">
      <button type="submit" class="bg-primary text-white px-4 py-2 mt-4 rounded">Login</button>
    </div>
  </form>
</section>
  `;
  return content;
}

export async function profile() {
  const session = await loadFromStorage('userSession');
  const defaultAvatarUrl = 'https://i.pravatar.cc/200';
  const content = `
  <section>
  <div class="bg-white p-6 shadow-lg">
    <div id="messageContainer" class="mb-4" aria-live="polite"></div> 
    <h2 class="text-lg font-bold mb-4 text-dark text-center">${session.name}</h2>
    
    <form id="updateAvatar" class="flex flex-col items-center mb-4">
      <img id="avatarPreview" src="${session.avatar.url}" alt="${session.name}'s avatar" class="h-24 w-24 rounded-full object-cover mb-2" />
      <p class="text-center mb-4">Your avatar URL:</p>
      <input type="text" id="avatarUrl" class="border px-3 py-1 mb-2 rounded w-full" placeholder="${defaultAvatarUrl}" />
      <button type="submit" id="changeAvatarButton" class="bg-primary text-white px-4 py-1 rounded">Change avatar</button>
    </form>
    
    <p class="text-center mb-4">Current credits: ${session.credits}</p>
    
    <div class="flex justify-center">
      <button id="logoutButton" class="bg-primary text-white px-4 py-2 rounded">Log Out</button>
    </div>
  </div>
</section>
  `;

  return content;
}

export function register() {
  const defaultAvatarUrl = 'https://i.pravatar.cc/200';
  const content = `
  <section>
  <form id="registrationForm" class="bg-white p-6 shadow-lg" aria-labelledby="registerTitle">
    <h2 id="registerTitle" class="text-lg font-bold mb-4 text-dark text-center">Register for BidderShop</h2>

    <div class="flex flex-col items-center mb-4">
      <img id="avatarPreview" src="${defaultAvatarUrl}" alt="Avatar Preview" class="h-24 w-24 rounded-full object-cover mb-2" />
      <p class="text-center mb-4">Your avatar URL:</p>
      <input type="url" id="avatarUrl" class="border p-2 w-full mb-2" placeholder="${defaultAvatarUrl}" />
      <button type="button" id="changeAvatarButton" class="bg-primary text-white px-4 py-1 rounded">Change Avatar</button>
    </div>

    <label for="username" class="block mb-2">Username:</label>
    <input type="text" id="username" class="border p-2 w-full mb-4" required placeholder="Enter your username" />
    <small id="usernameError" class="text-red-500 hidden"></small> 

    <label for="email" class="block mb-2">Email:</label>
    <input type="email" id="email" class="border p-2 w-full mb-4" required placeholder="email@stud.noroff.no" />
    <small id="emailError" class="text-red-950 hidden"></small> 

    <label for="password" class="block mb-2">Password:</label>
    <input type="password" id="password" class="border p-2 w-full mb-4" required placeholder="Minimum 8 characters" />
    <small id="passwordError" class="text-red-500 hidden"></small>

    <div id="messageContainer" class="hidden" aria-live="polite"></div> 

    <div class="flex justify-center">
      <button type="submit" class="bg-primary text-white px-4 py-2 mt-4 rounded">Register</button>
    </div>
  </form>
</section>
  `;
  return content;
}

export function listingModalContent(listing) {
  // Placeholder modal content until implementing the actual modal
  return `<div>Listing details for: ${listing.title}</div>`;
}
