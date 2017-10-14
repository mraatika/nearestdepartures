/**
 * Messages for position errors
 * @private
 * @type {Object}
 */
const POSITION_ERROR_CODES = {
    1: 'Oikeuksia sijainnin hakuun ei annettu tai sijainnin haku on kytketty pois',
    2: 'Sijaintipalveluun ei saatu yhteyttä',
    3: 'Sijainnin haku kesti liian kauan',
};

/**
 * Position error type
 */
export const POSITION_ERROR = 'POSITION_ERROR';

/**
 * Format error message by type
 * @param {string} type
 * @param {object} error
 * @returns {string} Human readable error message
 */
 const formatError = (type, error) => (type === POSITION_ERROR
    ? `Sijainti ei ole saatavilla: ${POSITION_ERROR_CODES[error.code]}.`
    : error.message);

export default formatError;
