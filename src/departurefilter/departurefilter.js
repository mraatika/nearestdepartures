import FilterButton from './filterbutton';
import './departurefilter.css';

/**
 * Buttons for filtering departureslist
 * @param {string[]} filters
 * @param {string[]} activeFilters
 * @param {Function} onFilterToggle Callback for a button click
 */
export default ({
    filters = [],
    activeFilters = [],
    onFilterToggle
}) => (
    <div className="departure-filter">
        {
            filters.map(type =>
                <FilterButton
                    vehicleType={type}
                    onFilterToggle={onFilterToggle}
                    isToggled={activeFilters.indexOf(type) > -1}/>
            )
        }
    </div>
);