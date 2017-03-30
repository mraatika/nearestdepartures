/**
 * Component for displaying error messages
 * @param {Object} props
 * @param {string} props.message error message
 * @param {Function} props.onClick callback for element click event
 */
export default ({ message, onClick }) => (
    <div class="alert" style={{ display: message ? 'block' : 'none' }} onClick={onClick}>
        <button class="close-button" aria-label="Close">x</button>
        { message }
    </div>
);