import { findRenderedVNodeWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import { renderIntoDocument } from '../../utils/testutils';
import DeparturesList from './departureslist';
import DepartureRow from './departurerow';
import LoadingOverlay from '../loadingoverlay/loadingoverlay';

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

it('renders a header with text Lähtee', () => {
  const $ = dom.load(renderToString(<DeparturesList />));
  const headerText = $('.time').text();
  expect(headerText).toBe('Lähtee');
});

it('renders a header with text Linja', () => {
  const $ = dom.load(renderToString(<DeparturesList />));
  const headerText = $('.routename').text();
  expect(headerText).toBe('Linja');
});

it('renders a header with text Määränpää', () => {
  const $ = dom.load(renderToString(<DeparturesList />));
  const headerText = $('.destination').text();
  expect(headerText).toBe('Määränpää');
});

it('renders a header with text Pysäkille', () => {
  const $ = dom.load(renderToString(<DeparturesList />));
  const headerText = $('.distance').text();
  expect(headerText).toBe('Pysäkille');
});

it('renders a list for departure rows', () => {
  const $ = dom.load(renderToString(<DeparturesList />));
  const expected = $('ul.departures-list-body').length;
  expect(expected).toBe(1);
});

it('renders a placeholder item when departures list is empty', () => {
  const $ = dom.load(renderToString(<DeparturesList departures={[]}/>));
  const rows = $('.departures-list-body').children();
  expect(rows.length).toBe(1);
  expect(rows.eq(0).hasClass('no-results')).toBe(true);
});

it('renders as many departure rows as there are departures', () => {
  const departures = [{ id: '1' }, { id: '2' }];
  const $ = dom.load(renderToString(<DeparturesList departures={departures}/>));
  const rows = $('.departures-list-body').children();
  expect(rows.length).toBe(departures.length);
});

it('passes disruptions for departure row if found for that particular departure', () => {
  const routeId = 'HSL:200A';
  const departures = [{ id: '1', routeId }];
  const disruptions = { [routeId]: [{}] };
  const tree = <DeparturesList departures={departures} disruptions={disruptions} />;
  renderIntoDocument(tree);
  const departure = findRenderedVNodeWithType(tree, DepartureRow);
  expect(departure.props.disruptions).toEqual(disruptions[routeId]);
});

it('renders a loading overlay', () => {
  const tree = <DeparturesList />;
  renderIntoDocument(tree);
  const overlay = findRenderedVNodeWithType(tree, LoadingOverlay);
  expect(overlay.type).toBe(LoadingOverlay);
});

it('pass loading state to overlay', () => {
  const tree = <DeparturesList isLoading={true}/>;
  renderIntoDocument(tree);
  const overlay = findRenderedVNodeWithType(tree, LoadingOverlay);
  expect(overlay.props.show).toBe(true);
});
