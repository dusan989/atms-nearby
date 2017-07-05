import './app.scss';

import getLocation from './location/getLocation';

// eslint-disable-next-line
require('file-loader?name=[name].[ext]!./index.html');

getLocation()
  .then(coordinates => console.log(coordinates))
  .catch(error => console.error(error));
