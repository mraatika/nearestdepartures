import spinner from '../public/spinner.svg';

/**
 * Overlay component with spinner image
 * @constructs {LoadingOverlay}
 * @param {Object} props
 * @param {boolean} props.show
 * @returns {LoadingOverlay}
 */
export default ({ show }) => (
    <div class="loading-overlay" style={{ display: show ? 'block' : 'none' }} role="dialog" aria-label="Waiting" aria-busy={show}>
        <img class="spinner" src={spinner} alt="spinner" />
    </div>
);