import debounce from 'lodash/debounce';
import Component from 'inferno-component';
import SuggestionsList from './suggestionslist';
import { searchAddress } from '../services/addresssearchservice';
import { MAX_ADDRESS_SUGGESTIONS } from '../constants/constants';
import './addresssearch.css';

/**
 * AddressSearch component for address input.
 * @class AddressSearch
 * @extends {Component}
 */
export default class AddressSearch extends Component {
    /**
     * Creates an instance of AddressSearch.
     * @param {Object} props
     * @param {string} address
     */
    constructor(props) {
        super(props);
        this.state = { searchTerm: props.address, suggestions: [] };
        this.debouncedFetchSuggestions = debounce(this.fetchSuggestions, 300);
    }

    /**
     * Address changes when location search succeeds
     * @param {Object} newProps
     * @param {string} newProps.address
     */
    componentWillReceiveProps(newProps) {
        this.setState({ searchTerm: newProps.address });
    }

    /**
     * Does submit action (calls given callback) and
     * does suggestions clean up
     */
    doSubmitAction() {
        const { searchTerm, selectedSuggestion } = this.state;

        this.hideSuggestions();

        // if a suggestion is selected then use that
        // as search term otherwise find address based on search term
        const param = selectedSuggestion ? {
            location: selectedSuggestion.location,
            searchTerm: selectedSuggestion.label,
        } : { searchTerm };

        this.props.onSearch(param);
    }

    /**
     * Set suggestion selected
     * @param {Object} suggestion
     */
    selectSuggestion(suggestion) {
        this.setState({ selectedSuggestion: suggestion, searchTerm: suggestion.label });
    }

    /**
     * Select next suggestion. Callback for down arrow button.
     */
    selectNextSuggestion() {
        const { suggestions, selectedSuggestion } = this.state;
        const currentIndex = suggestions.indexOf(selectedSuggestion);
        const nextIndex = ((currentIndex + 1) >= suggestions.length) ? 0 : currentIndex + 1;
        this.selectSuggestion(suggestions[nextIndex]);
    }

    /**
     * Select previous suggestion. Callback for up arrow button.
     */
    selectPrevSuggestion() {
        const { suggestions, selectedSuggestion } = this.state;
        const currentIndex = suggestions.indexOf(selectedSuggestion);
        const prevIndex = [-1, 0].indexOf(currentIndex) > -1 ? (suggestions.length - 1) : (currentIndex - 1);
        this.selectSuggestion(suggestions[prevIndex]);
    }

    /**
     * Fetch suggestions from api
     * @param {string} searchTerm
     */
    fetchSuggestions(searchTerm) {
        searchAddress(searchTerm, MAX_ADDRESS_SUGGESTIONS)
            .then(result => result.sort((a, b) => b.confidence - a.confidence))
            .then(sorted => this.setState({ suggestions: sorted }))
            .catch(e => console.log(e));
    }

    /**
     * Hide suggestions list and clear selected suggestion from state
     */
    hideSuggestions() {
        this.setState({ suggestions: [], selectedSuggestion: undefined });
    }

     /**
     * Callback for submit event
     */
    onSubmit(e) {
        e.preventDefault();
        this.doSubmitAction();
    }

    /**
     * Callback for text input's input event
     * @param {Event} e
     */
    onSearchTermChange(e) {
        const term = e.target.value;

        this.setState({ searchTerm: term, selectedSuggestion: undefined });

        if (!term.length) {
            this.hideSuggestions();
            return;
        }

        this.debouncedFetchSuggestions(term);
    }

    /**
     * Callback for suggestion list item's click. Set clicked
     * suggestion selected
     * @param {Object} suggestion
     */
    onSuggestionClick(suggestion) {
        this.selectSuggestion(suggestion);
        this.doSubmitAction();
    }

    /**
     * Callback for form's key event
     * @param {Event} e
     */
    onKeyEvent(e) {
        const { keyCode } = e;

        switch(keyCode) {
        // if up was pressed
        case 38:
            e.preventDefault();
            this.selectPrevSuggestion();
            break;
        // if down was pressed
        case 40:
            e.preventDefault();
            this.selectNextSuggestion();
            break;
        // if esc was pressed
        case 27:
            e.preventDefault();
            this.hideSuggestions();
            break;
        default:
            break;
        }
    }

    /**
     * Render component
     * @returns {string} markup
     */
    render() {
        const { searchTerm, suggestions, selectedSuggestion } = this.state;
        // const suggestions = [{ name: 'Kuusitie', locality: 'Helsinki' }, { name: 'Apinapolku', locality: 'Espoo' }];

        return (
            <form
                onSubmit={this.onSubmit.bind(this)}
                onKeyUp={this.onKeyEvent.bind(this)}>
                <div class="address-search">
                    <input
                        type="text"
                        aria-autocomplete="list"
                        aria-owns="suggestions-list"
                        aria-label="Osoite/sijainti"
                        placeholder="Hae paikannuksella, osoitteella tai paikannimellä..."
                        onInput={this.onSearchTermChange.bind(this)}
                        onBlur={this.hideSuggestions.bind(this)}
                        value={searchTerm} />
                    <button type="submit">Hae</button>
                </div>
                <div class="suggestions">
                    <SuggestionsList
                        suggestions={suggestions}
                        selected={selectedSuggestion}
                        onItemClick={this.onSuggestionClick.bind(this)} />
                </div>
            </form>
        );
    }
}