import messages from './messages';

let hideError;
let errorCard;
let errorMessage;

/**
 * Show error message for the given code.
 *
 * @param {string} code
 */
export default function showError(code) {
  if (!errorCard) {
    errorCard = document.getElementById('error-card');
  }
  if (!errorMessage) {
    errorMessage = document.getElementById('error-message');
  }

  errorCard.classList.remove('hide');
  errorMessage.innerText = (messages[code]) ? messages[code] : messages.DEFAULT;

  if (hideError) {
    clearTimeout(hideError);
  }

  hideError = setTimeout(() => {
    errorCard.classList.add('hide');
    errorMessage.innerText = '';
  }, 10000);
}
