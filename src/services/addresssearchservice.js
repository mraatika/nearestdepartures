/** @module AddressSearchService */
import { NetworkError } from '../utils/errors';


/**
* Search for address/location coordinates
* @async
* @param {string} searchTerm
* @param {number} maxResults
* @returns {Object[]} An array of objects containing latitude, longitude and label
*/
export async function searchAddress(searchTerm, maxResults = 1) {
  const encoded = encodeURIComponent(searchTerm);
  const url = `${process.env.INFERNO_APP_SERVER_URL}/geocoding/v1/search?text=${encoded}&size=${maxResults}&lang=fi&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5`;
  let response;

  try {
    response = await fetch(url);
  } catch (e) {
    throw new NetworkError('Osoitteen haku epäonnistui: Palveluun ei saatu yhteyttä.');
  }

  if (!response.ok) {
    throw new Error('Osoitteen haku epäonnistui: Palvelu palautti virheen');
  }

  const data = await response.json();

  // throw an error if no results are found
  if (!data || !data.features.length) {
    throw new Error(`Osoitteen haku epäonnistui: Osoitetta tai paikkaa ei löytynyt hakusanalla ${searchTerm}`);
  }

  return data.features.map((feature) => {
    const { geometry, properties } = feature;
    const [longitude, latitude] = geometry.coordinates;
    return { ...properties, location: { latitude, longitude } };
  });
}

/**
* Search address for given coordinates
* @async
* @param {Object} location
* @param {number} location.latitude
* @param {number} location.longitude
* @returns {string} address
*/
export async function lookupAddress({ latitude, longitude }) {
  const queryParams = `point.lat=${encodeURIComponent(latitude)}&point.lon=${encodeURIComponent(longitude)}&size=1`;
  let response;

  try {
    response = await fetch(`${process.env.INFERNO_APP_SERVER_URL}/geocoding/v1/reverse?${queryParams}`);
  } catch (e) {
    throw new Error('Osoitteen haku epäonnistui: Palveluun ei saatu yhteyttä');
  }

  if (!response.ok) {
    throw new Error('Osoitteen haku epäonnistui: Osoitepalvelu palautti virheen');
  }

  const data = await response.json();

  if (!data || !data.features.length) {
    throw new Error('Osoitteen haku epäonnistui: Osoitetta tai paikkaa ei löytynyt');
  }

  return data.features[0].properties;
}
