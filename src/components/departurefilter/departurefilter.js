import FilterButton from './filterbutton';
import RangeFilter from './rangefilter';
import './departurefilter.css';

/**
 * Buttons for filtering departureslist
 * @param {Object} props
 * @param {Function} props.onFilterToggle Callback for a button click
 * @param {Function} props.onRangeChange Callback for range filter chang
 * @param {string[]} [props.filters=[]]
 * @param {string[]} [props.activeFilters=[]]
 * @param {number} [props.range=0]
 */
export default ({
    filters = [],
    activeFilters = [],
    range = 0,
    onFilterToggle,
    onRangeChange
}) => (
    <div class="departure-filter">
        <div>
            <RangeFilter range={range} onChange={onRangeChange} />
        </div>
        <div class="vehicle-type-filters">
        {
            filters.map(type =>
                <FilterButton
                    vehicleType={type}
                    onFilterToggle={onFilterToggle}
                    isToggled={activeFilters.indexOf(type) > -1}/>
            )
        }
        </div>
    </div>
);