import { stopPropagation } from '../../utils/utils';

/**
 * Component for an external link
 * @constructs ExternalLink
 * @param {object} props
 * @param {string} props.text
 * @param {Component} props.children
 * @param {...*} props.props
 */
export default ({ text, children, ...props}) =>
  <a
    {...props}
    onClick={stopPropagation}
    target="_blank"
    rel="noopener"
  >{children ? children : text}</a>;
