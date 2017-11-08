import Component from 'inferno-component';
import FavouritesListItem from './favouriteslistitem';
import { areLocationsEqual } from './model';
import './favourites.css';

/**
 * A list component for displaying user's saved locations
 * @class FavouritesList
 * @extends {Component}
 */
class FavouritesList extends Component {
  componentDidUpdate() {
    // for usability reasons focus on the dialog when toggled visible
    if (this.props.isVisible) this.dialog.focus();
  }

  render() {
    const { favourites = [] } = this.props;
    return (
      <div class={`favourites-modal-wrapper ${this.props.isVisible ? 'visible' : 'hidden'}`}>
        <div class="modal" />
        <div
          class="favouriteslist"
          ref={r => this.dialog = r}
          tabIndex="0"
          role="dialog"
          aria-modal
        >
          <div className="favouriteslist-header">
            <h2>Omat suosikit</h2>
            <button class="favouriteslist-close-button text-only-button" onClick={this.props.onClose}>
              sulje [x]
            </button>
          </div>
          <ul>
            {favourites.map(address =>
              <FavouritesListItem
                address={address}
                removeFavourite={this.props.removeFavourite}
                selectFavourite={this.props.selectFavourite}
                isSelected={areLocationsEqual(this.props.selectedAddress, address)}
              />
            )}
            {!favourites.length && <li class="favouriteslist-placeholder">Ei tallennettuja suosikkeja</li>}
          </ul>
        </div>
      </div>
    );
  }
}

export default FavouritesList;
