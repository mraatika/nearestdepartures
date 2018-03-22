import './errormessage.css';
import Component from 'inferno-component';
import { resolveError } from './errormessageresolver';
/**
 * Component for displaying error messages
 * @constructs ErrorMessage
 * @param {Object} props
 * @param {string} props.message error message
 * @param {Function} props.onClick callback for element click event
 */
class ErrorMessage extends Component {
  componentDidMount() {
    this.container.focus();
  }

  render({ error, onClick }) {
    return (
      <div
        class={`error-message ${error ? '' : ' hidden'}`}
        onClick={onClick}
        tabIndex="0"
        ref={e => this.container = e}
        role="alert"
      >
        <button class="close-button" aria-label="Sulje">x</button>
        {error && resolveError(error)}
      </div>
    );
  }
}

export default ErrorMessage;
