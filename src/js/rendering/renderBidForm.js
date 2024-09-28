export function renderBidForm() {
  const form = document.createElement('form');
  form.id = 'bidForm';
  form.className = 'flex flex-col items-center mt-4';

  // Label
  const label = document.createElement('label');
  label.setAttribute('for', 'bidAmount');
  label.className = 'block text-center';
  label.textContent = 'Amount:';
  form.appendChild(label);

  // Input
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'bidAmount';
  input.className = 'border p-2 mb-4 w-1/2 text-center';
  input.min = '10';
  input.value = '100';
  input.required = true;
  form.appendChild(input);

  // Error message (hidden by default)
  const errorMessage = document.createElement('small');
  errorMessage.id = 'bidAmountError';
  errorMessage.className = 'text-red-500 hidden p-2';
  form.appendChild(errorMessage);

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'bg-primary text-white px-4 py-2 rounded';
  submitButton.textContent = 'Bid';
  form.appendChild(submitButton);

  return form;
}

/*export function renderBidForm(listingId) {
  return `
    <form id="bidForm" class="flex flex-col items-center mt-4">
      <label for="bidAmount" class="block text-center">Amount:</label>
      <input type="number" id="bidAmount" class="border p-2 mb-4 w-1/2 text-center" min="10" value="100" required />
      <small id="bidAmountError" class="text-red-500 hidden"></small>
      <button type="submit" class="bg-primary text-white px-4 py-2 rounded">Bid</button>
    </form>
  `;
}*/
