import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import DeparturesList from './departureslist';

it('renders a list div', () => {
    const $ = dom.load(renderToString(<DeparturesList />));
    const list = $('div.departures-list');
    expect(list.length).toBe(1);
});

it('renders a table header', () => {
    const $ = dom.load(renderToString(<DeparturesList />));
    const listHeader = $('div.departures-list-header');
    expect(listHeader.length).toBe(1);
});

it('renders a header with text Departure', () => {
    const $ = dom.load(renderToString(<DeparturesList />));
    const headerText = $('.time-header').text();
    expect(headerText).toBe('Leaves');
});

it('renders a header with text Route', () => {
    const $ = dom.load(renderToString(<DeparturesList />));
    const headerText = $('.route-header').text();
    expect(headerText).toBe('Route');
});

it('renders a header with text Destination', () => {
    const $ = dom.load(renderToString(<DeparturesList />));
    const headerText = $('.destination-header').text();
    expect(headerText).toBe('Destination');
});

it('renders a header with text Distance', () => {
    const $ = dom.load(renderToString(<DeparturesList />));
    const headerText = $('.distance-header').text();
    expect(headerText).toBe('Distance');
});

it('renders a placeholder row when departures list is empty', () => {
    const $ = dom.load(renderToString(<DeparturesList departures={[]}/>));
    const rows = $('.departures-list-body').children();
    expect(rows.length).toBe(1);
    expect(rows.eq(0).hasClass('no-results')).toBe(true);
});

it('renders as many table body rows as there are departures', () => {
    const departures = [{ id: '1' }, { id: '2' }];
    const $ = dom.load(renderToString(<DeparturesList departures={departures}/>));
    const rows = $('.departures-list-body').children();
    expect(rows.length).toBe(departures.length);
});







