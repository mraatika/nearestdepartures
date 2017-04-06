/**
 * Minimum range value
 * @type {number}
 */
const MIN_RANGE = 100;
/**
 * Maximum range value
 * @type {number}
 */
const MAX_RANGE = 2000;
/**
 * Range change step
 * @type {number}
 */
const STEP = 100;

/**
 * Range input for filtering departures by distance
 * @constructs {RangeFilter}
 * @param {Object} props
 * @param {Function} props.onChange
 * @param {number} [props.range=100]
 */
export default ({
    range = MIN_RANGE,
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
                step={STEP}
                defaultValue={range}
                onInput={e => onChange(e.target.value)} />
        </label>
    </div>
);