import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import RouteIdentifier from './routeidentifier';

it('renders a div element', () => {
    const $ = dom.load(renderToString(<RouteIdentifier />));
    const result = $('div').length;
    expect(result).toBe(1);
});

it('renders route number', () => {
    const routeName = '58B';
    const $ = dom.load(renderToString(<RouteIdentifier routeName={routeName}/>));
    const result = $('.route-identifier').text();
    expect(result).toBe(routeName);
});

it('adds an class name corresponding to vehicle type', () => {
    const routeName = '9';
    const vehicleType = 'TRAM';
    const $ = dom.load(renderToString(<RouteIdentifier routeName={routeName} vehicleType={vehicleType} />));
    const result = $('div').hasClass(vehicleType.toLocaleLowerCase());
    expect(result).toBe(true);
});

it('renders an svg icon', () => {
    const routeName = '9';
    const vehicleType = 'TRAM';
    const $ = dom.load(renderToString(<RouteIdentifier routeName={routeName} vehicleType={vehicleType} />));
    const icon = $('div').find('svg');
    expect(icon.length).toBe(1);
});

it('renders an svg icon with class icon', () => {
    const routeName = '9';
    const vehicleType = 'TRAM';
    const $ = dom.load(renderToString(<RouteIdentifier routeName={routeName} vehicleType={vehicleType} />));
    const result = $('div').find('svg').hasClass('icon');
    expect(result).toBe(true);
});

it('renders an svg icon with viewbox attribute', () => {
    const routeName = '9';
    const vehicleType = 'TRAM';
    const $ = dom.load(renderToString(<RouteIdentifier routeName={routeName} vehicleType={vehicleType} />));
    const icon = $('div').find('svg');
    const result = icon.attr('viewbox');
    expect(result).toBe('0 0 100 100');
});

it('renders an svg icon corresponding to vehicle type TRAM', () => {
    const routeName = '9';
    const vehicleType = 'TRAM';
    const $ = dom.load(renderToString(<RouteIdentifier routeName={routeName} vehicleType={vehicleType} />));
    const svgUse = $('div').find('svg').find('use');
    const result = svgUse.attr('xlink:href');
    expect(result.indexOf('#icon-icon_tram')).not.toBe(-1);
});

it('renders an svg icon corresponding to vehicle type BUS', () => {
    const routeName = '58B';
    const vehicleType = 'BUS';
    const $ = dom.load(renderToString(<RouteIdentifier routeName={routeName} vehicleType={vehicleType} />));
    const svgUse = $('div').find('svg').find('use');
    const result = svgUse.attr('xlink:href');
    expect(result.indexOf('#icon-icon_bus')).not.toBe(-1);
});



