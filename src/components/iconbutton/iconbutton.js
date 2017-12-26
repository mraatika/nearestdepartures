import './iconbutton.css';

/**
 * A button without background
 * @param {object} props
 * @param {string} props.text
 * @param {string} props.className
 * @param {...*}
 */
const IconButton = ({ text, className, ...rest }) => (
  <button class={`icon-button${className ? ` ${className}` : ''}`} {...rest}>
    {text}
  </button>
);

export default IconButton;
