import { linkEvent } from 'inferno';
import { okKeyPressHandler } from '../../utils/utils';
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
    aria-label={`Järjestä lista otsikon ${text.toLocaleLowerCase()} mukaan`}
    class={`header ${propName.toLowerCase()}`}
    onClick={linkEvent(propName, onClick)}
    onKeyPress={okKeyPressHandler(onClick, propName)}>
    <span class={active ? 'active' : ''}>{text}</span>
  </div>
);
