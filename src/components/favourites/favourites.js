import Component from 'inferno-component';
import IconButton from '../iconbutton/iconbutton';
import FavouritesList from './favouriteslist';
import * as storage from '../../services/storageservice';
import { areLocationsEqual } from './model';

const initialState = {
  favourites: [],
  isListVisible: false
};

class FavouritesListWrapper extends Component {
  constructor() {
    super();

    this.state = { ...initialState };

    this.toggleList = this.toggleList.bind(this);
    this.isLocationFavoured = this.isLocationFavoured.bind(this);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.removeFromFavourites = this.removeFromFavourites.bind(this);
  }

  componentDidMount() {
    const favourites = storage.get('favourites');
    if (favourites) this.setState({ favourites });
  }

  isLocationFavoured(address) {
    const { favourites } = this.state;
    return address && favourites.find(f => areLocationsEqual(f, address));
  }

  toggleFavourite() {
    const { address } = this.props;

    return this.isLocationFavoured(address)
      ? this.removeFromFavourites(address)
      : this.addToFavourites(address);
  }

  addToFavourites(address) {
    if (address) {
      const favourites = [...this.state.favourites, address];
      this.setFavourites(favourites);
    }
  }

  removeFromFavourites(address) {
    const favourites = this.state.favourites.filter(f => !areLocationsEqual(f, address));
    this.setFavourites(favourites);
  }

  setFavourites(favourites) {
    storage.set('favourites', favourites);
    this.setState({ favourites });
  }

  toggleList() {
    this.setState({ isListVisible: !this.state.isListVisible });
  }

  onAddressSelect(address) {
    this.toggleList();
    this.props.selectLocation(address);
  }

  render() {
    const { favourites } = this.state;
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
          aria-pressed={this.state.isListVisible}
          onClick={this.toggleList} />

        <FavouritesList
          favourites={favourites}
          isVisible={this.state.isListVisible}
          selectFavourite={this.onAddressSelect.bind(this)}
          selectedAddress={address}
          onClose={this.toggleList}
          removeFavourite={this.removeFromFavourites}
        />
      </div>
    );
  }
}

export default FavouritesListWrapper;
