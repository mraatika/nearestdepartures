import Component from 'inferno-component';
import FavouritesListItem from './favouriteslistitem';
import { areLocationsEqual } from './model';
import './favourites.css';

/**
 * A dialog component for displaying user's saved locations
 * @class FavouritesList
 * @extends {Component}
 */
class FavouritesDialog extends Component {
  /**
   * @constructor
   * @param {object} props
   * @param {object[]} props.favourites
   * @param {boolean} props.isVisible
   * @param {object} props.selectedAddress
   * @param {function} props.selectFavourite
   * @param {function} props.removeFavourite
   * @param {function} props.onClose
   */
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isVisible) {
      document.body.className = `no-scroll ${document.body.className}`;
      // start listening to keyup events
      document.body.addEventListener('keyup', this.onKeyUp);
      // for usability reasons focus on the dialog when toggled visible
      this.dialog.focus();
    } else {
      document.body.className = document.body.className.replace('no-scroll', '');
      // stop listening to keyup events
      document.body.removeEventListener('keyup', this.onKeyUp);
    }
  }

  onKeyUp(e) {
    // close the dialog on esc press
    if (e.key === 'Escape') {
      this.props.onClose();
    }
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
          <div class="info-message">
            <span class="badge info">!</span>
            Suosikit tallentuvat paikallisesti, joten ne ovat hyödynnettävissä vain samalla selaimella ja laitteella, johon ne on tallennettu.
          </div>
        </div>
      </div>
    );
  }
}

export default FavouritesDialog;
