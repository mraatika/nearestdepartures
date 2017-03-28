import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import DepartureFilter from './departurefilter';

it('renders a div', () => {
    const $ = dom.load(renderToString(<DepartureFilter />));
    const div = $('div.departure-filter');
    expect(div.length).toBe(1);
});

it('renders a filter button for bus', () => {
    const $ = dom.load(renderToString(<DepartureFilter filters={[ 'BUS' ]} />));
    const button = $('.bus');
    expect(button.length).toBe(1);
    expect(button.is('button')).toBe(true);
});

it('renders a filter button for tram', () => {
    const $ = dom.load(renderToString(<DepartureFilter filters={[ 'TRAM' ]} />));
    const button = $('.tram');
    expect(button.length).toBe(1);
    expect(button.is('button')).toBe(true);
});

it('renders a filter tram for train', () => {
    const $ = dom.load(renderToString(<DepartureFilter filters={[ 'RAIL' ]} />));
    const button = $('.rail');
    expect(button.length).toBe(1);
    expect(button.is('button')).toBe(true);
});

it('renders a filter tram for subway', () => {
    const $ = dom.load(renderToString(<DepartureFilter filters={[ 'SUBWAY' ]} />));
    const button = $('.subway');
    expect(button.length).toBe(1);
    expect(button.is('button')).toBe(true);
});

it('renders a filter tram for ferry', () => {
    const $ = dom.load(renderToString(<DepartureFilter filters={[ 'FERRY' ]} />));
    const button = $('.ferry');
    expect(button.length).toBe(1);
    expect(button.is('button')).toBe(true);
});