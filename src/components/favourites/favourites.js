import IconButton from '../iconbutton/iconbutton';
import FavouritesDialog from './favouritesdialog';

/**
 * Wrapper component for favourites buttons and the favourites dialog
 * @param {object} props
 * @param {object} props.address Currently selected address
 * @param {object[]} props.favourites All saved favourites
 * @param {boolean} props.isDialogVisible Is dialog currently visible
 * @param {boolean} props.isCurrentAddressFavoured Has currently selected address been added to favourites
 * @param {function} props.toggleFavourite Callback for the toggle favourite button
 * @param {function} props.toggleDialog Callback for the dialog toggle button
 * @param {function} props.onAddressSelect Callback for the dialog's item click
 * @param {function} props.removeFromFavourites Callback for the dialog's remove button
 */
const Favourites = ({ 
  address,
  favourites,
  isDialogVisible,
  isCurrentAddressFavoured,
  toggleFavourite,
  toggleDialog,
  onAddressSelect,
  removeFromFavourites,
}) =>
  <div class="favourites">
    <IconButton
      class={`favourites-open menu-icon pointer text-xxl${isDialogVisible ? ' toggled' : ''}`}
      label="Omat suosikit"
      name="menu"
      onClick={toggleDialog}
      aria-pressed={isDialogVisible}
    />

    <FavouritesDialog
      favourites={favourites}
      isVisible={isDialogVisible}
      selectFavourite={onAddressSelect}
      selectedAddress={address}
      onClose={toggleDialog}
      removeFavourite={removeFromFavourites}
      isCurrentAddressFavoured={isCurrentAddressFavoured}
      address={address}
      toggleFavourite={toggleFavourite}
    />
  </div>;

export default Favourites;
