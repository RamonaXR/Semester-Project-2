import { loadFromStorage } from '../../localStorage/loadFromStorage';
import { isUserLoggedIn } from '../../localStorage/isUserLoggedIn';
import { renderBids } from '../../rendering/renderBids';
import { renderBidForm } from '../../rendering/renderBidForm';
import { galleryModal } from './galleryModal';
import { startCountdown } from '../../data/startCountdown';
import { logout } from '../logout/logout';
import placeholder from '/images/placeholder.png';

/**
 * Creates and returns the content for the login form modal.
 *
 * @function login
 * @returns {HTMLElement} The section element containing the login form.
 * @description This function builds a form for logging in, including fields for email and password, validation error messages,
 *              and a submit button. It returns the form wrapped inside a section element.
 */
export function login() {
  const section = document.createElement('section');

  const form = document.createElement('form');
  form.id = 'loginForm';
  form.className = 'bg-white p-6 shadow-lg';
  form.setAttribute('aria-labelledby', 'loginTitle');

  const title = document.createElement('h2');
  title.id = 'loginTitle';
  title.className = 'text-lg font-bold mb-4 text-dark text-center';
  title.textContent = 'Login to BidderShop';

  // Email label and input
  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'email');
  emailLabel.className = 'block mb-2';
  emailLabel.textContent = 'Email:';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.className = 'border p-2 w-full mb-4';
  emailInput.required = true;

  const emailError = document.createElement('small');
  emailError.id = 'emailError';
  emailError.className = 'text-red-600 hidden';

  // Password label and input
  const passwordLabel = document.createElement('label');
  passwordLabel.setAttribute('for', 'password');
  passwordLabel.className = 'block mb-2';
  passwordLabel.textContent = 'Password:';

  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.className = 'border p-2 w-full mb-4';
  passwordInput.required = true;

  const passwordError = document.createElement('small');
  passwordError.id = 'passwordError';
  passwordError.className = 'text-red-600 hidden';

  // Message container
  const messageContainer = document.createElement('div');
  messageContainer.id = 'messageContainer';
  messageContainer.className = 'hidden';
  messageContainer.setAttribute('aria-live', 'polite');

  // Submit button
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'flex justify-center';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'bg-primary text-white px-4 py-2 mt-4 rounded';
  submitButton.textContent = 'Login';

  buttonDiv.appendChild(submitButton);

  // Append all elements to the form
  form.append(title, emailLabel, emailInput, emailError, passwordLabel, passwordInput, passwordError, messageContainer, buttonDiv);

  section.appendChild(form);

  return section;
}

/**
 * Creates and returns the content for the profile modal, including user details and an avatar update form.
 *
 * @async
 * @function profile
 * @returns {Promise<HTMLElement>} A promise that resolves to the section element containing the profile modal content.
 * @description This function generates the user's profile section, displaying their avatar, name, credits, and a form to update the avatar.
 *              It also includes a logout button.
 */
export async function profile() {
  const session = await loadFromStorage('userSession');
  const defaultAvatarUrl = 'https://i.pravatar.cc/200';

  const section = document.createElement('section');

  const container = document.createElement('div');
  container.className = 'bg-white p-6 shadow-lg';

  const messageContainer = document.createElement('div');
  messageContainer.id = 'messageContainer';
  messageContainer.className = 'mb-4';
  messageContainer.setAttribute('aria-live', 'polite');

  const title = document.createElement('h2');
  title.className = 'text-lg font-bold mb-4 text-dark text-center';
  title.textContent = session.name;

  // Avatar update form
  const form = document.createElement('form');
  form.id = 'updateAvatar';
  form.className = 'flex flex-col items-center mb-4';

  const avatarPreview = document.createElement('img');
  avatarPreview.id = 'avatarPreview';
  avatarPreview.src = session.avatar.url;
  avatarPreview.alt = `${session.name}'s avatar`;
  avatarPreview.className = 'h-24 w-24 rounded-full object-cover mb-2';

  const avatarText = document.createElement('p');
  avatarText.className = 'text-center mb-4';
  avatarText.textContent = 'Your avatar URL:';

  const avatarInput = document.createElement('input');
  avatarInput.type = 'text';
  avatarInput.id = 'avatarUrl';
  avatarInput.className = 'border px-3 py-1 mb-2 rounded w-full';
  avatarInput.placeholder = defaultAvatarUrl;

  const avatarButton = document.createElement('button');
  avatarButton.type = 'submit';
  avatarButton.id = 'changeAvatarButton';
  avatarButton.className = 'bg-primary text-white px-4 py-1 rounded';
  avatarButton.textContent = 'Change avatar';

  form.append(avatarPreview, avatarText, avatarInput, avatarButton);

  // Current credits
  const creditsText = document.createElement('p');
  creditsText.className = 'text-center mb-4';
  creditsText.textContent = `Current credits: ${session.credits}`;

  // Logout button
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'flex justify-center';

  const logoutButton = document.createElement('button');
  logoutButton.id = 'logoutButton2';
  logoutButton.className = 'bg-primary text-white px-4 py-2 rounded';
  logoutButton.textContent = 'Log Out';

  logoutButton.addEventListener('click', () => {
    logout();
  });

  buttonDiv.append(logoutButton);

  container.append(messageContainer, title, form, creditsText, buttonDiv);

  section.append(container);

  return section;
}

/**
 * Creates and returns the content for the registration form modal.
 *
 * @function register
 * @returns {HTMLElement} The section element containing the registration form.
 * @description This function builds a form for registering a new user, including fields for username, email, password, avatar,
 *              and validation error messages, with a submit button.
 */
export function register() {
  const defaultAvatarUrl = 'https://i.pravatar.cc/200';

  const section = document.createElement('section');

  const form = document.createElement('form');
  form.id = 'registrationForm';
  form.className = 'bg-white p-6 shadow-lg';
  form.setAttribute('aria-labelledby', 'registerTitle');

  const title = document.createElement('h2');
  title.id = 'registerTitle';
  title.className = 'text-lg font-bold mb-4 text-dark text-center';
  title.textContent = 'Register for BidderShop';

  // Avatar section
  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'flex flex-col items-center mb-4';

  const avatarPreview = document.createElement('img');
  avatarPreview.id = 'avatarPreview';
  avatarPreview.src = defaultAvatarUrl;
  avatarPreview.alt = 'Avatar Preview';
  avatarPreview.className = 'h-24 w-24 rounded-full object-cover mb-2';

  const avatarText = document.createElement('p');
  avatarText.className = 'text-center mb-4';
  avatarText.textContent = 'Your avatar URL:';

  const avatarInput = document.createElement('input');
  avatarInput.type = 'url';
  avatarInput.id = 'avatarUrl';
  avatarInput.className = 'border p-2 w-full mb-2';
  avatarInput.placeholder = defaultAvatarUrl;

  const avatarButton = document.createElement('button');
  avatarButton.type = 'button';
  avatarButton.id = 'changeAvatarButton';
  avatarButton.className = 'bg-primary text-white px-4 py-1 rounded';
  avatarButton.textContent = 'Change Avatar';

  avatarDiv.append(avatarPreview, avatarText, avatarInput, avatarButton);

  // Username
  const usernameLabel = document.createElement('label');
  usernameLabel.setAttribute('for', 'username');
  usernameLabel.className = 'block mb-2';
  usernameLabel.textContent = 'Username:';

  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.id = 'username';
  usernameInput.className = 'border p-2 w-full mb-4';
  usernameInput.required = true;
  usernameInput.placeholder = 'Enter your username';

  const usernameError = document.createElement('small');
  usernameError.id = 'usernameError';
  usernameError.className = 'text-red-600 hidden';

  // Email
  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'email');
  emailLabel.className = 'block mb-2';
  emailLabel.textContent = 'Email:';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.className = 'border p-2 w-full mb-4';
  emailInput.required = true;
  emailInput.placeholder = 'email@stud.noroff.no';

  const emailError = document.createElement('small');
  emailError.id = 'emailError';
  emailError.className = 'text-red-600 hidden';

  // Password
  const passwordLabel = document.createElement('label');
  passwordLabel.setAttribute('for', 'password');
  passwordLabel.className = 'block mb-2';
  passwordLabel.textContent = 'Password:';

  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.className = 'border p-2 w-full mb-4';
  passwordInput.required = true;
  passwordInput.placeholder = 'Minimum 8 characters';

  const passwordError = document.createElement('small');
  passwordError.id = 'passwordError';
  passwordError.className = 'text-red-600 hidden';

  // Message container
  const messageContainer = document.createElement('div');
  messageContainer.id = 'messageContainer';
  messageContainer.className = 'hidden';
  messageContainer.setAttribute('aria-live', 'polite');

  // Submit button
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'flex justify-center';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'bg-primary text-white px-4 py-2 mt-4 rounded';
  submitButton.textContent = 'Register';

  buttonDiv.append(submitButton);

  form.append(title, avatarDiv, usernameLabel, usernameInput, usernameError, emailLabel, emailInput, emailError, passwordLabel, passwordInput, passwordError, messageContainer, buttonDiv);

  section.append(form);

  return section;
}

/**
 * Creates and returns the content for the listing modal, displaying listing details and enabling bidding if applicable.
 *
 * @function listingModalContent
 * @param {Object} listing - The listing object containing details such as title, description, seller information, media, and bids.
 * @returns {HTMLElement} The element containing the listing modal content.
 * @description This function generates a modal displaying the details of a listing, including title, description, seller info, media, and bids.
 *              If the user is logged in and the listing hasn't ended, it includes the bid form. If the listing has ended, it shows an appropriate message.
 *              Users can also open a gallery modal by clicking on the listing's media.
 */
export function listingModalContent(listing) {
  const userLoggedIn = isUserLoggedIn();
  const hasEnded = new Date(listing.endsAt) < new Date(); // Check if the listing has ended

  const element = document.createElement('div');
  element.classList.add('listing-modal-content', 'bg-white', 'p-6', 'rounded-lg', 'w-full', 'max-w-lg', 'max-h-[80vh]', 'overflow-y-auto');

  const image = document.createElement('img');
  if (listing.media && listing.media.length > 0) {
    image.src = listing.media[0]?.url || placeholder;
    image.alt = listing.media[0]?.alt || listing.title;
  } else {
    image.src = placeholder;
    image.alt = listing.title;
  }
  image.classList.add('w-full', 'aspect-square', 'object-cover', 'mb-4');
  image.addEventListener('click', (e) => {
    e.stopPropagation();
    galleryModal(listing.media);
  });

  // Title
  const title = document.createElement('h2');
  title.classList.add('text-lg', 'font-bold', 'mb-4', 'text-dark', 'text-center');
  title.textContent = listing.title;

  // Seller Info
  const sellerInfo = document.createElement('div');
  sellerInfo.classList.add('flex', 'items-center', 'mb-4', 'text-sm');

  const sellerAvatar = document.createElement('img');
  if (listing.seller?.avatar?.url) {
    sellerAvatar.src = listing.seller.avatar.url;
    sellerAvatar.alt = listing.seller.name || 'Seller Avatar';
  } else {
    sellerAvatar.src = placeholder; // Fallback if no avatar is provided
    sellerAvatar.alt = 'Seller Avatar';
  }
  sellerAvatar.classList.add('w-8', 'h-8', 'rounded-full', 'mr-2');

  const sellerName = document.createElement('span');
  sellerName.textContent = listing.seller?.name || 'Unknown seller';

  sellerInfo.appendChild(sellerAvatar);
  sellerInfo.appendChild(sellerName);

  // Description
  const description = document.createElement('p');
  description.classList.add('mb-4', 'text-center');
  description.textContent = listing.description;

  // Ends At
  const endsAt = document.createElement('p');
  endsAt.classList.add('font-bold', 'text-sm', 'mb-4', 'mt-auto');
  endsAt.textContent = `Ends at: ${new Date(listing.endsAt).toLocaleString()}`;

  // Start dynamic countdown
  startCountdown(listing.endsAt, endsAt);

  element.append(image, title, sellerInfo, description, endsAt);

  // Render the bids section if user is logged in and the listing hasn't ended
  if (userLoggedIn && !hasEnded) {
    const bidsSection = document.createElement('div');
    bidsSection.setAttribute('id', 'bidsSection');

    const bidsList = renderBids(listing.bids);
    bidsSection.appendChild(bidsList);

    const bidsForm = renderBidForm(listing.id);
    bidsSection.appendChild(bidsForm);

    element.appendChild(bidsSection);
  } else if (hasEnded) {
    const endedMessage = document.createElement('p');
    endedMessage.classList.add('text-center', 'font-bold');
    endedMessage.textContent = 'This listing has ended. No more bids can be placed.';
    element.append(endedMessage);
  }

  // If the user is not logged in and the listing hasn't ended, show login prompt
  if (!userLoggedIn && !hasEnded) {
    const loginMessage = document.createElement('p');
    loginMessage.classList.add('text-center');
    loginMessage.textContent = 'Log in to view and place bids';
    element.append(loginMessage);
  }

  return element;
}
