import { Component } from 'inferno';
import { initFocusTrap, areLocationsEqual } from '../../utils/utils';
import IconButton from '../iconbutton/iconbutton';
import FavouritesListItem from './favouriteslistitem';
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
    this.clearFocus = () => {};
  }

  componentDidUpdate(prevProps) {
    const { isVisible: isNowVisible } = this.props;
    const { isVisible: wasVisible } = prevProps;

    // if the dialog was opened
    if (!wasVisible && isNowVisible) {
      document.body.className = `no-scroll ${document.body.className}`.trim();
      document.body.addEventListener('keyup', this.onKeyUp);

      const firstButton = document.querySelector('.favourites-toggle');
      const removeButtons = document.querySelectorAll('.favouriteslist-item-remove');
      this.clearFocus = initFocusTrap(firstButton, removeButtons[removeButtons.length - 1], true);
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
    const { favourites = [], isCurrentAddressFavoured, address, toggleFavourite } = this.props;

    return (
      <div class={`favourites-modal-wrapper fill-parent${this.props.isVisible ? ' visible' : ''}`}>
        <div class="modal fill-parent bg-black-opaque" onClick={this.props.onClose} />
        <div
          class="favouriteslist color-gray-dark bg-white text-left flex-column"
          role="dialog"
          tabIndex="0"
          aria-labelledby="favouritesdialog-title"
          aria-modal={true}
        >
          <div className="favouriteslist-header color-white bg-bus space-s">
            <div class="align-right">
              <span class="space-xs space-keep-r">
                <IconButton
                  class="favourites-toggle text-white"
                  name={isCurrentAddressFavoured ? 'star' : 'star-outline'}
                  label={isCurrentAddressFavoured ? 'Poista suosikeista' : 'Lisää suosikkeihin'}
                  aria-pressed={!!isCurrentAddressFavoured}
                  disabled={!address}
                  onClick={toggleFavourite}
                />
              </span>

              <IconButton
                class="favouriteslist-close-button"
                name="close"
                label="Sulje"
                onClick={this.props.onClose}
              />
            </div>

            <h2 id="favouritesdialog-title" class="font-heading align-center space-s space-clear-rl">Omat suosikit</h2>
          </div>

          <div class="favouriteslist-header-triangle-container">
            <div class="favouriteslist-header-triangle centering-margin" />
            <div class="favouriteslist-header-triangle-shadow centering-margin" />
          </div>

          <div class="favouriteslist-content flex-column flex-full space-s space-clear-t">
            <ul class="flex-full">
              {favourites.map(address =>
                <FavouritesListItem
                  address={address}
                  removeFavourite={this.props.removeFavourite}
                  selectFavourite={this.props.selectFavourite}
                  isSelected={areLocationsEqual(this.props.selectedAddress, address)}
                />
              )}

              {!favourites.length &&
                <li class="favouriteslist-placeholder">
                  <div class="flex-row flex-align-start flex-no-shrink align-left space-m space-keep-t">
                    <span class="badge alternative">!</span>
                    <div class="space-xs space-keep-l italic">
                      Suosikit tallentuvat paikallisesti, joten ne ovat hyödynnettävissä vain samalla selaimella ja laitteella, johon ne on tallennettu.
                    </div>
                  </div>
                </li>}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default FavouritesDialog;
