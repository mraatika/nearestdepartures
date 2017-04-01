import Component from 'inferno-component';
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
        this.state = { searchTerm: props.address };
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
     * Callback for submit event
     */
    onSubmit(e) {
        e.preventDefault();
        this.props.onSearch(this.state.searchTerm);
    }

    /**
     * Callback for input event
     * @param {Event} e
     */
    onChange(e) {
        this.setState({ searchTerm: e.target.value });
    }

    /**
     * Render component
     * @returns {string} markup
     */
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <fieldset class="address-wrapper">
                    <div class="address-search">
                        <input
                            id="address"
                            type="text"
                            aria-label="Osoite/sijainti"
                            placeholder="Hae osoitteella tai paikannimellä..."
                            onInput={e => this.onChange(e)}
                            value={this.state.searchTerm} />
                        <button type="submit">Hae</button>
                    </div>
                </fieldset>
            </form>
        );
    }
}