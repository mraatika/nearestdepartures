import Component from 'inferno-component';
import IconButton from '../iconbutton/iconbutton';
import FavouritesDialog from './favouritesdialog';
import * as storage from '../../services/storageservice';
import { areLocationsEqual } from './model';
import { find } from '../../utils/utils';
import fputils from '../../utils/fputils';

/**
 * Component's initial state
 */
const initialState = {
  favourites: [],
  isDialogVisible: false
};

/**
 * Wrapper component for favourites buttons and the favourites dialog
 * @class Favourites
 * @extends {Component}
 */
class Favourites extends Component {
  /**
   * @constructor
   * @param {object} props
   * @param {object} props.address
   * @param {function} props.selectLocation
   */
  constructor(props) {
    super(props);

    this.state = { ...initialState };

    this.toggleDialog = this.toggleDialog.bind(this);
    this.isLocationFavoured = this.isLocationFavoured.bind(this);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.removeFromFavourites = this.removeFromFavourites.bind(this);
    this.onAddressSelect = this.onAddressSelect.bind(this);
  }

  /**
   * Load favourites from the local storage when component mounts
   */
  componentDidMount() {
    const favourites = storage.get('favourites');
    if (favourites) this.setState({ favourites });
  }

  /**
   * Check if the list of favourites contains the given address
   * @param {object} address
   * @return {boolean}
   */
  isLocationFavoured(address) {
    const { favourites } = this.state;
    return !!(address && find(f => areLocationsEqual(f, address))(favourites));
  }

  /**
   * Add current address to/remove from the list of favourites
   */
  toggleFavourite() {
    const { address } = this.props;

    this.isLocationFavoured(address)
      ? this.removeFromFavourites(address)
      : this.addToFavourites(address);
  }

  /**
   * Add address to the list of favourites
   * @param {object} address
   */
  addToFavourites(address) {
    if (address) {
      // only save data that we care about
      const saveObject = fputils.pick(['label', 'location'])(address);
      const favourites = [...this.state.favourites, saveObject];
      this.saveFavourites(favourites);
    }
  }

  /**
   * Remove address from the list of favourites
   * @param {object} address
   */
  removeFromFavourites(address) {
    const favourites = this.state.favourites.filter(f => !areLocationsEqual(f, address));
    this.saveFavourites(favourites);
  }

  /**
   * Save favourites to the local storage and then set them to the component's state
   * @param {object[]} favourites
   */
  saveFavourites(favourites) {
    storage.set('favourites', favourites);
    this.setState({ favourites });
  }

  /**
   * Toggle dialog visibility
   */
  toggleDialog() {
    this.setState({ isDialogVisible: !this.state.isDialogVisible });
  }

  /**
   * Callback for favouritelistitem's click event
   * @param {object} address
   */
  onAddressSelect(address) {
    this.toggleDialog();
    this.props.selectLocation(address);
  }

  render() {
    const { favourites, isDialogVisible } = this.state;
    const { address } = this.props;
    const isCurrentAddressFavoured = this.isLocationFavoured(address);

    return (
      <div class="favourites">
        <IconButton
          className="favourites-button"
          text={isCurrentAddressFavoured ? '★' : '☆'}
          title="Lisää suosikkeihin/poista suosikeista"
          aria-pressed={!!isCurrentAddressFavoured}
          disabled={!address}
          onClick={this.toggleFavourite}
        />

        <IconButton
          className="favourites-button favourites-toggle"
          text="▼"
          title="Avaa Omat suosikit-lista"
          aria-pressed={isDialogVisible}
          onClick={this.toggleDialog} />

        <FavouritesDialog
          favourites={favourites}
          isVisible={isDialogVisible}
          selectFavourite={this.onAddressSelect}
          selectedAddress={address}
          onClose={this.toggleDialog}
          removeFavourite={this.removeFromFavourites}
        />
      </div>
    );
  }
}

export default Favourites;
