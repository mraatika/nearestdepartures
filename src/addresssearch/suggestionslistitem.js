export default ({ suggestion, onClick, selected = false }) => (
    <li
        class={'suggestions-list-item' + (selected ? ' selected' : '') }
        tabindex="-1"
        role="option listitem"
        onMouseDown={() => onClick(suggestion)}>
        <div class="suggestion-name">{suggestion.label}</div>
        <div class="suggestion-locality">{suggestion.locality}</div>
        {selected}
    </li>
);