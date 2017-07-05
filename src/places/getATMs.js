/**
 * Calculate distance in meters between thow points on map.
 *
 * @param {LatLng} latLngA
 * @param {LatLng} latLngB
 * @return float
 */
function calculateDistance(latLngA, latLngB) {
  return google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
}

/**
 * Get mini map URL
 *
 * @param {LatLng} center
 * @return string
 */
function getMiniMap(center) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat()},${center.lng()}&zoom=15&size=250x250&markers=color:red|${center.lat()},${center.lng()}&key=${window.googleKey}`;
}

/**
 * Get list of ATMs for the given location.
 *
 * @param latitude
 * @param longitude
 * @return {Promise}
 */
export default function getATMs({ latitude, longitude }) {
  const location = new google.maps.LatLng(latitude, longitude);
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  return new Promise((resolve, reject) => {
    service.nearbySearch({
      location,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: ['atm'],
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const places = results.map((result) => ({
          miniMap: getMiniMap(result.geometry.location),
          name: result.name,
          distance: calculateDistance(location, result.geometry.location)
        }));
        resolve(places);
      } else {
        reject(status);
      }
    });
  });
}
