import { scryRenderedVNodesWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import { renderIntoDocument } from '../../utils/testutils';
import dom from 'cheerio';
import FavouritestListItem from './favouriteslistitem';

it('renders a list item element', () => {
  const $ = dom.load(renderToString(<FavouritestListItem address={{}} />));
  const element = $('li.favouriteslist-item');
  expect(element.length).toEqual(1);
});

it('has a selected class if the item is selected', () => {
  const $ = dom.load(renderToString(<FavouritestListItem address={{}} isSelected />));
  const element = $('li.favouriteslist-item.selected');
  expect(element.length).toEqual(1);
});

it('does not have a selected class if the item is not selected', () => {
  const $ = dom.load(renderToString(<FavouritestListItem address={{}} />));
  const element = $('li.favouriteslist-item');
  expect(element.is('.selected')).toEqual(false);
});

it('renders label as a button element', () => {
  const label = 'HeaderText';
  const $ = dom.load(renderToString(<FavouritestListItem address={{ label }} />));
  const element = $('.favouriteslist-item-label');
  expect(element.text()).toEqual(label);
});

it('calls selectFavourite callback when the label is clicked', () => {
  const spy = jest.fn();
  const address = { label: 'Address' };
  const tree = <FavouritestListItem address={address} selectFavourite={spy} />;
  renderIntoDocument(tree);
  const button = scryRenderedVNodesWithType(tree, 'button')[0];

  const event = new MouseEvent('click', { bubbles: true });
  button.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalledWith(address, event);
});

it('renders a close button with text x', () => {
  const $ = dom.load(renderToString(<FavouritestListItem address={{}} />));
  const element = $('.favouriteslist-item-remove');
  expect(element.prop('aria-label')).toEqual('Poista Omat suosikit -listalta');
});

it('calls removeFavourite callback when the close button is clicked', () => {
  const spy = jest.fn();
  const address = { label: 'Address' };
  const tree = <FavouritestListItem address={address} removeFavourite={spy} />;
  renderIntoDocument(tree);
  const button = scryRenderedVNodesWithType(tree, 'button')[1];

  const event = new MouseEvent('click', { bubbles: true });
  button.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalledWith(address, event);
});
