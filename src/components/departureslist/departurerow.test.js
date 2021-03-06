import { renderToString } from 'inferno-server';
import { findRenderedDOMElementWithClass, scryRenderedDOMElementsWithTag } from 'inferno-test-utils';
import dom from 'cheerio';
import { renderIntoDocument } from '../../utils/testutils';
import DepartureRow from './departurerow';

it('renders a list item', () => {
  const $ = dom.load(renderToString(<DepartureRow />));
  const tableRow = $('div.departures-list-row-container');
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

it('does not have an aria-extended prop when content is not toggled', () => {
  const $ = dom.load(renderToString(<DepartureRow isToggled={false} />));
  const expected = $('.departures-list-row').attr('aria-expanded');
  expect(expected).toEqual();
});

it('has aria-extended prop when content is toggled', () => {
  const $ = dom.load(renderToString(<DepartureRow isToggled={true} />));
  const expected = $('.departures-list-row').attr('aria-expanded');
  expect(expected).not.toEqual();
});

it('has aria-controls prop', () => {
  const id = "123";
  const $ = dom.load(renderToString(<DepartureRow id={id} />));
  const expected = $('.departures-list-row').attr('aria-controls');
  expect(expected).toEqual(`departure-additional-info-${id}`);
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
    const result = $('.time').is('.color-light-green');
    expect(result).toEqual(false);
  });

  it('displays estimated departure time when available', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={true} />));
    const output = $('.time').text();
    expect(output).toEqual('12:12');
  });

  it('adds realtime class to time when realtime is true', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={true} />));
    const result = $('.time').is('.color-light-green');
    expect(result).toEqual(true);
  });
});

describe('Togglable additional info section', () => {
  it('renders a section for additional info ', () => {
    const $ = dom.load(renderToString(<DepartureRow isToggled={true} />));
    const expected = $('.departures-list-row-additional-info').length;
    expect(expected).toEqual(1);
  });

  it('has an id', () => {
    const id = '123';
    const $ = dom.load(renderToString(<DepartureRow id={id} isToggled={true} />));
    const expected = $('.departures-list-row-container').find(`#departure-additional-info-${id}`);
    expect(expected.length).toEqual(1);
  });

  it('is hidden when content is not toggled', () => {
    const $ = dom.load(renderToString(<DepartureRow isToggled={false} />));
    const section = $('.departures-list-row-additional-info');
    expect(section.length).toEqual(0);
  });

  it('calls the onRowToggle callback when clicked', () => {
    const spy = jest.fn();
    const id = 'abc123';
    const tree = <DepartureRow id={id} onRowToggle={spy} />;
    renderIntoDocument(tree);
    const item = findRenderedDOMElementWithClass(tree, 'departures-list-row');

    const event = new MouseEvent('click', { bubbles: true });
    item.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith(id, event);
  });

  it('does not call the onRowToggle callback when route identifier is clicked', () => {
    const spy = jest.fn();
    const id = 'abc123';
    const tree = <DepartureRow id={id} onRowToggle={spy} />;
    renderIntoDocument(tree);
    const routeIdentifier = scryRenderedDOMElementsWithTag(tree, 'a')[0];

    const event = new MouseEvent('click', { bubbles: true });
    routeIdentifier.dispatchEvent(event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('calls the onRowToggle callback when enter is pressed', () => {
    const spy = jest.fn();
    const id = 'abc123';
    const tree = <DepartureRow id={id} onRowToggle={spy} />;
    renderIntoDocument(tree);
    const item = findRenderedDOMElementWithClass(tree, 'departures-list-row');

    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 13 });
    item.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith(id);
  });

  it('calls the onRowToggle callback when space is pressed on the row element', () => {
    const spy = jest.fn();
    const id = 'abc123';
    const tree = <DepartureRow id={id} onRowToggle={spy} />;
    renderIntoDocument(tree);
    const item = findRenderedDOMElementWithClass(tree, 'departures-list-row');

    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 32 });
    item.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith(id);
  });

  it('calls the onRowToggle callback when enter is pressed on the row element', () => {
    const spy = jest.fn();
    const id = 'abc123';
    const tree = <DepartureRow id={id} onRowToggle={spy} />;
    renderIntoDocument(tree);
    const item = findRenderedDOMElementWithClass(tree, 'departures-list-row');

    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 13 });
    item.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith(id);
  });

  it('does nothing when other keys are pressed on the row element', () => {
    const spy = jest.fn();
    const id = 'abc123';
    const tree = <DepartureRow id={id} onRowToggle={spy} />;
    renderIntoDocument(tree);
    const item = findRenderedDOMElementWithClass(tree, 'departures-list-row');

    item.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, keyCode: 27 }));
    item.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, keyCode: 76 }));
    item.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, keyCode: 14 }));

    expect(spy).not.toHaveBeenCalled();
  });

  it('calls the onRowToggle callback when esc is pressed on the additional content element', () => {
    const spy = jest.fn();
    const id = 'abc123';
    const tree = <DepartureRow id={id} onRowToggle={spy} isToggled={true} />;
    renderIntoDocument(tree);
    const item = findRenderedDOMElementWithClass(tree, 'departures-list-row-additional-info');

    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 27 });
    item.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith(id);
  });

  it('contains scheduled departure time', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow scheduledDeparture={time} realtime={false} isToggled={true} />));
    const result = $('.departures-list-row-additional-info')
      .find('.scheduled-departure')
      .text();
    expect(result).toEqual('12:12 (aikataulu)');
  });

  it('contains realtime departure time if available', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow realtimeDeparture={time} realtime={true} isToggled={true} />));
    const result = $('.departures-list-row-additional-info')
      .find('.color-light-green')
      .text();
    expect(result).toEqual('12:12 (arvioitu)');
  });

  it('does not contain realtime departure time if only scheduled time is available', () => {
    const time = new Date(2017, 0, 1, 12, 12).getTime() / 1000;
    const $ = dom.load(renderToString(<DepartureRow scheduledDeparture={time} isToggled={true} />));
    const result = $('.departures-list-row-additional-info').find('.color-light-green');
    expect(result.length).toEqual(0);
  });

  it('contains stop name', () => {
    const stopName = 'Urheilutalo';
    const $ = dom.load(renderToString(<DepartureRow stopName={stopName} isToggled={true} />));
    const result = $('.departures-list-row-additional-info')
      .find('.departure-stop-name')
      .text();
    expect(result).toEqual(stopName);
  });

  it('contains stop code', () => {
    const stopCode = '0283';
    const $ = dom.load(renderToString(<DepartureRow stopCode={stopCode} isToggled={true} />));
    const result = $('.departures-list-row-additional-info')
      .find('.departure-stop-code')
      .text();
    expect(result).toEqual(stopCode);
  });

  it('contains stop description', () => {
    const stopDescription = 'Urheilutalo';
    const $ = dom.load(renderToString(<DepartureRow stopDescription={stopDescription} isToggled={true} />));
    const result = $('.departures-list-row-additional-info')
      .find('.departure-stop-description')
      .text();
    expect(result).toEqual(stopDescription);
  });
});

describe('Disruption indication and display', () => {
  it('should not display alert if disruptions array is empty', () => {
    const $ = dom.load(renderToString(<DepartureRow disruptions={[]} />));
    expect($('.alert-icon').length).toEqual(0);
  });

  it('should display an alert icon if alert prop is defined', () => {
    const disruption = {alertHeaderText: 'Alert!'};
    const $ = dom.load(renderToString(<DepartureRow disruptions={[disruption]} />));
    const $alert = $('.alert-icon');
    expect($alert.length).toEqual(1);
    expect($alert.text()).toEqual('⚠');
    expect($alert.prop('aria-label')).toEqual('Linjalla häiriöitä: Avaa lähdön tiedot nähdäksesi lisätietoja');
  });

  it('should display alert header if defined', () => {
    const disruption = {alertHeaderText: 'Alert!'};
    const $ = dom.load(renderToString(<DepartureRow disruptions={[disruption]} isToggled={true} />));
    const $alertHeader = $('.alert-info h3');
    expect($alertHeader.length).toEqual(1);
    expect($alertHeader.text()).toEqual(disruption.alertHeaderText);
  });

  it('should not display alert header if it is falsy', () => {
    const disruption = {alertHeaderText: null};
    const $ = dom.load(renderToString(<DepartureRow disruptions={[disruption]} isToggled={true} />));
    const $alertHeader = $('.alert-info > h3');
    expect($alertHeader.length).toEqual(0);
  });

  it('should render alert header as a link if link url is defined', () => {
    const disruption = {alertHeaderText: 'Alert', alertUrl: 'http://google.com'};
    const $ = dom.load(renderToString(<DepartureRow disruptions={[disruption]} isToggled={true} />));
    const $link = $('.alert-info .disruption-alert-additional-info');
    expect($link.length).toEqual(1);
    expect($link.is('a')).toEqual(true);
    expect($link.text()).toEqual('Lisätietoja');
  });

  it('should display alert body text', () => {
    const disruption = {alertDescriptionText: 'Alert Body'};
    const $ = dom.load(renderToString(<DepartureRow disruptions={[disruption]} isToggled={true} />));
    const $alertBody = $('.alert-info > .alert-info-body');
    expect($alertBody.length).toEqual(1);
    expect($alertBody.text()).toEqual(disruption.alertDescriptionText);
  });
});
