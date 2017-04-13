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
 * Max amount of address suggestions to display
 * @type {number}
 */
export const MAX_ADDRESS_SUGGESTIONS = 10;

export const BATCH_INTERVAL = 30 * 1000;