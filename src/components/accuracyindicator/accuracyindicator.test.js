import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import AccuracyIndicator from './index';

const indicatorText = i => `!Paikannuksen tarkkuus: ${i}m`;

it('renders a div', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator />));
  const indicator = $('div.location-accuracy');
  expect(indicator.length).toBe(1);
});

it('renders an exclamation mark !', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator />));
  const indicator = $('div.location-accuracy');
  expect(indicator.text().indexOf('!') > -1).toBe(true);
});

it('has class danger if accuracy is greater than 500', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={501} />));
  const indicator = $('div.location-accuracy');
  expect(indicator.is('.danger')).toBe(true);
});

it('has class danger when given an error', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator error={new Error()} />));
  const indicator = $('div.location-accuracy');
  expect(indicator.is('.danger')).toBe(true);
});

it('displays the error message when given an error', () => {
  const errorText = 'Paikannus epäonnistui: Sijainnin haku on estetty tai kytketty pois';
  const $ = dom.load(renderToString(<AccuracyIndicator error={new Error(errorText)} />));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(`!${errorText}`);
});

it('has class warning if accuracy is greater than 100', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={500} />));
  const indicator = $('div.location-accuracy');
  expect(indicator.is('.warning')).toBe(true);
});

it('has no extra class if accuracy is greater equal to or less than 100', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={100} />));
  const indicator = $('div.location-accuracy');
  expect(indicator.is('.warning')).toBe(false);
  expect(indicator.is('.danger')).toBe(false);
});

it('has no extra class if accuracy is greater equal to or less than 100', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={100} />));
  const indicator = $('div.location-accuracy');
  expect(indicator.is('.warning')).toBe(false);
  expect(indicator.is('.danger')).toBe(false);
});

it('renders 0 as accuracy if not defined', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator />));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(indicatorText(0));
});

it('renders 0 as accuracy if given a invalid string', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={'Seppo'}/>));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(indicatorText(0));
});

it('renders 0 as accuracy if given null', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={null}/>));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(indicatorText(0));
});

it('renders given number as accuracy', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={100}/>));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(indicatorText(100));
});

it('rounds number down to nearest integer', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={100.192012}/>));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(indicatorText(100));
});

it('rounds number up to nearest integer', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={100.892012}/>));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(indicatorText(101));
});

it('converts string to number', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={'100'}/>));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(indicatorText(100));
});

it('renders an error', () => {
  const $ = dom.load(renderToString(<AccuracyIndicator accuracy={'100'}/>));
  const indicator = $('div.location-accuracy');
  expect(indicator.text()).toEqual(indicatorText(100));
});
