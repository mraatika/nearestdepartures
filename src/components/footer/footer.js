import { toTimeString } from '../../utils/utils';
import './footer.css';

/**
 * App footer component
 * @constructs Footer
 * @param {Object} props
 * @param {Date} props.departureUpdateTime
 */
export default ({ departureUpdateTime }) => (
  <footer>
    <div class="footer-content">
      <p class="footer-app-name">{`Julkisilla.info v${process.env.INFERNO_APP_VERSION}`}</p>
      <p>
        Lähdöt päivitetty&nbsp;
        <i>{departureUpdateTime ? toTimeString(departureUpdateTime) : 'Ei koskaan'}</i>
        &nbsp;/&nbsp;
        Lähtöjen tiedot ovat HSL:n tarjoamaa <a href="https://digitransit.fi/">avointa dataa</a>.
      </p>
    </div>
  </footer>
);
