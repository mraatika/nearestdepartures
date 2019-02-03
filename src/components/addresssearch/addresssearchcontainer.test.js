import { findRenderedDOMElementWithTag, findRenderedVNodeWithType, scryRenderedDOMElementsWithTag } from 'inferno-test-utils';
import { renderIntoDocument } from '../../utils/testutils';
import AddressSearch from './index';
import * as model from './model';
import { LOCATION_MAGIC_WORD } from '../../constants/constants';

jest.mock('./model');
jest.mock('../../services/addresssearchservice');

beforeEach(() => {
  model.findAddressByCurrentLocation = jest.fn(() => Promise.resolve());
  model.findAddressBySearchTerm = jest.fn(() => Promise.resolve());
});

describe('onComponentWillReceiveProps', () => {
  it('should change address in state when address props change', () => {
    const address = { label: 'Street 1, City', id: '1' };
    const tree = <AddressSearch address={address} />;
    renderIntoDocument(tree);

    const input = findRenderedDOMElementWithTag(tree, 'input');

    expect(input.value).toEqual(address.label);

    const newAddress = { label: 'Street 2, City', id: '2' };
    tree.children.componentWillReceiveProps({ address: newAddress });

    return Promise
      .resolve()
      .then(() => expect(input.value).toEqual(newAddress.label));
  });

  it('should clear last selected suggestion when address changes', () => {
    const tree = <AddressSearch address={{ label: "Street 1, City", id: '1' }} />;
    renderIntoDocument(tree);

    tree.children.state.selectedSuggestion = {};
    tree.children.componentWillReceiveProps({  address: 'Street 2, City', id: '2' });

    return Promise
      .resolve()
      .then(() => expect(tree.children.state.selectedSuggestion).toEqual(undefined));
  });

  it('should not clear last selected suggestion if address is the same', () => {
    const value = { label: 'Street 1, City', id: '2' };
    const tree = <AddressSearch address={value} />;
    renderIntoDocument(tree);

    tree.children.state.selectedSuggestion = {};
    tree.children.componentWillReceiveProps({  address: value });

    return Promise
      .resolve()
      .then(() => expect(tree.children.state.selectedSuggestion).not.toEqual(null));
  });
});

describe('submitting', () => {
  it('calls onSearch when submit button is clicked', () => {
    const spy = jest.fn();
    const tree = <AddressSearch onSearch={spy} />;

    renderIntoDocument(tree);
    const button = scryRenderedDOMElementsWithTag(tree, 'button')[1];

    // trigger click event
    const clickEvent = new MouseEvent('click');
    button.dispatchEvent(clickEvent);

    return Promise
      .resolve()
      .then(() => expect(spy).toHaveBeenCalled());
  });

  it('calls onSearch with address received from the address service if no suggestion is selected', async () => {
    const spy = jest.fn();
    const tree = <AddressSearch onSearch={spy} />;
    renderIntoDocument(tree);
    const submit = scryRenderedDOMElementsWithTag(tree, 'button')[1];
    const val = 'searchterm';
    const address = { label: 'searchterm street 23' };

    model.findAddressBySearchTerm.mockReturnValueOnce(Promise.resolve(address));
    tree.children.state.searchTerm = val;

    submit.click();

    return Promise
      .resolve()
      .then(() => {
        expect(model.findAddressBySearchTerm).toHaveBeenCalledWith(val);
        expect(spy).toHaveBeenCalledWith(address);
      });
  });

  it('calls findAddressByCurrentLocation when search term is LOCATION_MAGIC_WORD', () => {
    const spy = jest.fn();
    const tree = <AddressSearch onSearch={spy} />;
    renderIntoDocument(tree);
    const submit = scryRenderedDOMElementsWithTag(tree, 'button')[1];
    const val = LOCATION_MAGIC_WORD;

    model.findAddressByCurrentLocation.mockClear();
    tree.children.state.searchTerm = val;

    submit.click();

    expect(model.findAddressByCurrentLocation).toHaveBeenCalledTimes(1);
  });

  it('calls findAddressByCurrentLocation when search term is undefined and then onSearch w/ value received from the service', () => {
    const spy = jest.fn();
    const tree = <AddressSearch onSearch={spy} />;
    renderIntoDocument(tree);
    const submit = scryRenderedDOMElementsWithTag(tree, 'button')[1];
    const address = { label: 'searchterm street 23' };

    model.findAddressByCurrentLocation.mockReturnValueOnce(Promise.resolve(address));
    submit.click();

    return Promise
      .resolve()
      .then(() => {
        expect(model.findAddressByCurrentLocation).toHaveBeenCalledWith();
        expect(spy).toHaveBeenCalledWith(address);
      });
  });

  it('hides suggestions after submit', () => {
    const spy = jest.fn();
    const tree = <AddressSearch onSearch={spy} />;
    renderIntoDocument(tree);

    const submit = scryRenderedDOMElementsWithTag(tree, 'button')[1];
    tree.children.state.suggestions = [{}, {}];

    submit.click();

    return Promise
      .resolve()
      .then(() => expect(tree.children.state.suggestions).toEqual([]));
  });

  it('does not clear selected suggestion after submit', () => {
    const spy = jest.fn();
    const tree = <AddressSearch onSearch={spy} />;
    renderIntoDocument(tree);

    const selectedSuggestion = {};

    const submit = scryRenderedDOMElementsWithTag(tree, 'button')[1];
    tree.children.state.selectedSuggestion = selectedSuggestion;

    submit.click();

    return Promise
      .resolve()
      .then(() => expect(tree.children.state.selectedSuggestion).toBe(selectedSuggestion));
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
    const tree = <AddressSearch />;
    renderIntoDocument(tree);

    tree.children.state.suggestions = [{}, {}];
    const form = findRenderedDOMElementWithTag(tree, 'form');

    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 27 });
    form.dispatchEvent(event);

    return Promise
      .resolve()
      .then(() => expect(tree.children.state.suggestions).toEqual([]));
  });

  it('does not clear selected suggestion when esc is pressed', () => {
    const tree = <AddressSearch />;
    renderIntoDocument(tree);

    const selectedSuggestion = {};
    const form = findRenderedDOMElementWithTag(tree, 'form');

    tree.children.state.selectedSuggestion = selectedSuggestion;

    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 27 });
    form.dispatchEvent(event);

    return Promise
      .resolve()
      .then(() => expect(tree.children.state.selectedSuggestion).toEqual(selectedSuggestion));
  });

  it('clears selected suggestion when value in input is changed', () => {
    const tree = <AddressSearch />;
    renderIntoDocument(tree);
    const input = findRenderedDOMElementWithTag(tree, 'input');

    tree.children.state.selectedSuggestion = {};

    input.value = 'abc';
    const inputEvent = new Event('input');
    input.dispatchEvent(inputEvent);

    return Promise
      .resolve()
      .then(() => expect(tree.children.state.selectedSuggestion).toEqual(undefined));
  });

  it('selects next suggestion when down key is pressed', () => {
    const tree = <AddressSearch />;
    renderIntoDocument(tree);
    const input = findRenderedVNodeWithType(tree, 'input');
    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 40 });

    model.selectNextSuggestion.mockReturnValueOnce({});

    input.dom.dispatchEvent(event);

    expect(model.selectNextSuggestion).toHaveBeenCalledTimes(1);
  });

  it('selects previous suggestion when up is pressed', () => {
    const tree = <AddressSearch />;
    renderIntoDocument(tree);
    const input = findRenderedVNodeWithType(tree, 'input');
    const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 38 });

    model.selectPrevSuggestion.mockReturnValueOnce({});

    input.dom.dispatchEvent(event);

    expect(model.selectPrevSuggestion).toHaveBeenCalledTimes(1);
  });

  it('does not crash when previous or next suggestion is not available', () => {
    const tree = <AddressSearch />;
    renderIntoDocument(tree);
    const input = findRenderedVNodeWithType(tree, 'input');
    const downEvent = new KeyboardEvent('keyup', { bubbles: true, keyCode: 40 });
    const upEvent = new KeyboardEvent('keyup', { bubbles: true, keyCode: 38 });

    model.selectNextSuggestion.mockReturnValueOnce(undefined);
    model.selectPrevSuggestion.mockReturnValueOnce(undefined);

    input.dom.dispatchEvent(downEvent);
    input.dom.dispatchEvent(upEvent);
  });
});
