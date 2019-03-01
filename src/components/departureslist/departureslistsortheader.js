import { linkEvent } from 'inferno';

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
  <div class={`header bg-white ${propName.toLowerCase()}`}>
    <button
      onClick={linkEvent(propName, onClick)}
      class={`bold color-gray-dark pointer ${active ? 'active' : ''}`}
      aria-pressed={active ? 'true' : 'false'}
      aria-label={`Järjestä lista otsikon ${text.toLocaleLowerCase()} mukaan`}
    >
      {text}
    </button>
  </div>
);
