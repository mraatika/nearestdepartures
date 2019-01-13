import formatError, { POSITION_ERROR } from '../utils/formaterror';
import { PositionError } from '../utils/errors';

/** @module LocationService */

/**
* Options for getCurrentPosition
* @private
* @type {Object}
*/
const POSITION_OPTIONS = {
  // use gps
  enableHighAccuracy: true,
  // time out in one minute
  timeout: 1 * 60 * 1000
};

/**
* Current watcher's id
* @private
* @type {number}
*/
let watcherId = null;

/**
* Create callback for watchPosition success
* @private
* @param {Function} resolve
* @returns {Function}
*/
function onLocationResult(resolve) {
  /**
  * Callback for watchPosition success resolves if
  * acquired location is precise enough
  * @param {Object} position object
  */
  return (position) => {
    stopLocating(watcherId);
    resolve(position);
  };
};

/**
* Promise wrapper for geolocation.getCurrentPosition
* @private
* @async
* @returns {Promise}
*/
async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    watcherId = navigator.geolocation.watchPosition(onLocationResult(resolve), reject, POSITION_OPTIONS);
  });
}

/**
* Cancel location search
*/
export function stopLocating() {
  if (watcherId) {
    navigator.geolocation.clearWatch(watcherId);
    watcherId = null;
  }
}

/**
* Find current position using geolocation api
* @async
* @returns {Promise}
*/
export async function findGPSLocation() {
  if (!navigator.geolocation) throw new PositionError('Selain ei tue paikannusta');

  if (!watcherId) {
    try {
      const position = await getCurrentPosition();
      return position.coords;
    } catch (e) {
      // stop locating when there is an error to clear the current
      // watcher and the watcherId
      stopLocating();
      throw new PositionError(formatError(POSITION_ERROR, e));
    }
  }

  throw new Error('Sijainninhaku on jo käynnissä');
}
