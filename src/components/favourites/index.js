import Component from 'inferno-component';
import Favourites from './favourites';
import * as storage from '../../services/storageservice';
import { areLocationsEqual, isLocationFavoured } from './model';

/**
 * Component's initial state
 */
const initialState = {
  favourites: [],
  isDialogVisible: false
};

/**
 * Container for Favourites component. Separates logic from dumb presentational component
 * @extends {Component}
 */
class FavouritesContainer extends Component {
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
   * Add current address to/remove from the list of favourites
   */
  toggleFavourite() {
    const { address } = this.props;

    isLocationFavoured(address, this.state.favourites)
      ? this.removeFromFavourites(address)
      : this.addToFavourites(address);
  }

  /**
   * Add address to the list of favourites
   * @param {object} address
   */
  addToFavourites(address) {
    if (address) {
      const { label, location } = address;
      // only save data that we care about
      const favourites = [...this.state.favourites, { label, location }];
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
    const isCurrentAddressFavoured = isLocationFavoured(address, favourites);

    return  (
      <Favourites
        favourites={favourites}
        isDialogVisible={isDialogVisible}
        address={address}
        isCurrentAddressFavoured={isCurrentAddressFavoured}
        toggleFavourite={this.toggleFavourite}
        toggleDialog={this.toggleDialog}
        onAddressSelect={this.onAddressSelect}
        removeFromFavourites={this.removeFromFavourites}
      />
    );
  }
}

export default FavouritesContainer;
