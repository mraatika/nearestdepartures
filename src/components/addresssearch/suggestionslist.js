import SuggestionsListItem from './suggestionslistitem';
import './suggestionslist.css';

/**
 * List of suggestions fetched from api
 * @constructs SuggestionList
 * @param {Object} props
 * @param {Function} props.onItemClick
 * @param {Function} props.onClose
 * @param {Object[]} [props.suggestions=[]]
 * @param {Object} [props.selected={}]
 * @returns {SuggestionList}
 */
export default ({ suggestions = [], selected = {}, onItemClick, onClose }) => (
  <ol
    id="suggestions-list"
    class="full-width position-absolute space-clear-l"
    role="listbox"
    style={{ display: suggestions.length ? 'block' : 'none' }}>
    {suggestions.map(suggestion => (
      <SuggestionsListItem
        key={suggestion.id}
        suggestion={suggestion}
        onClick={onItemClick}
        selected={selected.id === suggestion.id} />)
    )}
  </ol>
);
