import { renderToString } from 'inferno-server';
import { findRenderedDOMElementWithClass } from 'inferno-test-utils';
import dom from 'cheerio';
import { renderIntoDocument } from '../../utils/testutils';
import FavouritesDialog from './favouritesdialog';


it('should be visible if isVisible is true', () => {
  const $ = dom.load(renderToString(<FavouritesDialog isVisible={true} />));
  const element = $('.favourites-modal-wrapper');
  expect(element).toHaveLength(1);
  expect(element.is('.visible')).toEqual(true);
});

it('should not be visible if isVisible is false', () => {
  const $ = dom.load(renderToString(<FavouritesDialog isVisible={false} />));
  const element = $('.favourites-modal-wrapper');
  expect(element.is('.visible')).toEqual(false);
});

it('should have a heading', () => {
  const $ = dom.load(renderToString(<FavouritesDialog isVisible={true} />));
  const element = $('.favourites-modal-wrapper h2');
  expect(element).toHaveLength(1);
});

it('should have a close button', () => {
  const $ = dom.load(renderToString(<FavouritesDialog isVisible={true} />));
  const element = $('button.favouriteslist-close-button');
  expect(element).toHaveLength(1);
});

it('calls onClose callback when the close button is clicked', () => {
  const spy = jest.fn();
  const tree = <FavouritesDialog isVisible={true} onClose={spy} />;
  renderIntoDocument(tree);
  const button = findRenderedDOMElementWithClass(tree, 'favouriteslist-close-button');

  const event = new MouseEvent('click', { bubbles: true });
  button.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});

it('prevents body from scrolling when opened', () => {
  const tree = <FavouritesDialog isVisible={true} />;
  renderIntoDocument(tree);

  tree.children.componentDidUpdate({isVisible: false});
  expect(document.body.className.indexOf('no-scroll')).not.toEqual(-1);

  document.body.removeEventListener('keyup', tree.children.onKeyUp);
});

it('calls onClose callback when the close button is clicked', () => {
  const spy = jest.fn();
  const tree = <FavouritesDialog isVisible={true} onClose={spy} />;
  renderIntoDocument(tree);

  tree.children.componentDidUpdate({isVisible: false});

  const event = new KeyboardEvent('keyup', { bubbles: true, key: 'Escape', keyCode: 27 });
  document.body.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();

  document.body.removeEventListener('keyup', tree.children.onKeyUp);
});

describe('without favourites', () => {
  it('should render a placeholder row', () => {
    const $ = dom.load(renderToString(<FavouritesDialog isVisible={true} />));
    const element = $('.favouriteslist-placeholder');
    expect(element).toHaveLength(1);
  });

  it('should not move focus from the close button with tab', () => {
    const tree = <FavouritesDialog isVisible={true} />;
    renderIntoDocument(tree);

    const closeButton = findRenderedDOMElementWithClass(tree, 'favouriteslist-close-button');
    tree.children.componentDidUpdate({isVisible: false});

    const event = new KeyboardEvent('keydown', { bubbles: true, keyCode: 9 });
    closeButton.dispatchEvent(event);

    tree.children.clearFocus();
    expect(document.activeElement).toEqual(closeButton);
  });

  it('should not move focus from the close button with shift+tab', () => {
    const tree = <FavouritesDialog isVisible={true} />;
    renderIntoDocument(tree);

    const closeButton = findRenderedDOMElementWithClass(tree, 'favouriteslist-close-button');
    tree.children.componentDidUpdate({isVisible: false});

    const event = new KeyboardEvent('keydown', { bubbles: true, keyCode: 9, shiftKey: true });
    closeButton.dispatchEvent(event);

    tree.children.clearFocus();
    expect(document.activeElement).toEqual(closeButton);
  });
});

describe('with favourites', () => {
  it('should render given favoured addresses', () => {
    const favourites = [{label: 'Street 1, City'}, {label: 'Street 2, City'}];
    const $ = dom.load(renderToString(<FavouritesDialog {...{isVisible: true, favourites}} />));
    const listItems = $('.favouriteslist li');
    expect(listItems).toHaveLength(favourites.length);
  });

  it('should mark the selected address', () => {
    const favourites = [{label: 'Street 1, City'}, {label: 'Street 2, City'}];
    const selectedAddress = favourites[0];
    const $ = dom.load(renderToString(<FavouritesDialog {...{isVisible: true, favourites, selectedAddress}} />));
    const element = $('.favourites-modal-wrapper li.selected');
    expect(element).toHaveLength(1);
  });

  it('should move focus from the last remove button to close', () => {
    const favourites = [{label: 'Street 1, City'}];
    const tree = <FavouritesDialog isVisible={true} favourites={favourites} />;
    renderIntoDocument(tree);

    tree.children.componentDidUpdate({isVisible: false});
    const closeButton = findRenderedDOMElementWithClass(tree, 'favouriteslist-close-button');
    const removeButton = findRenderedDOMElementWithClass(tree, 'favouriteslist-item-remove');

    const event = new KeyboardEvent('keydown', { bubbles: true, keyCode: 9 });
    removeButton.dispatchEvent(event);

    tree.children.clearFocus();
    expect(document.activeElement).toEqual(closeButton);
  });

  it('should move focus from the close button to remove button with shift+tab', () => {
    const favourites = [{label: 'Street 1, City'}];
    const tree = <FavouritesDialog isVisible={true} favourites={favourites} />;
    renderIntoDocument(tree);

    const closeButton = findRenderedDOMElementWithClass(tree, 'favouriteslist-close-button');
    const removeButton = findRenderedDOMElementWithClass(tree, 'favouriteslist-item-remove');
    tree.children.componentDidUpdate({isVisible: false});

    const event = new KeyboardEvent('keydown', { bubbles: true, keyCode: 9, shiftKey: true });
    closeButton.dispatchEvent(event);

    expect(document.activeElement).toEqual(removeButton);
  });
});

