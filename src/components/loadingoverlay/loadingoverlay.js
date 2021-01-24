import spinner from './spinner.svg';
import './loadingoverlay.css';

/**
 * Overlay component with spinner image
 * @constructs LoadingOverlay
 * @param {Object} props
 * @param {boolean} props.show
 * @returns {LoadingOverlay}
 */
export default ({ show }) => (
  <div
    class="loading-overlay fill-parent"
    style={{ display: show ? 'block' : 'none' }}
    role="dialog"
    aria-label="Odotetaan"
    aria-busy={show}
  >
    <img class="spinner" src={spinner} alt="spinner" width="120" height="120" />
  </div>
);
