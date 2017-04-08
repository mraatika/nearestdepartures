import SuggestionsListItem from './suggestionslistitem';
import './suggestionslist.css';

export default ({ suggestions = [], selected = {}, onItemClick, onClose }) => (
    <ol
        id="suggestions-list"
        role="listbox"
        style={{ display: suggestions.length ? 'block' : 'none' }}>
        { suggestions.map(suggestion => (
            <SuggestionsListItem
                key={suggestion.id}
                suggestion={suggestion}
                onClick={onItemClick}
                selected={selected.id === suggestion.id} />)
        )}
    </ol>
);