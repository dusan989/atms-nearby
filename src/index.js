import './app.scss';

import getLocation from './location/getLocation';
import showError from './error/showError';

// eslint-disable-next-line
require('file-loader?name=[name].[ext]!./index.html');

// Ask user to allow geolocation.
document.getElementById('allow-geolocation').addEventListener('click', (event) => {
  event.preventDefault();

  document.getElementById('allow-geolocation-card').classList.add('hide');

  getLocation()
    .then(coordinates => console.log(coordinates))
    .catch(error => showError(error));

  return false;
});
