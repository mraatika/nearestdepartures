/**
 * A button without background
 * @param {object} props
 * @param {string} props.text
 * @param {string} props.class
 * @param {...*}
 */
const IconButton = ({ text, class: classes = '', label, ...rest }) => (
  <button
    aria-label={label}
    class={['icon-button pointer bold text-xl no-border no-bg', classes].join(' ')}
    {...rest}
  >
    {text}
  </button>
);

export default IconButton;
