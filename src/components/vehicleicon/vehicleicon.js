import icons from './icons.svg';

/**
 * Vehicle type icon component
 * @constructs VehicleIcon
 * @param {string} iconName
 * @returns {VehicleIcon}
 */
export default ({ iconName, class: classes }) => (
  <svg viewBox="0 0 100 100" class={['icon', classes].join(' ')} focusable="false">
    <use xlink:href={ icons + `#icon-icon_${iconName}` } style={{ fill: 'currentColor' }}/>
  </svg>
);
