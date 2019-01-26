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
  <li key={address} class={`favouriteslist-item${isSelected ? ' selected' : ''}`}>
    <div class="favouriteslist-item-label">
      <button class="text-only-button full-width" onClick={linkEvent(address, selectFavourite)}>
        {address.label}
      </button>
    </div>
    <div>
      <IconButton
        className="favouriteslist-item-remove"
        text="x"
        label="Poista Omat suosikit -listalta"
        onClick={linkEvent(address, removeFavourite)}
      />
    </div>
  </li>
);

export default FavouritesListItem;
