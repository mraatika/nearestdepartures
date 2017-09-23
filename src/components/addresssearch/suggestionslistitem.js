/**
 * A row in suggestions list
 * @constructs SuggestionsListItem
 * @param {Object} props
 * @param {Object} props.suggestion
 * @param {Function} props.onClick
 * @param {boolean} [props.selected=false]
 * @returns {SuggestionsListItem}
 */
export default ({ suggestion, onClick, selected = false }) => (
  <li
    class={'suggestions-list-item' + (selected ? ' selected' : '')}
    tabindex="-1"
    role="option listitem"
    aria-selected={selected}
    onMouseDown={() => onClick(suggestion)}>
    <div class="suggestion-name">{suggestion.label}</div>
    <div class="suggestion-locality">{suggestion.locality}</div>
    {selected}
  </li>
);