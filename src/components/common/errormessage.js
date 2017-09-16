/**
 * Component for displaying error messages
 * @constructs ErrorMessage
 * @param {Object} props
 * @param {string} props.message error message
 * @param {Function} props.onClick callback for element click event
 * @returns {ErrorMessage}
 */
export default ({ message, onClick }) => (
    <div class={'alert'} style={{ display: message ? 'block' : 'none' }} onClick={onClick}>
        <button class="close-button" aria-label="Sulje">x</button>
        { message }
    </div>
);