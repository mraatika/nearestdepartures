/** @module Constants */

/**
 * Vehicle type ranslations from english to finnish
 */
export const VEHICLE_TYPE_TRANSLATIONS = {
  BUS: 'Bussi',
  TRAM: 'Raitiovaunu',
  RAIL: 'Juna',
  SUBWAY: 'Metro',
  FERRY: 'Lautta',
};

/**
 * If address is this word then search by location
 */
export const LOCATION_MAGIC_WORD = 'oma sijainti';

/**
 * Default range filter value
 */
export const DEFAULT_RANGE = 400;

/**
 * Minimum range value
 */
export const MIN_RANGE = 100;
/**
 * Maximum range value
 */
export const MAX_RANGE = 2000;
/**
 * Range change step
 */
export const RANGE_STEP = 100;

/**
 * Max amount of address suggestions to display
 */
export const MAX_ADDRESS_SUGGESTIONS = 10;

/**
 * Interval between departure update in ms
 */
export const BATCH_INTERVAL = 60 * 1000; // 60 sec

/**
 * Municipalities that will appear in the address search suggestions
 */
export const PREFERRED_MUNICIPALITIES = [
  'Helsinki',
  'Espoo',
  'Vantaa',
  'Kauniainen',
  'Kerava',
  'Sipoo',
  'Tuusula',
  'Siuntio',
  'Kirkkonummi',
];

type CoordinateArray = [lat: number, lon: number];
export const ADDRESS_BOUNDARIES: CoordinateArray[] = [
  [59.9548, 23.997],
  [60.6217, 25.6605],
];

/**
 * This is the focus point if user's own location is not available
 * The point is Rautatientori, Helsinki
 */
export const DEFAULT_FOCUS_POINT: CoordinateArray = [60.171419, 24.942541];

/**
 * Max departure time from now (in seconds)
 */
export const TIME_RANGE = 1 * 60 * 60; // 1h;

/**
 * Number of stoptimes per route to fetch
 */
export const NUMBER_OF_DEPARTURES_PER_ROUTE = 4;

/**
 * Max number of departures to fetch
 */
export const MAX_RESULTS = 1000;

/**
 * How many departures are shown on one page
 */
export const PAGE_SIZE = 25;
