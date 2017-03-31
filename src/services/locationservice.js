/** @module LocationService */

/**
 * Options for getCurrentPosition
 * @type {Object}
 */
const POSITION_OPTIONS = {
    // use gps
    enableHighAccuracy: true,
    // time out in one minute
    timeout: 1 * 60 * 1000
};

/**
 * Promise wrapper for geolocation.getCurrentPosition
 * @private
 * @async
 * @returns {Promise}
 */
async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, POSITION_OPTIONS);
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