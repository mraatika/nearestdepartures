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
        <p class="pull-left">{`Lähdöt päivitetty ${departureUpdateTime ? toTimeString(departureUpdateTime) : '-'}`}</p>
        <p class="pull-right text-right">{`Julkisilla.info v${process.env.VERSION}`}</p>
        <p class="clear">Lähtöjen tiedot ovat HSL:n tarjoamaa <a href="https://digitransit.fi/">avointa dataa</a>.</p>
    </div>
  </footer>
);
