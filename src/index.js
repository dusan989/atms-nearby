import './app.scss';

import getLocation from './location/getLocation';
import showError from './error/showError';
import getATMs from './places/getATMs';
import showATMs from './showATMs';

// eslint-disable-next-line
require('file-loader?name=[name].[ext]!./index.html');

/**
 * Coordinates of the user.
 */
let coordinates = {};

/**
 * Get and handle ATMs
 *
 * @param query
 */
function getAndHandleATMs(query = null) {
  getATMs(coordinates, query)
    .then(results => showATMs(results, document.getElementById('atms-table')))
    .catch(error => showError(error));
}

// Ask user to allow geolocation.
document.getElementById('allow-geolocation').addEventListener('click', (event) => {
  event.preventDefault();

  document.getElementById('allow-geolocation-card').classList.add('hide');

  getLocation()
    .then((result) => {
      coordinates = result;
      getAndHandleATMs();
    })
    .catch(error => showError(error));

  return false;
});

// Filter multi-currency ATMs.
const multiCurrencyFilter = document.getElementById('multi-currency-filter');
multiCurrencyFilter.addEventListener('change', () => {
  if (multiCurrencyFilter.checked) {
    getAndHandleATMs('Telenor Bank ATM');
  } else {
    getAndHandleATMs();
  }
});
