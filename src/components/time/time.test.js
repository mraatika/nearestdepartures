import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import Time from './index';

it('renders a span element', () => {
  const $ = dom.load(renderToString(<Time />));
  const span = $('span');
  expect(span.length).toBe(1);
});

it('renders hours', () => {
  const date = new Date(2017, 2, 26, 13, 39);
  const time = date.getTime() / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result.indexOf(date.getHours())).not.toBe(-1);
});

it('renders minutes', () => {
  const date = new Date(2017, 2, 26, 13, 39);
  const time = date.getTime() / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result.indexOf(date.getMinutes())).not.toBe(-1);
});

it('separates hours and minutes with a colon', () => {
  const date = new Date(2017, 2, 26, 13, 39);
  const time = date.getTime() / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result).toBe(`${date.getHours()}:${date.getMinutes()}`);
});

it('renders zero pad hours', () => {
  const date = new Date(2017, 2, 26, 8, 39);
  const time = date.getTime() / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result).toBe(`0${date.getHours()}:${date.getMinutes()}`);
});

it('renders zero pad minutes', () => {
  const date = new Date(2017, 2, 26, 12, 9);
  const time = date.getTime() / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result).toBe(`${date.getHours()}:0${date.getMinutes()}`);
});

it('displays time if interval is 10 minutes', () => {
  const datePlusNineMinutes = new Date(2017, 0, 1, 12, 10).getTime() + (10 * 60 * 1000);
  const date = new Date(datePlusNineMinutes);
  const time = datePlusNineMinutes / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result).toBe(`${date.getHours()}:${date.getMinutes()}`);
});

it('displays time in minutes to time if interval is less than 10 minutes', () => {
  const now = Date.now();
  const nowPlusNineMinutes = now + (9 * 60 * 1000) + (15 * 1000);
  const time = nowPlusNineMinutes / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result).toBe('9 min');
});

it('rounds remaining time down to closest minute', () => {
  const now = Date.now();
  const nowPlusNineAndHalfMinutes = (now + (9 * 60 * 1000)) + (30 * 1000);
  const time = nowPlusNineAndHalfMinutes / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result).toBe('9 min');
});

it('displays text "now" if interval is less than 1 minute', () => {
  const now = Date.now();
  const nowPlus30secs = now + (30 * 1000);
  const time = nowPlus30secs / 1000;
  const $ = dom.load(renderToString(<Time time={time}/>));
  const result = $('span').text();
  expect(result).toBe('Now');
});




