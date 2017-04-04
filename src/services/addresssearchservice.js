/**
 * Search for address/location coordinates
 * @async
 * @param {string} searchTerm
 * @returns {Object} An object containing latitude and longitude
 */
export async function searchAddress(searchTerm) {
    const encoded = encodeURIComponent(searchTerm);
    const response = await fetch(`https://api.digitransit.fi/geocoding/v1/search?text=${encoded}&size=1&lang=fi`);

    if (!response.ok) throw new Error('Service responded with no ok');

    const data = await response.json();
    if (!data || !data.features.length) throw new Error(`Location not found for ${searchTerm}`);

    if (data && data.features.length) {
        const { geometry, properties } = data.features[0];
        const [longitude, latitude] = geometry.coordinates;
        return { label: properties.label, location: { latitude, longitude } };
    }

    return null;
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
    const response = await fetch(`https://api.digitransit.fi/geocoding/v1/reverse?${queryParams}`);

    if (!response.ok) throw new Error('Osoitepalvelu palautti virheen');

    const data = await response.json();
    if (!data || !data.features.length) throw new Error('Osoitetta tai paikkaa ei löytynyt');

    if (data && data.features.length) {
        const { properties } = data.features[0];
        return properties.label;
    }

    return null;
}