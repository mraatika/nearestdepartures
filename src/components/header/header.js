import './header.css';
import VehicleIcon from '../vehicleicon/vehicleicon';
import Favourites from '../favourites';

/**
 * App header component
 * @constructs Header
 * @param {object} props
 * @param {object} props.address
 * @param {function} props.selectLocation
 */
const Header = ({ address, selectLocation }) => (
  <header>
    <div className="header-title-wrapper">
      <h1>
        <VehicleIcon iconName="bus" />
        <span class="app-name">julkisilla.info</span>
      </h1>
      <p class="app-description">Löydä lähimmät julkisen liikenteen lähdöt helposti</p>
    </div>

    <Favourites
      address={address}
      selectLocation={selectLocation}
    />

  </header>
);

export default Header;
