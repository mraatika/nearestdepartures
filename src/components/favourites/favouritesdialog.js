import { Component } from 'inferno';
import FavouritesListItem from './favouriteslistitem';
import './favourites.css';
import { initFocusTrap, areLocationsEqual } from '../../utils/utils';

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
    this.clearFocus = () => {};
  }

  componentDidUpdate(prevProps) {
    const { isVisible: isNowVisible } = this.props;
    const { isVisible: wasVisible } = prevProps;

    // if the dialog was opened
    if (!wasVisible && isNowVisible) {
      document.body.className = `no-scroll ${document.body.className}`.trim();
      document.body.addEventListener('keyup', this.onKeyUp);

      const closeButton = document.querySelector('.favouriteslist-close-button');
      const removeButtons = document.querySelectorAll('.favouriteslist-item-remove');
      this.clearFocus = initFocusTrap(closeButton, removeButtons[removeButtons.length - 1], true);
      // if the dialog was closed
    } else if (wasVisible && !isNowVisible) {
      document.body.className = document.body.className.replace('no-scroll', '');
      document.body.removeEventListener('keyup', this.onKeyUp);
      this.clearFocus();
    }
  }

  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  }

  render() {
    const { favourites = [] } = this.props;
    return (
      <div class={`favourites-modal-wrapper fill-parent${this.props.isVisible ? ' visible' : ''}`}>
        <div class="modal fill-parent" />
        <div
          class="favouriteslist fill-parent"
          role="dialog"
          tabIndex="0"
          aria-modal={true}
        >
          <div className="favouriteslist-header">
            <h2>Omat suosikit</h2>
            <button
              class="favouriteslist-close-button text-only-button"
              onClick={this.props.onClose}>
              sulje [x]
            </button>
          </div>
          <div class="favouriteslist-header-triangle-container">
            <div class="favouriteslist-header-triangle" />
            <div class="favouriteslist-header-triangle-shadow" />
          </div>
          <div class="favouriteslist-content flex-column">
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
      </div>
    );
  }
}

export default FavouritesDialog;
