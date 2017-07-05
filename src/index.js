import './app.scss';

import getLocation from './location/getLocation';
import showError from './error/showError';
import getATMs from './places/getATMs';
import showATMs from './showATMs';

// eslint-disable-next-line
require('file-loader?name=[name].[ext]!./index.html');

// Ask user to allow geolocation.
document.getElementById('allow-geolocation').addEventListener('click', (event) => {
  event.preventDefault();

  document.getElementById('allow-geolocation-card').classList.add('hide');

  getLocation()
    .then((coordinates) => {
      getATMs(coordinates)
        .then(results => showATMs(results, document.getElementById('atms-table')))
        .catch(error => showError(error));
    })
    .catch(error => showError(error));

  return false;
});
