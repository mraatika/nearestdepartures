import { renderIntoDocument, findRenderedVNodeWithType, scryRenderedVNodesWithType } from 'inferno-test-utils';
import AddressSearch from './index';
import * as model from './model';
import { LOCATION_MAGIC_WORD } from '../../constants/constants';

jest.mock('./model');
jest.mock('../../services/addresssearchservice');

beforeEach(() => {
  model.findAddressByCurrentLocation = jest.fn(() => Promise.resolve());
  model.findAddressBySearchTerm = jest.fn(() => Promise.resolve());
});

it('sets input value to state onInput', () => {
  const tree = <AddressSearch />;
  const rendered = renderIntoDocument(tree);
  const input = findRenderedVNodeWithType(rendered, 'input');
  const val = 'searchterm';

  input.dom.value = val;
  const event = new Event('input');
  input.dom.dispatchEvent(event);

  expect(tree.children.state.searchTerm).toEqual(val);
});

describe('onComponentWillReceiveProps', () => {
  it('should change address in state when address props change', () => {
    const address = { label: 'Street 1, City' };
    const tree = <AddressSearch address={address} />;
    renderIntoDocument(tree);
    expect(tree.children.state.searchTerm).toEqual(address.label);

    const newAddress = { label: 'Street 2, City' };
    tree.children.componentWillReceiveProps({  address: newAddress });
    expect(tree.children.state.searchTerm).toEqual(newAddress.label);
  });

  it('should clear last selected suggestion when address changes', () => {
    const tree = <AddressSearch address="Street 1, City" />;
    renderIntoDocument(tree);
    tree.children.state.selectedSuggestion = {};

    tree.children.componentWillReceiveProps({  address: 'Street 2, City' });
    expect(tree.children.state.selectedSuggestion).toEqual(undefined);
  });

  it('should not clear last selected suggestion if address is the same', () => {
    const value = 'Street 1, City';
    const tree = <AddressSearch address={value} />;
    renderIntoDocument(tree);
    tree.children.state.selectedSuggestion = {};

    tree.children.componentWillReceiveProps({  address: value });
    expect(tree.children.state.selectedSuggestion).not.toEqual(null);
  });
});

describe('submitting', () => {
  it('calls onSearch when form is submitted', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const form = findRenderedVNodeWithType(rendered, 'form');

    const event = new Event('submit', { bubbles: true });
    form.dom.dispatchEvent(event);

    return Promise
      .resolve()
      .then(() => expect(spy).toHaveBeenCalled());
  });

  it('calls onSearch when submit button is clicked', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const button = scryRenderedVNodesWithType(rendered, 'button')[1];

    // trigger click event
    const clickEvent = new MouseEvent('click');
    button.dom.dispatchEvent(clickEvent);

    return Promise
      .resolve()
      .then(() => expect(spy).toHaveBeenCalled());
  });

  it('calls onSearch with address received from the address service if no suggestion is selected', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const input = findRenderedVNodeWithType(rendered, 'input');
    const val = 'searchterm';
    const address = { label: 'searchterm street 23' };

    model.findAddressBySearchTerm.mockReturnValueOnce(Promise.resolve(address));

    // trigger input event on search field
    input.dom.value = val;
    const inputEvent = new UIEvent('input');
    input.dom.dispatchEvent(inputEvent);

    const event = new Event('submit', { bubbles: true });
    component.dom.dispatchEvent(event);

    return Promise
      .resolve()
      .then(() => expect(spy).toHaveBeenCalledWith(address));
  });

  it('calls findAddressBySearchTerm with search term and then onSearch w/ value received from the service when search term is present', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const input = findRenderedVNodeWithType(rendered, 'input');
    const val = 'searchterm';
    const address = { label: 'searchterm street 23' };

    model.findAddressBySearchTerm.mockReturnValueOnce(Promise.resolve(address));

    // trigger input event on search field
    input.dom.value = val;
    const inputEvent = new UIEvent('input');
    input.dom.dispatchEvent(inputEvent);

    const event = new Event('submit', { bubbles: true });
    component.dom.dispatchEvent(event);

    return Promise
      .resolve()
      .then(() => {
        expect(model.findAddressBySearchTerm).toHaveBeenCalledWith(val);
        expect(spy).toHaveBeenCalledWith(address);
      });
  });

  it('calls findAddressByCurrentLocation when search term is LOCATION_MAGIC_WORD', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const input = findRenderedVNodeWithType(rendered, 'input');
    const val = LOCATION_MAGIC_WORD;

    model.findAddressByCurrentLocation.mockClear();

    // trigger input event on search field
    input.dom.value = val;
    const inputEvent = new UIEvent('input');
    input.dom.dispatchEvent(inputEvent);

    const event = new Event('submit', { bubbles: true });
    component.dom.dispatchEvent(event);

    expect(model.findAddressByCurrentLocation).toHaveBeenCalledTimes(1);
  });

  it('calls findAddressByCurrentLocation when search term is undefined and then onSearch w/ value received from the service', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const address = { label: 'searchterm street 23' };

    model.findAddressByCurrentLocation.mockReturnValueOnce(Promise.resolve(address));

    const event = new Event('submit', { bubbles: true });
    component.dom.dispatchEvent(event);

    return Promise
      .resolve()
      .then(() => {
        expect(model.findAddressByCurrentLocation).toHaveBeenCalledWith();
        expect(spy).toHaveBeenCalledWith(address);
      });
  });

  it('hides suggestions after submit', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);

    component.children.state.suggestions = [{}, {}];

    const event = new Event('submit', { bubbles: true });
    component.dom.dispatchEvent(event);

    expect(component.children.state.suggestions).toEqual([]);
  });

  it('does not clear selected suggestion after submit', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const selectedSuggestion = {};

    component.children.state.selectedSuggestion = selectedSuggestion;

    const event = new Event('submit', { bubbles: true });
    component.dom.dispatchEvent(event);

    expect(component.children.state.selectedSuggestion).toBe(selectedSuggestion);
  });
});

describe('suggestions', () => {

  beforeEach(() => {
    model.selectNextSuggestion = jest.fn();
    model.selectPrevSuggestion = jest.fn();
  });

  afterEach(() => {
    model.selectNextSuggestion.mockClear();
    model.selectPrevSuggestion.mockClear();
  });

  it('clears suggestions when esc is pressed', () => {
    const rendered = renderIntoDocument(<AddressSearch />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);

    component.children.state.suggestions = [{}, {}];

    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 27 });
    component.dom.dispatchEvent(event);

    expect(component.children.state.suggestions).toEqual([]);
  });

  it('does not clear selected suggestion when esc is pressed', () => {
    const rendered = renderIntoDocument(<AddressSearch />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const selectedSuggestion = {};

    component.children.state.selectedSuggestion = selectedSuggestion;

    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 27 });
    component.dom.dispatchEvent(event);

    expect(component.children.state.selectedSuggestion).toEqual(selectedSuggestion);
  });

  it('clears selected suggestion when value in input is changed', () => {
    const rendered = renderIntoDocument(<AddressSearch />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const input = findRenderedVNodeWithType(rendered, 'input');

    component.children.state.selectedSuggestion = {};

    input.dom.value = 'abc';
    const inputEvent = new Event('input');
    input.dom.dispatchEvent(inputEvent);

    expect(component.children.state.selectedSuggestion).toEqual(undefined);
  });

  it('selects next suggestion when down key is pressed', () => {
    const rendered = renderIntoDocument(<AddressSearch />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 40 });
    component.dom.dispatchEvent(event);

    expect(model.selectNextSuggestion).toHaveBeenCalledWith(component.children.state);
  });

  it('selects previous suggestion when up is pressed', () => {
    const rendered = renderIntoDocument(<AddressSearch />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 38 });
    component.dom.dispatchEvent(event);

    expect(model.selectPrevSuggestion).toHaveBeenCalledWith(component.children.state);
  });
});

