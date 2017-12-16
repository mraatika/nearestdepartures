import { linkEvent } from 'inferno';

/**
 * Creates a callback for keypress event
 * @private
 * @param {Function} callback
 * @param {string} propName
 * @return {Function}
 */
const keyPressHandler = (callback, propName) => (e) => {
    const { keyCode } = e;
    // act if key was space or enter
    if ([13, 32].indexOf(keyCode) > -1) {
        e.preventDefault();
        callback(propName);
    }
};

/**
 * Departures list sorting header component
 * @constructs DepartureListSortHeader
 * @param {Object} props
 * @param {Function} props.onClick
 * @param {string} [props.propName=""]
 * @param {boolean} [props.active=false]
 * @param {string} [props.text=""]
 * @returns {DepartureListSortHeader}
 */
export default ({
    propName = '',
    active = false,
    text = '',
    onClick
}) => (
    <div
        tabindex="0"
        role="button"
        aria-pressed={active ? 'true' : 'false'}
        aria-label={`Järjestä lista ${text} mukaan`}
        class={`header ${propName.toLowerCase()}`}
        onClick={linkEvent(propName, onClick)}
        onKeyPress={keyPressHandler(onClick, propName)}>
        <span class={active ? 'active' : ''}>{text}</span>
    </div>
);
