import { findRenderedVNodeWithType } from 'inferno-test-utils';
import { renderIntoDocument } from '../../utils/testutils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import ErrorMessage from './errormessage';
import { NetworkError } from '../../utils/utils';

it('renders div', () => {
  const $ = dom.load(renderToString(<ErrorMessage error={new Error()} />));
  const element = $('div');
  expect(element.length).toEqual(1);
});

it('has class error-message', () => {
  const $ = dom.load(renderToString(<ErrorMessage error={new Error()} />));
  const element = $('div');
  expect(element.hasClass('error-message')).toEqual(true);
});

it('is hidden if message is not given', () => {
  const $ = dom.load(renderToString(<ErrorMessage />));
  const element = $('div');
  expect(element.hasClass('hidden')).toEqual(true);
});

it('renders an error message', () => {
  const message = 'An error happened!';
  const $ = dom.load(renderToString(<ErrorMessage error={new Error(message)} />));
  const element = $('div');
  expect(element.text().indexOf(message)).not.toEqual(-1);
});

it('sets element visible when error message is defined', () => {
  const message = 'An error happened!';
  const $ = dom.load(renderToString(<ErrorMessage error={new Error(message)} />));
  const element = $('div');
  expect(element.hasClass('hidden')).toEqual(false);
});

it('renders a close button', () => {
  const $ = dom.load(renderToString(<ErrorMessage error={new Error()} />));
  const button = $('.close-button');
  expect(button.length).toEqual(1);
});

it('close button text is x', () => {
  const $ = dom.load(renderToString(<ErrorMessage error={new Error()} />));
  const button = $('.close-button');
  expect(button.text()).toEqual('x');
});

it('calls onClick callback when clicked', () => {
  const spy = jest.fn();
  const tree = renderIntoDocument(<ErrorMessage onClick={spy} error={new Error()} />);
  const element = findRenderedVNodeWithType(tree, 'div');

  const event = new MouseEvent('click', { bubbles: true });
  element.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});

it('gets focus when mounted', () => {
  const tree = renderIntoDocument(<ErrorMessage error={new Error()} />);
  const element = findRenderedVNodeWithType(tree, 'div');
  expect(document.activeElement).toEqual(element.dom);
});

it('renders a special message if error type is NetworkError', () => {
  const message = 'TestMessage.';
  const $ = dom.load(renderToString(<ErrorMessage error={new NetworkError(message)} />));
  const messageContainer = $('.error-message-content');
  expect(messageContainer.text()).toEqual(`${message} Tulostettavat aikataulut löydät täältä.`);
});
