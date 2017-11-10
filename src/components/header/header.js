import './header.css';
import VehicleIcon from '../common/vehicleicon';
import Favourites from '../favourites/favourites';
/**
 * App header component
 * @constructs Header
 * @param {object} props
 * @param {object} props.address
 * @param {function} props.selectLocation
 */
const Header = ({ address, selectLocation }) => (
  <header>
    <h1>
      <VehicleIcon iconName="bus" />
      <span class="app-name">julkisilla.info</span>
    </h1>
    <p class="app-description">Löydä lähimmät julkisen liikenteen lähdöt helposti</p>

    <Favourites
      address={address}
      selectLocation={selectLocation}
    />

  </header>
);

export default Header;
