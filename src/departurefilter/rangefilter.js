/**
 * Minimum range value
 * @type {number}
 */
const MIN_RANGE = 100;
/**
 * Maximum range value
 * @type {number}
 */
const MAX_RANGE = 3500;
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
    <fieldset>
        <input
            type="range"
            name="range"
            aria-label="range"
            title="Maximum distance to route stop"
            min={MIN_RANGE}
            max={MAX_RANGE}
            step={STEP}
            defaultValue={range}
            onInput={e => onChange(e.target.value)} />
        <output>{range}m</output>
    </fieldset>
);