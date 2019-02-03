import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import DepartureFilter from './departurefilter';

it('renders a div', () => {
  const $ = dom.load(renderToString(<DepartureFilter />));
  const div = $('div.departure-filter');
  expect(div.length).toBe(1);
});

it('renders a filter button for bus', () => {
  const filters = [ 'BUS' ];
  const $ = dom.load(renderToString(<DepartureFilter {...{filters, activeFilters: filters}} />));
  const button = $('.bg-bus');
  expect(button.length).toBe(1);
  expect(button.is('button')).toBe(true);
});

it('renders a filter button for tram', () => {
  const filters = [ 'TRAM' ];
  const $ = dom.load(renderToString(<DepartureFilter {...{filters, activeFilters: filters}} />));
  const button = $('.bg-tram');
  expect(button.length).toBe(1);
  expect(button.is('button')).toBe(true);
});

it('renders a filter tram for train', () => {
  const filters = [ 'RAIL' ];
  const $ = dom.load(renderToString(<DepartureFilter {...{filters, activeFilters: filters}} />));
  const button = $('.bg-rail');
  expect(button.length).toBe(1);
  expect(button.is('button')).toBe(true);
});

it('renders a filter tram for subway', () => {
  const filters = [ 'SUBWAY' ];
  const $ = dom.load(renderToString(<DepartureFilter {...{filters, activeFilters: filters}} />));
  const button = $('.bg-subway');
  expect(button.length).toBe(1);
  expect(button.is('button')).toBe(true);
});

it('renders a filter tram for ferry', () => {
  const filters = [ 'FERRY' ];
  const $ = dom.load(renderToString(<DepartureFilter {...{filters, activeFilters: filters}} />));
  const button = $('.bg-ferry');
  expect(button.length).toBe(1);
  expect(button.is('button')).toBe(true);
});
