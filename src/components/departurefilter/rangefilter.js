import { MIN_RANGE, MAX_RANGE, RANGE_STEP } from '../constants/constants'

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
                title="Maksimi etäisyys pysäkille"
                min={MIN_RANGE}
                max={MAX_RANGE}
                step={RANGE_STEP}
                defaultValue={range}
                onChange={e => onChange(e.target.value)}
                onInput={e => onChange(e.target.value)} />
        </label>
    </div>
);