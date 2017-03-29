import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import DepartureRow from './departurerow';

it('renders a table row', () => {
    const $ = dom.load(renderToString(<DepartureRow />));
    const tableRow = $('tr');
    expect(tableRow.length).toBe(1);
});

it('renders route name', () => {
    const routeName = '58B';
    const $ = dom.load(renderToString(<DepartureRow routeName={routeName}/>));
    const output = $('td:nth-child(2)').text();
    expect(output).toEqual(routeName);
});

it('renders route destination', () => {
    const destination = 'Katajanokka';
    const $ = dom.load(renderToString(<DepartureRow destination={destination}/>));
    const output = $('td:nth-child(3)').text();
    expect(output).toEqual(destination);
});

it('renders distance', () => {
    const distance = 100;
    const $ = dom.load(renderToString(<DepartureRow distance={distance}/>));
    const output = $('td:nth-child(4)').text();
    expect(output).toEqual(`${distance} m`);
});

describe('displaying departure time', () => {
    it('displays departure time', () => {
        const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
        const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={false} />));
        const output = $('td:first-child').text();
        expect(output).toEqual('12:12');
    });

    it('does not add realtime class to cell when realtime is false ', () => {
        const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
        const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={false} />));
        const result = $('td:first-child').is('.realtime');
        expect(result).toEqual(false);
    });

    it('displays estimated departure time when available', () => {
        const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
        const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={true} />));
        const output = $('td:first-child').text();
        expect(output).toEqual('12:12');
    });

    it('adds realtime class to cell when realtime is true', () => {
        const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
        const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={true} />));
        const result = $('td:first-child').is('.realtime');
        expect(result).toEqual(true);
    });
});





