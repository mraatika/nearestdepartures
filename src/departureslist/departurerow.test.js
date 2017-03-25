import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import createDepartureRow from './departurerow';
import dom from 'cheerio';

const DepartureRow = createDepartureRow(Inferno);

it('renders a table row', () => {
    const $ = dom.load(renderToString(<DepartureRow />));
    const tableRow = $('tr');
    expect(tableRow.length).toBe(1);
});

it('renders scheduled departure time', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow scheduledDeparture={time}/>));
    const output = $('td:first-child').text();
    expect(output).toEqual('12:12');
});

it('renders route name', () => {
    const routeName = '58B';
    const $ = dom.load(renderToString(<DepartureRow routeName={routeName}/>));
    const output = $('td:nth-child(2)').text();
    expect(output).toEqual(routeName);
});

it('renders route destination', () => {
    const routeDestination = 'Katajanokka';
    const $ = dom.load(renderToString(<DepartureRow routeDestination={routeDestination}/>));
    const output = $('td:nth-child(3)').text();
    expect(output).toEqual(routeDestination);
});

it('renders distance', () => {
    const distance = 100;
    const $ = dom.load(renderToString(<DepartureRow distance={distance}/>));
    const output = $('td:nth-child(4)').text();
    expect(output).toEqual(`${distance}m`);
});




