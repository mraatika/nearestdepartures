/**
 * Messages for position errors
 * @type {Object}
 */
const POSITION_ERROR_CODES = {
    1: 'Permission not granted to use location',
    2: 'Location provider service not available',
    3: 'Locating took too long',
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
export default function formatError(type, error) {
    if (type === POSITION_ERROR) {
        return `Location unavailable: ${POSITION_ERROR_CODES[error.code]}.`;
    }
}