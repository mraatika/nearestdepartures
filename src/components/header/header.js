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
  <header class="bg-bus color-white space-xs space-clear-rl">
    <div class="header-content flex-row flex-align-center centering-margin max-content-width space-s space-clear-tb">
      <div className="flex-full">
        <h1 class="space-s space-clear-rl">
          <img class="app-logo" src={logo} alt="" />
          <span class="app-name font-heading lowercase">julkisilla.info</span>
        </h1>
        <p class="app-description text-s space-l space-keep-b">
          Löydä lähimmät julkisen liikenteen lähdöt helposti
        </p>
      </div>

      <Favourites
        address={address}
        selectLocation={selectLocation}
      />
    </div>
  </header>
);

export default Header;
