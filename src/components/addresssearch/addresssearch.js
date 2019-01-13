import SuggestionsList from './suggestionslist';
import './addresssearch.css';
import { prop } from '../../utils/utils';

/**
 * AddressSearch component for address input.
 * @param {object} props
 * @param {string} props.searchTerm
 * @param {object[]} props.suggestions
 * @param {object} props.selectedSuggestion
 * @param {function} props.onSubmit
 * @param {function} props.onKeyEvent
 * @param {function} props.onSearchTermChange
 * @param {function} props.hideSuggestions
 * @param {function} props.clearAddress
 * @param {function} props.onSuggestionClick
 * @param {function} props.getAddressInputRef
 */
const AddressSearch = ({
  searchTerm,
  suggestions = [],
  selectedSuggestion,
  onSubmit,
  onKeyEvent,
  onSearchTermChange,
  onBlur,
  onClearAddressClick,
  onSuggestionClick,
  getAddressInputRef,
}) =>
  <form
    onSubmit={onSubmit}
    onKeyUp={onKeyEvent}>

    <div class="address-search">
      <input
        ref={getAddressInputRef}
        type="text"
        role="combobox"
        aria-controls="suggestions-list"
        aria-expanded={!!suggestions.length}
        aria-activedescendant={prop('id')(selectedSuggestion)}
        aria-autocomplete="list"
        aria-label="Hae paikannuksella, osoitteella tai paikannimellä"
        placeholder="Hae paikannuksella, osoitteella tai paikannimellä..."
        onInput={onSearchTermChange}
        onBlur={onBlur}
        value={searchTerm} />
      <button
        type="button"
        className="address-search-clear"
        onClick={onClearAddressClick}
      >
        <span class="sr-only">Tyhjennä hakusana</span>
        <span aria-hidden="true">x</span>
      </button>
      <button className="address-search-submit" type="submit">Hae</button>
    </div>

    <div class="suggestions">
      <SuggestionsList
        suggestions={suggestions}
        selected={selectedSuggestion}
        onItemClick={onSuggestionClick} />
    </div>
  </form>;

export default AddressSearch;
