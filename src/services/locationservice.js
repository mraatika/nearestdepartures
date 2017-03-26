/** @module LocationService */

/**
 * Promise wrapper for geolocation.getCurrentPosition
 * @private
 * @async
 * @returns {Promise}
 */
async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

/**
 * Find current position using geolocation api
 * @async
 * @returns {Promise}
 */
export default async function findGPSLocation() {
    if (!navigator.geolocation) throw new Error('Geolocation is not supported!');
    const position = await getCurrentPosition();
    return position.coords;
}