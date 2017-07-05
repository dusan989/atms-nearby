import errorCodes from './errorCodes';

/**
 * Success callback for `getCurrentPosition` method.
 * Returns a function that resolves promise with coordinates object (latitude and longitude).
 *
 * @param resolve
 * @return Function
 */
const handleSuccess = resolve => ((position) => {
  resolve({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  });
});

/**
 * Error callback for `getCurrentPosition` method.
 * Returns a function that rejects promise with appropriate error code.
 *
 * @param reject
 * @return Function
 */
const handleError = reject => ((error) => {
  let code;

  switch (error.code) {
    case 1:
      code = errorCodes.PERMISSION_DENIED;
      break;
    case 2:
      code = errorCodes.POSITION_UNAVAILABLE;
      break;
    case 3:
      code = errorCodes.TIMEOUT;
      break;
    default:
      code = errorCodes.POSITION_UNAVAILABLE;
  }

  reject(code);
});

/**
 * Get location of the user using geolocation API.
 *
 * @return {Promise}
 */
export default function getLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(handleSuccess(resolve), handleError(reject), {
        enableHighAccuracy: true,
      });
    } else {
      reject(errorCodes.GEOLOCATION_NOT_AVAILABLE);
    }
  });
}
