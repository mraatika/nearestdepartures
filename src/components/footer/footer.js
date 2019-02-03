import { toTimeString } from '../../utils/utils';

/**
 * App footer component
 * @constructs Footer
 * @param {Object} props
 * @param {Date} props.departureUpdateTime
 */
export default ({ departureUpdateTime }) => (
  <footer class="full-width text-s color-white bg-bus-dark space-s">
    <div class="footer-content max-content-width centering-margin">
      <p class="footer-app-name font-heading">{`Julkisilla.info v${process.env.INFERNO_APP_VERSION}`}</p>
      <p>
        Lähdöt päivitetty&nbsp;
        <i>{departureUpdateTime ? toTimeString(departureUpdateTime) : 'Ei koskaan'}</i>
        &nbsp;/&nbsp;
        <a href="https://digitransit.fi/">Lähtöjen tiedot ovat HSL:n tarjoamaa <span class="underline">avointa dataa</span></a>.
      </p>
    </div>
  </footer>
);
