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
      class="favourites-toggle text-white"
      text={isCurrentAddressFavoured ? '★' : '☆'}
      title="Lisää suosikkeihin/poista suosikeista"
      label={isCurrentAddressFavoured ? 'Poista suosikeista' : 'Lisää suosikkeihin'}
      aria-pressed={!!isCurrentAddressFavoured}
      disabled={!address}
      onClick={toggleFavourite}
    />

    <span class="space-s space-keep-l">
      <IconButton
        class="favourites-open"
        text="▼"
        title="Avaa Omat suosikit-lista"
        label="Avaa Omat suosikit-lista"
        aria-pressed={isDialogVisible}
        onClick={toggleDialog} />
    </span>

    <FavouritesDialog
      favourites={favourites}
      isVisible={isDialogVisible}
      selectFavourite={onAddressSelect}
      selectedAddress={address}
      onClose={toggleDialog}
      removeFavourite={removeFromFavourites}
    />
  </div>;

export default Favourites;
