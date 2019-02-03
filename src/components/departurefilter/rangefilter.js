import { linkEvent } from 'inferno';
import { MIN_RANGE, MAX_RANGE, RANGE_STEP } from '../../constants/constants';
import { saveFilter } from '../../services/storageservice';

/**
 * Callback for input's change
 * @param {object} props
 * @param {function} props.onChange
 * @param {Event} e
 */
const onInputChange = (onChange, e) => {
  const value = e.target.value;
  saveFilter('range', value);
  onChange(value);
};

/**
 * Range input for filtering departures by distance
 * @constructs {RangeFilter}
 * @param {Object} props
 * @param {number} range Current value
 * @param {Function} props.onChange
 */
export default ({
  range,
  onChange,
}) => (
  <div class="range-filter-wrapper">
    <div class="align-right space-xxs space-keep-b">
      <output for="departurefilter-range">{range}m</output>
    </div>
    <label for="departurefilter-range" class="sr-only">Maksimietäisyys pysäkille</label>
    <input
      id="departurefilter-range"
      class="no-border full-width"
      type="range"
      name="range"
      min={MIN_RANGE}
      max={MAX_RANGE}
      step={RANGE_STEP}
      defaultValue={range}
      onChange={linkEvent(onChange, onInputChange)}
      onInput={linkEvent(onChange, onInputChange)} />
  </div>
);
