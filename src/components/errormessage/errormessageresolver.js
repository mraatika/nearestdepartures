/** @module ErrorMessageResolver */

import ExternalLink from '../externallink';
import { NetworkError } from '../../utils/utils';

/**
 * Link address to printable time tables
 * @private
 * @type {string}
 */
const timetableLink = 'https://www.hsl.fi/reitit-ja-aikataulut/tulostettavat-aikataulut/';

/**
 * Resolves the correct child component for ErrorMessage based on error's type
 * @param {Error} error
 * @returns {Component|String}
 */
export const resolveError = error =>
  error instanceof NetworkError
    ? <span class="error-message-content">
       {error.message} Tulostettavat aikataulut löydät <ExternalLink href={timetableLink}><strong>täältä</strong></ExternalLink>.
      </span>
    : error.message;
