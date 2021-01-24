import './header.css';
import Favourites from '../favourites';

/**
 * App header component
 * @constructs Header
 * @param {object} props
 * @param {object} props.address
 * @param {function} props.selectLocation
 */
const Header = ({ address, selectLocation }) => (
  <header class="bg-bus color-white space-xs space-clear-rl">
    <div class="header-content flex-row flex-align-center centering-margin max-content-width space-s space-clear-tb">
      <div class="flex-full no-wrap">
        <h1 class="flex-full no-wrap flex-row flex-align-center space-s space-clear-rl">
          <div class="app-logo-container">
            <img
              class="app-logo"
              src="icons/app-logo-40.png"
              srcset="icons/app-logo-60.png 60w"
              alt=""
            />
          </div>
          <div class="app-name font-heading lowercase">julkisilla.info</div>
        </h1>
        <p class="app-description text-s line-height-s space-l space-keep-b">
          Löydä lähimmät julkisen liikenteen lähdöt helposti
        </p>
      </div>

      <Favourites address={address} selectLocation={selectLocation} />
    </div>
  </header>
);

export default Header;
