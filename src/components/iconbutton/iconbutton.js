import './iconbutton.css';

/**
 * A button without background
 * @param {object} props
 * @param {string} props.text
 * @param {string} props.className
 * @param {...*}
 */
const IconButton = ({ text, className, label, ...rest }) => (
  <button class={`icon-button${className ? ` ${className}` : ''}`} {...rest}>
    <span aria-hidden={!!label}>{text}</span>
    {label && <span class="sr-only">{label}</span>}
  </button>
);

export default IconButton;
