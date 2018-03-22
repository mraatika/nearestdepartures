import { scryRenderedVNodesWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import { renderIntoDocument } from '../../utils/testutils';
import IconButton from '../iconbutton/iconbutton';
import dom from 'cheerio';
import Favourites from './favourites';

jest.mock('../../services/storageservice');

it('renders a div element', () => {
  const $ = dom.load(renderToString(<Favourites />));
  const element = $('div.favourites');
  expect(element.length).toEqual(1);
});

it('renders an empty star icon button when the current address is not added to favourites', () => {
  const $ = dom.load(renderToString(<Favourites />));
  const element = $('.favourites-toggle');
  expect(element.text()).toEqual('☆');
});

it('renders a star icon button when the current address is added to favourites', () => {
  const $ = dom.load(renderToString(<Favourites isCurrentAddressFavoured />));
  const element = $('.favourites-toggle');
  expect(element.text()).toEqual('★');
});

it('disables the toggle button when address is falsy', () => {
  const $ = dom.load(renderToString(<Favourites />));
  const element = $('.favourites-toggle');
  expect(element.is(':disabled')).toEqual(true);
});

it('marks the toggle button pressed with aria-pressed when the current address is added to favourites', () => {
  const $ = dom.load(renderToString(<Favourites isCurrentAddressFavoured />));
  const element = $('.favourites-toggle');
  expect(element.prop('aria-pressed')).not.toBe(undefined);
});

it('renders a triangle icon button', () => {
  const $ = dom.load(renderToString(<Favourites />));
  const element = $('.favourites-open');
  expect(element.text()).toEqual('▼');
});

it('marks the dialog open button pressed with aria-pressed when the dialog is open', () => {
  const $ = dom.load(renderToString(<Favourites isDialogVisible />));
  const element = $('.favourites-open');
  expect(element.prop('aria-pressed')).not.toBe(undefined);
});

it('renders a dialog element', () => {
  const $ = dom.load(renderToString(<Favourites />));
  const element = $('.modal');
  expect(element.length).toEqual(1);
});

it('calls toggleFavourite callback when the toggle button is clicked', () => {
  const spy = jest.fn();
  const rendered = renderIntoDocument(<Favourites address={{}} toggleFavourite={spy} />);
  const button = scryRenderedVNodesWithType(rendered, IconButton)[0];
  const event = new MouseEvent('click', { bubbles: true });
  button.dom.dispatchEvent(event);
  expect(spy).toHaveBeenCalled();
});

it('calls toggleFavourite callback when the toggle button is clicked', () => {
  const spy = jest.fn();
  const rendered = renderIntoDocument(<Favourites toggleDialog={spy} />);
  const button = scryRenderedVNodesWithType(rendered, IconButton)[1];
  const event = new MouseEvent('click', { bubbles: true });
  button.dom.dispatchEvent(event);
  expect(spy).toHaveBeenCalled();
});
