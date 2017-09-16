import './header.css';
import VehicleIcon from '../common/vehicleicon';

/**
 * App header component
 * @constructs Header
 */
export default () => (
  <header>
    <h1>
      <VehicleIcon iconName="bus" />
      <span class="app-name">julkisilla.info</span>
    </h1>
    <p class="app-description">Löydä lähimmät julkisen liikenteen lähdöt helposti</p>
  </header>
);