import './app.scss';

import getLocation from './location/getLocation';
import showError from './error/showError';

// eslint-disable-next-line
require('file-loader?name=[name].[ext]!./index.html');

getLocation()
  .then(coordinates => console.log(coordinates))
  .catch(error => showError(error));
