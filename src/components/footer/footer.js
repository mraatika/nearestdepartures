import { toTimeString } from '../../utils/utils';

/**
 * App footer component
 * @constructs Footer
 * @param {Object} props
 * @param {Date} props.departureUpdateTime
 */
export default ({ departureUpdateTime }) => (
  <footer class="full-width text-s color-white bg-bus-dark line-height-l space-s">
    <div class="footer-content max-content-width centering-margin">
      <p class="footer-app-name font-heading">{`Julkisilla.info v${process.env.INFERNO_APP_VERSION}`}</p>
      <p>
        Lähdöt päivitetty&nbsp;
        <span class="italic">{departureUpdateTime ? toTimeString(departureUpdateTime) : 'Ei koskaan'}</span>
        &nbsp;/&nbsp;
        Lähtöjen tiedot ovat HSL:n tarjoamaa <a href="https://digitransit.fi/" class="underline">avointa dataa</a>.
      </p>
    </div>
  </footer>
);
