import icons from './icons.svg';
import './icon.css';

/**
 * An Icon component. Type maps to a css class
 * and that maps to an icon sprite
 * @param {object} props
 * @param {string} props.type
 */
const Icon = ({ name, class: className }) =>
  <svg class={['icon', className].join(' ')} focusable="false">
    <use href={ icons + `#icon-${name}` } style={{ fill: 'currentColor' }}/>
  </svg>;

export default Icon;
