import { linkEvent } from 'inferno';
import IconButton from '../iconbutton/iconbutton';
import './favourites.css';

/**
 * A list item component representing a single entry in the favourites list
 * @param {object} props
 * @param {object} props.address
 * @param {function} props.removeFavourite
 * @param {function} props.selectFavourite
 * @param {boolean} props.isSelected
 */
const FavouritesListItem = ({ address, removeFavourite, selectFavourite, isSelected }) => (
  <li
    key={address}
    class={`favouriteslist-item bg-white space-xs space-clear-rl no-wrap flex-row flex-align-center${isSelected ? ' selected' : ''}`}>
    <button
      class="favouriteslist-item-label text-only-button full-width align-left flex-full"
      onClick={linkEvent(address, selectFavourite)}>
      {address.label}
    </button>
    <div>
      <IconButton
        class="favouriteslist-item-remove text-l color-alert"
        text="x"
        label="Poista Omat suosikit -listalta"
        onClick={linkEvent(address, removeFavourite)}
      />
    </div>
  </li>
);

export default FavouritesListItem;
