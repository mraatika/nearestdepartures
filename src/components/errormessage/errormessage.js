import './errormessage.css';
import { resolveError } from './errormessageresolver';

/**
 * Component for displaying error messages
 * @constructs ErrorMessage
 * @param {Object} props
 * @param {string} props.message error message
 * @param {Function} props.onClick callback for element click event
 */
export default ({ error, onClick }) =>
  <div
    class={`error-message ${error ? '' : ' hidden'}`}
    onClick={onClick}
    tabIndex="0"
    role="alert"
  >
    <button class="close-button" aria-label="Sulje">x</button>
    {error && resolveError(error)}
  </div>;
