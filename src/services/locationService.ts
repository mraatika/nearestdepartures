import { PositionError } from '@/util/error.utils';

/**
 * Options for getCurrentPosition
 */
const POSITIONING_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 1 * 60 * 1000, // 1 min,
};

let watcherId: number | null;

/**
 * Promise wrapper for geolocation.getCurrentPosition
 */
async function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    watcherId = navigator.geolocation.watchPosition(
      (position) => {
        stopLocating();
        resolve(position);
      },
      reject,
      POSITIONING_OPTIONS,
    );
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
 */
export async function findGPSLocation() {
  if (!navigator.geolocation) {
    throw new PositionError('Selain ei tue paikannusta');
  }

  if (!watcherId) {
    try {
      const position = await getCurrentPosition();
      return position.coords;
    } catch (e) {
      // stop locating when there is an error to clear the current
      // watcher and the watcherId
      stopLocating();
      throw PositionError.from(e as GeolocationPositionError);
    }
  }

  throw new Error('Sijainninhaku on jo käynnissä');
}
