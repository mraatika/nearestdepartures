import Component from 'inferno-component';
import debounce from 'lodash/debounce';
import { LOCATION_MAGIC_WORD } from '../../constants/constants';
import AddressSearch from './addresssearch';
import * as model from './model';
import './addresssearch.css';

/**
 * AddressSearch component for address input.
 * @class AddressSearchContainer
 * @extends {Component}
 * @param {object} props
 * @param {object} props.address
 * @param {function} props.onSearch
 * @param {function} props.onError
 * @param {function} props.clearAddress
 */
export default class AddressSearchContainer extends Component {
  /**
   * Creates an instance of AddressSearch.
   * @param {Object} props
   * @param {string} address
   */
  constructor(props) {
    super(props);
    this.state = { searchTerm: props.address ? props.address.label : '', suggestions: [] };
    this.debouncedFetchSuggestions = debounce(this.fetchSuggestions, 300);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyEvent = this.onKeyEvent.bind(this);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.hideSuggestions = this.hideSuggestions.bind(this);
    this.onSuggestionClick = this.onSuggestionClick.bind(this);
    this.getAddressInputRef = this.getAddressInputRef.bind(this);
  }

  /**
   * Search current location and search departures when this component was mounted
   */
  componentDidMount() {
    this.doSubmitAction();
  }

  /**
   * Invoked when props change. Address is hosted in the ancestor component
   * so whenever it updates the search term in the search field should update too
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { address } = nextProps;

    if (address !== this.props.address) {
      this.setState({
        searchTerm: address ? address.label : '',
        selectedSuggestion: undefined,
      });

      // if the address was cleared then focus on address input
      if (!address) {
        this.addressInput.focus();
      }
    }
  }

  /**
   * Does submit action (calls given callback) and
   * does suggestions clean up
   */
  doSubmitAction() {
    const { searchTerm, selectedSuggestion } = this.state;

    this.hideSuggestions();

    // if a suggestion was selected then we can use it to search for departures
    if (selectedSuggestion) {
      return this.props.onSearch(selectedSuggestion);
    }

    // search address with a search string or current location
    const promise = searchTerm && searchTerm.toLowerCase() !== LOCATION_MAGIC_WORD
      ? model.findAddressBySearchTerm(searchTerm)
      : model.findAddressByCurrentLocation();

    promise
      .then(this.props.onSearch)
      .catch(this.props.onError);
  }

  /**
   * Fetch suggestions from api
   * @param {string} searchTerm
   */
  fetchSuggestions(searchTerm) {
    model.fetchSuggestions(searchTerm)
      .then(this.setState.bind(this))
      .catch(console.error);
  }

  /**
   * Set suggestion selected
   * @param {Object} suggestion
   */
  selectSuggestion(suggestion, callback) {
    this.setState({ selectedSuggestion: suggestion, searchTerm: suggestion.label }, callback);
  }

  /**
   * Hide suggestions list and clear selected suggestion from state
   */
  hideSuggestions() {
    this.setState({ suggestions: [] });
  }

  /**
   * Callback for suggestion list item's click. Set clicked
   * suggestion selected and submit form
   * @param {Object} suggestion
   */
  onSuggestionClick(suggestion) {
    this.selectSuggestion(suggestion, this.doSubmitAction);
  }

  /**
   * Callback for submit event
   * @param {Event} e
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
   * Select next suggestion. Callback for down arrow button.
   */
  onKeyDownPress() {
    const next = model.selectNextSuggestion(this.state);
    this.selectSuggestion(next);
  }

  /**
   * Select previous suggestion. Callback for up arrow button.
   */
  onKeyUpPress() {
    const prev = model.selectPrevSuggestion(this.state);
    this.selectSuggestion(prev);
  }

  /**
   * Callback for form's key event
   * @param {Event} e
   */
  onKeyEvent(e) {
    const { keyCode } = e;

    switch (keyCode) {
      // if up was pressed
      case 38:
        e.preventDefault();
        this.onKeyUpPress();
        break;
      // if down was pressed
      case 40:
        e.preventDefault();
        this.onKeyDownPress();
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

  getAddressInputRef(component) {
    this.addressInput = component;
  }

  /**
   * Render component
   * @returns {string} markup
   */
  render() {
    const { searchTerm, suggestions, selectedSuggestion } = this.state;

    return (
      <AddressSearch
        searchTerm={searchTerm}
        suggestions={suggestions}
        selectedSuggestion={selectedSuggestion}
        onSubmit={this.onSubmit}
        onKeyEvent={this.onKeyEvent}
        onClearAddressClick={this.props.clearAddress}
        onSearchTermChange={this.onSearchTermChange}
        onBlur={this.hideSuggestions}
        onSuggestionClick={this.onSuggestionClick}
        getAddressInputRef={this.getAddressInputRef}
      />
    );
  }
}
