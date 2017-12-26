import './icon.css';

/**
 * An Icon component. Type maps to a css class
 * and that maps to an icon sprite
 * @param {object} props
 * @param {string} props.type
 */
const Icon = ({ type }) =>
  <span class={`icon-image icon-${type}`} />

export default Icon;
