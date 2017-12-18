import { renderToString } from 'inferno-server';
import { renderIntoDocument, findRenderedDOMElementWithClass } from 'inferno-test-utils';
import dom from 'cheerio';
import DepartureRow from './departurerow';

it('renders a list item', () => {
  const $ = dom.load(renderToString(<DepartureRow />));
  const tableRow = $('li.departures-list-row-container');
  expect(tableRow.length).toBe(1);
});

it('renders route name', () => {
  const routeName = '58B';
  const $ = dom.load(renderToString(<DepartureRow routeName={routeName}/>));
  const output = $('.routename').text();
  expect(output).toEqual(routeName);
});

it('renders route destination', () => {
  const destination = 'Katajanokka';
  const $ = dom.load(renderToString(<DepartureRow destination={destination}/>));
  const output = $('.destination').text();
  expect(output).toEqual(destination);
});

it('renders distance', () => {
  const distance = 100;
  const $ = dom.load(renderToString(<DepartureRow distance={distance}/>));
  const output = $('.distance').text();
  expect(output).toEqual(`${distance} m`);
});

it('is a link to given routeUrl', () => {
  const url ='http://reittiopas.fi/';
  const $ = dom.load(renderToString(<DepartureRow routeUrl={url} />));
  const aHref = $('a').eq(0).attr('href');
  expect(aHref).toEqual(url);
});

it('does not have an aria-extended prop when content is hidden', () => {
  const id = "abc123";
  const $ = dom.load(renderToString(<DepartureRow />));
  const expected = $('.departures-list-row-container').attr('aria-expanded');
  expect(expected).toEqual();
});

describe('displaying departure time', () => {
  it('displays departure time', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={false} />));
    const output = $('.time').text();
    expect(output).toEqual('12:12');
  });

  it('does not add realtime class to cell when realtime is false ', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={false} />));
    const result = $('.time').is('.realtime');
    expect(result).toEqual(false);
  });

  it('displays estimated departure time when available', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={true} />));
    const output = $('.time').text();
    expect(output).toEqual('12:12');
  });

  it('adds realtime class to cell when realtime is true', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={true} />));
    const result = $('.time').is('.realtime');
    expect(result).toEqual(true);
  });
});

describe('Togglable additional info section', () => {
  it('renders a section for additional info ', () => {
    const $ = dom.load(renderToString(<DepartureRow />));
    const expected = $('.departures-list-row-additional-info').length;
    expect(expected).toEqual(1);
  });

  it('is hidden when content is not toggled', () => {
    const $ = dom.load(renderToString(<DepartureRow />));
    const section = $('.departures-list-row-additional-info');
    expect(section.is('.visible')).toEqual(false);
    expect(section.prop('aria-hidden')).not.toEqual();
  });

  it('is hidden when content is not toggled', () => {
    const rendered = renderIntoDocument(<DepartureRow />);
    const additionalInfo = findRenderedDOMElementWithClass(rendered, 'departures-list-row-additional-info');
    expect(additionalInfo.getAttribute('aria-hidden')).toEqual('true');
  });

  it('shows the additional info section when the row is clicked', () => {
    const rendered = renderIntoDocument(<DepartureRow />);
    const container = findRenderedDOMElementWithClass(rendered, 'departures-list-row-container');
    const item = findRenderedDOMElementWithClass(rendered, 'departures-list-row');

    const event = new MouseEvent('click', { bubbles: true });
    item.dispatchEvent(event);

    const additionalInfo = findRenderedDOMElementWithClass(rendered, 'departures-list-row-additional-info');
    expect(additionalInfo.getAttribute('aria-hidden')).toEqual('false');
    expect(container.getAttribute('aria-expanded')).toEqual('true');
  });
});




