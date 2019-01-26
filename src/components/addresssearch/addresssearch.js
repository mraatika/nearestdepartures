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

    <div class="address-search flex-row">
      <input
        class="flex-full border-thin-light border-clear-right font-alternative space-s space-keep-l"
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
        class="address-search-clear text-xl color-gray color-black-active bold font-alternative border-thin-light border-clear-left"
        type="button"
        onClick={onClearAddressClick}>
        <div class="space-s space-clear-tb">
          <span class="sr-only">Tyhjennä hakusana</span>
          <span aria-hidden="true">x</span>
        </div>
      </button>
      <button
        class="address-search-submit bold bg-bus color-white font-alternative"
        type="submit">
        <div class="space-m space-clear-tb">Hae</div>
      </button>
    </div>

    <div class="suggestions position-relative">
      <SuggestionsList
        suggestions={suggestions}
        selected={selectedSuggestion}
        onItemClick={onSuggestionClick} />
    </div>
  </form>;

export default AddressSearch;
