/**
 * Departures list sorting header component
 * @constructs {DepartureListSortHeader}
 * @param {Object} props
 * @param {string} props.propName
 * @param {boolean} props.active
 * @param {string} props.text
 * @param {Function} props.onClick
 * @returns {DepartureListSortHeader}
 */
export default ({
    propName = '',
    active = false,
    text = '',
    onClick
}) => (
    <span
        class={`header ${propName.toLowerCase()}-header`}
        onClick={() => onClick(propName)}>
        <span class={active ? 'active' : ''}>{text}</span>
    </span>
);