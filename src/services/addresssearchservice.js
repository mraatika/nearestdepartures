/**
 * Search for address/location coordinates
 * @async
 * @param {string} searchTerm
 * @param {number} maxResults
 * @returns {Object[]} An array of objects containing latitude, longitude and label
 */
export async function searchAddress(searchTerm, maxResults = 1) {
    const encoded = encodeURIComponent(searchTerm);
    const url = `https://api.digitransit.fi/geocoding/v1/search?text=${encoded}&size=${maxResults}&lang=fi&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Service responded with no ok');

    const data = await response.json();

    // throw an error if no results are found
    if (!data || !data.features.length) throw new Error(`Osoitetta tai paikkaa ei löytynyt hakusanalla ${searchTerm}`);

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