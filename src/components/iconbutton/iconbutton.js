/**
 * A button without background
 * @param {object} props
 * @param {string} props.text
 * @param {string} props.class
 * @param {...*}
 */
const IconButton = ({ text, class: classes = '', label, ...rest }) => (
  <button class={['icon-button pointer bold text-xl no-border no-bg', classes].join(' ')} {...rest}>
    <span aria-hidden={!!label}>{text}</span>
    {label && <span class="sr-only">{label}</span>}
  </button>
);

export default IconButton;
