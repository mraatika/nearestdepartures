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
    class={'suggestions-list-item bg-white border-thin-light space-xs pointer' + (selected ? ' selected' : '')}
    tabindex="-1"
    role="option listitem"
    aria-selected={selected}
    onMouseDown={() => onClick(suggestion)}>
    <div class="space-xs space-clear-tb">
      <div class="suggestion-name space-xxs space-keep-b">{suggestion.label}</div>
      <div class="suggestion-locality color-gray">{suggestion.locality}</div>
    </div>
    {selected}
  </li>
);
