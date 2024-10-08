/**
 * Starts a countdown timer and updates the provided HTML element with the time remaining until the specified end time.
 *
 * @function startCountdown
 * @param {string|Date} endTime - The end time for the countdown (in a valid Date format).
 * @param {HTMLElement} countdownElement - The HTML element where the countdown will be displayed.
 * @description This function calculates the remaining time until `endTime` and updates the `countdownElement` every second.
 *              It displays "Ended" when the countdown is over and adjusts the text color based on the remaining time.
 */
export function startCountdown(endTime, countdownElement) {
  const endDate = new Date(endTime).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
      // Display "Ended" if the time has passed
      countdownElement.textContent = 'Ended';
      countdownElement.classList.add('text-red-600');
      countdownElement.classList.remove('text-green-800');
    } else {
      // Calculate time left
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left`;

      // Change text color: green if more than a day remains, red if less than a day
      if (distance < 24 * 60 * 60 * 1000) {
        countdownElement.classList.add('text-red-600');
        countdownElement.classList.remove('text-green-800');
      } else {
        countdownElement.classList.add('text-green-800');
        countdownElement.classList.remove('text-red-600');
      }
    }
  }

  updateCountdown(); // Run the countdown once immediately
  const intervalId = setInterval(updateCountdown, 1000);
}
