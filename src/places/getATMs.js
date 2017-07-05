/**
 * Cache responses from Google Places API.
 * Key should be JSON encoded request object.
 *
 * @type {Object}
 */
const cache = {};

/**
 * Calculate distance in meters between thow points on map.
 *
 * @param {LatLng} latLngA
 * @param {LatLng} latLngB
 * @return float
 */
function calculateDistance(latLngA, latLngB) {
  return google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
}

/**
 * Get mini map URL
 *
 * @param {LatLng} center
 * @return string
 */
function getMiniMap(center) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat()},${center.lng()}&zoom=14&size=250x150&markers=color:red|${center.lat()},${center.lng()}&key=${GOOGLE_API_KEY}`;
}

/**
 * Handle response from Google Places API.
 *
 * @param resolve
 * @param reject
 * @return {Function}
 */
function handleResponse(location, resolve, reject, cacheKey) {
  return (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const places = results.map(result => ({
        miniMap: getMiniMap(result.geometry.location),
        name: result.name,
        distance: calculateDistance(location, result.geometry.location),
      }));
      cache[cacheKey] = places;
      resolve(places);
    } else {
      reject(status);
    }
  };
}

/**
 * Get list of ATMs for the given location and text if given.
 *
 * @param float  latitude
 * @param float  longitude
 * @param string query
 * @return {Promise}
 */
export default function getATMs({ latitude, longitude }, query = null) {
  const location = new google.maps.LatLng(latitude, longitude);
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  return new Promise((resolve, reject) => {
    const request = {
      location,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: ['atm'],
    };
    if (query) {
      request.query = query;
    }

    const cacheKey = JSON.stringify(request);
    if (cache[cacheKey]) {
      resolve(cache[cacheKey]);
    } else if (query) {
      service.textSearch(request, handleResponse(location, resolve, reject, cacheKey));
    } else {
      service.nearbySearch(request, handleResponse(location, resolve, reject, cacheKey));
    }
  });
}
