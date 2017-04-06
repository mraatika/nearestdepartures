import FilterButton from './filterbutton';
import RangeFilter from './rangefilter';
import './departurefilter.css';

/**
 * Buttons for filtering departureslist
 * @param {string[]} filters
 * @param {string[]} activeFilters
 * @param {number} defaultRange
 * @param {Function} onFilterToggle Callback for a button click
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