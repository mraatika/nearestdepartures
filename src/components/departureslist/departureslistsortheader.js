import { linkEvent } from 'inferno';

/**
* Departures list sorting header component
* @constructs DepartureListSortHeader
* @param {Object} props
* @param {Function} props.onClick
* @param {string} props.label
* @param {string} [props.propName=""]
* @param {boolean} [props.active=false]
* @param {string} [props.text=""]
* @returns {DepartureListSortHeader}
*/
export default ({
  propName = '',
  active = false,
  text = '',
  sortDir = -1,
  label,
  onClick
}) => (
  <div
    role="columnheader"
    aria-sort={sortDir === -1 ? 'descending' : sortDir === 1 ? 'ascending' : 'none'}
    class={`header bg-white ${propName.toLowerCase()}`}
  >
    <button
      onClick={linkEvent(propName, onClick)}
      class={`bold color-gray-dark pointer ${active ? 'active' : ''}`}
      aria-label={label}
    >
      {text}
    </button>
  </div>
);
