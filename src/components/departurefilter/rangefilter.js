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
    <output>{range}m</output>
    <label>
      <span class="accessibility-hidden">Maksimi etäisyys pysäkille</span>
      <input
        type="range"
        name="range"
        title="Maksimietäisyys pysäkille"
        min={MIN_RANGE}
        max={MAX_RANGE}
        step={RANGE_STEP}
        defaultValue={range}
        onChange={linkEvent(onChange, onInputChange)}
        onInput={linkEvent(onChange, onInputChange)} />
    </label>
  </div>
  );
