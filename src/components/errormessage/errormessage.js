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
    class={`error-message position-relative space-s text-center color-alert bg-light-red ${error ? '' : ' hidden'}`}
    onClick={onClick}
    tabIndex="0"
    role="alert"
    aria-atomic="true"
  >
    {error && resolveError(error)}
    <button class="close-button position-absolute bold text-l" aria-label="Sulje">x</button>
  </div>;
