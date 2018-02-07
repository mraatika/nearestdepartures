/** @module Constants */

/**
 * Vehicle types
 * @type {Object}
 */
export const VEHICLE_TYPE = {
  BUS: 'BUS',
  TRAM: 'TRAM',
  RAIL: 'RAIL',
  SUBWAY: 'SUBWAY',
  FERRY: 'FERRY',
};

/**
 * Vehicle type ranslations from english to finnish
 * @type {Object}
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
 * @type {string}
 */
export const LOCATION_MAGIC_WORD = 'oma sijainti';

/**
 * Default range filter value
 * @type {number}
 */
export const DEFAULT_RANGE = 400;

/**
 * Minimum range value
 * @type {number}
 */
export const MIN_RANGE = 100;
/**
 * Maximum range value
 * @type {number}
 */
export const MAX_RANGE = 2000;
/**
 * Range change step
 * @type {number}
 */
export const RANGE_STEP = 100;

/**
 * Max amount of address suggestions to display
 * @type {number}
 */
export const MAX_ADDRESS_SUGGESTIONS = 10;

/**
 * Interval between departure update in ms
 * @type {number}
 */
export const BATCH_INTERVAL = 30 * 1000;

/**
 * Municipalities that will appear first in the address search suggestions
 * @type {string[]}
 */
export const PREFERRED_MUNICIPALITIES = [
  'Helsinki',
  'Espoo',
  'Vantaa',
  'Kauniainen',
  'Kerava',
  'Sipoo',
  'Kirkkonummi'
];
