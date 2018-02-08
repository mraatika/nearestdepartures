import './errormessage.css';

/**
 * Component for displaying error messages
 * @constructs ErrorMessage
 * @param {Object} props
 * @param {string} props.message error message
 * @param {Function} props.onClick callback for element click event
 */
export default ({ message, onClick }) => (
  <div class={`error-message ${message ? '' : ' hidden'}`} onClick={onClick}>
    <button class="close-button" aria-label="Sulje">x</button>
    { message }
  </div>
);
