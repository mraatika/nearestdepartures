import './header.css';
import logo from './julkisilla_logo.png';
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
    <div class="header-content">
      <div className="header-title-wrapper">
        <h1>
          <img class="app-logo" src={logo} alt="logo" />
          <span class="app-name">julkisilla.info</span>
        </h1>
        <p class="app-description">Löydä lähimmät julkisen liikenteen lähdöt helposti</p>
      </div>

      <Favourites
        address={address}
        selectLocation={selectLocation}
      />
    </div>
  </header>
);

export default Header;
