import { renderIntoDocument, findRenderedDOMElementWithClass, findRenderedDOMElementWithTag } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import AddressSearch from './addresssearch';

it('renders a form', () => {
  const $ = dom.load(renderToString(<AddressSearch />));
  const element = $('form');
  expect(element.length).toEqual(1);
});

it('renders a text input', () => {
  const $ = dom.load(renderToString(<AddressSearch />));
  const input = $('input[type=text]');
  expect(input.length).toEqual(1);
});

it('text input takes a default value', () => {
  const label = 'StreetAddress 123';
  const $ = dom.load(renderToString(<AddressSearch searchTerm={label} />));
  const labelText = $('input').val();
  expect(labelText).toEqual(label);
});

it('text input has placeholder', () => {
  const $ = dom.load(renderToString(<AddressSearch />));
  const labelText = $('input').attr('placeholder');
  expect(labelText).toEqual('Hae paikannuksella, osoitteella tai paikannimellä...');
});

it('renders a submit button', () => {
  const $ = dom.load(renderToString(<AddressSearch />));
  const button = $('button[type=submit]');
  expect(button.length).toEqual(1);
});

it('renders a submit button with text', () => {
  const $ = dom.load(renderToString(<AddressSearch />));
  const buttonText = $('button[type=submit]').text();
  expect(buttonText).toEqual('Hae');
});

it('renders a clear button', () => {
  const $ = dom.load(renderToString(<AddressSearch />));
  const button = $('button.address-search-clear');
  expect(button.length).toEqual(1);
});

it('renders a submit button with X', () => {
  const $ = dom.load(renderToString(<AddressSearch />));
  const buttonText = $('button.address-search-clear').text();
  expect(buttonText.toLocaleLowerCase()).toEqual('x');
});

it('calls onSearchTerm callback when input field\'s value changes', () => {
  const spy = jest.fn();
  const tree = <AddressSearch onSearchTermChange={spy} />;
  const rendered = renderIntoDocument(tree);
  const input = findRenderedDOMElementWithTag(rendered, 'input');
  const val = 'searchterm';

  input.value = val;
  const event = new Event('input');
  input.dispatchEvent(event);

  expect(spy).toHaveBeenCalledWith(event);
});

it('calls getAddressInputRef with the input field', () => {
  const spy = jest.fn();
  const tree = <AddressSearch getAddressInputRef={spy} />;
  const rendered = renderIntoDocument(tree);
  const input = findRenderedDOMElementWithTag(rendered, 'input');
  expect(spy).toHaveBeenCalledWith(input);
});

it('calls onBlur callback when input field losts focus', () => {
  const spy = jest.fn();
  const tree = <AddressSearch onBlur={spy} />;
  const rendered = renderIntoDocument(tree);
  const input = findRenderedDOMElementWithTag(rendered, 'input');

  const event = new Event('blur');
  input.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});

it('calls onClearAddressClick callback when the clear address button is clicked', () => {
  const spy = jest.fn();
  const tree = <AddressSearch onClearAddressClick={spy} />;
  const rendered = renderIntoDocument(tree);
  const button = findRenderedDOMElementWithClass(rendered, 'address-search-clear');

  const event = new MouseEvent('click', { bubbles: true });
  button.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});

it('calls onSubmit callback when the form is submitted', () => {
  const spy = jest.fn();
  const tree = <AddressSearch onSubmit={spy} />;
  const rendered = renderIntoDocument(tree);
  const form = findRenderedDOMElementWithTag(rendered, 'form');

  const event = new Event('submit', { bubbles: true });
  form.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});

it('calls onSubmit callback when the submit button is clicked', () => {
  const spy = jest.fn();
  const tree = <AddressSearch onSubmit={spy} />;
  const rendered = renderIntoDocument(tree);
  const button = findRenderedDOMElementWithClass(rendered, 'address-search-submit');

  const event = new MouseEvent('click');
  button.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});
