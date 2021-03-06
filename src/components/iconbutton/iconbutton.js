import Icon from '../icon/icon';

/**
 * A button without background
 * @param {object} props
 * @param {string} props.text
 * @param {string} props.class
 * @param {...*}
 */
const IconButton = ({ name, class: classes = '', label, ...rest }) => (
  <button
    aria-label={label}
    class={['icon-button pointer bold text-xl no-border no-bg', classes].join(' ')}
    {...rest}
  >
    <Icon name={name} />
  </button>
);

export default IconButton;
