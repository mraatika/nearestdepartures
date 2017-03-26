import icons from '../../public/icons.svg';

export default Inferno => ({
    routeName = '',
    vehicleType = '',
} = {}) => {
    const className = vehicleType.toLowerCase();

    return (
        <div className={ className }>
            <svg viewBox="0 0 100 100" className="icon">
                <use xlink:href={ icons + `#icon-icon_${className}` } />
            </svg>
            <span className="route-identifier">{ routeName }</span>
        </div>
    );
};