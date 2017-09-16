import { renderIntoDocument, findRenderedVNodeWithType, scryRenderedVNodesWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import AddressSearch from './addresssearch';

jest.mock('../../services/addresssearchservice');

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
  const address = 'StreetAddress 123';
  const $ = dom.load(renderToString(<AddressSearch address={address} />));
  const labelText = $('input').val();
  expect(labelText).toEqual(address);
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

it('gets default value from props', () => {
  const defaultValue = 'defaultValue';
  const $ = dom.load(renderToString(<AddressSearch address={defaultValue} />));
  const inputValue = $('input').val();
  expect(inputValue).toEqual(defaultValue);
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

it('calls onSearch when submit button is pressed', () => {
  const spy = jest.fn();
  const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
  const button = scryRenderedVNodesWithType(rendered, 'button')[1];

  const event = new MouseEvent('click');
  button.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});

describe('onComponentWillReceiveProps', () => {
  it('should change address in state when address props change', () => {
    const value = 'Street 1, City';
    const tree = <AddressSearch address={value} />;
    renderIntoDocument(tree);
    expect(tree.children.state.searchTerm).toEqual(value);

    const newValue = 'Street 2, City';
    tree.children.componentWillReceiveProps({  address: 'Street 2, City' });
    expect(tree.children.state.searchTerm).toEqual(newValue);
  });

  it('should clear last selected suggestion when address changes', () => {
    const tree = <AddressSearch address="Street 1, City" />;
    renderIntoDocument(tree);
    tree.children.state.selectedSuggestion = {};

    tree.children.componentWillReceiveProps({  address: 'Street 2, City' });
    expect(tree.children.state.selectedSuggestion).toEqual(null);
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

    expect(spy).toHaveBeenCalled();
  });

  it('calls onSearch when submit button is clicked', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const button = scryRenderedVNodesWithType(rendered, 'button')[1]/*  */;

    // trigger click event
    const clickEvent = new MouseEvent('click');
    button.dom.dispatchEvent(clickEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('calls onSearch with searchTerm if no suggestion is selected', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const input = findRenderedVNodeWithType(rendered, 'input');
    const val = 'searchterm';

    // trigger input event on search field
    input.dom.value = val;
    const inputEvent = new UIEvent('input');
    input.dom.dispatchEvent(inputEvent);

    const event = new Event('submit', { bubbles: true });
    component.dom.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith({ searchTerm: val });
  });

  it('calls onSearch with location if suggestion is selected', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const component = findRenderedVNodeWithType(rendered, AddressSearch);
    const location = [1, 2];
    const selectedSuggestion = {  location };

    component.children.state.selectedSuggestion = selectedSuggestion;

    const event = new Event('submit', { bubbles: true });
    component.dom.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith({ location });
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

  describe('selecting next', () => {
    it('selects first suggestion when down is pressed and currently no suggestion is selected', () => {
      const rendered = renderIntoDocument(<AddressSearch />);
      const component = findRenderedVNodeWithType(rendered, AddressSearch);

      const suggestions = [{ id: '1' }, { id: '2' }];
      component.children.state.suggestions = suggestions;

      const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 40 });
      component.dom.dispatchEvent(event);

      expect(component.children.state.selectedSuggestion).toBe(suggestions[0]);
    });

    it('selects next suggestion when down is pressed and a suggestion is selected', () => {
      const rendered = renderIntoDocument(<AddressSearch />);
      const component = findRenderedVNodeWithType(rendered, AddressSearch);

      const suggestions = [{ id: '1' }, { id: '2' }];
      component.children.state.suggestions = suggestions;
      component.children.state.selectedSuggestion = suggestions[0];

      const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 40 });
      component.dom.dispatchEvent(event);

      expect(component.children.state.selectedSuggestion).toBe(suggestions[1]);
    });

    it('selects the first suggestion when down is pressed and last suggestion is selected', () => {
      const rendered = renderIntoDocument(<AddressSearch />);
      const component = findRenderedVNodeWithType(rendered, AddressSearch);

      const suggestions = [{ id: '1' }, { id: '2' }];
      component.children.state.suggestions = suggestions;
      component.children.state.selectedSuggestion = suggestions[1];

      const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 40 });
      component.dom.dispatchEvent(event);

      expect(component.children.state.selectedSuggestion).toBe(suggestions[0]);
    });
  });

  describe('selecting prev', () => {
    it('selects last suggestion when up is pressed and currently no suggestion is selected', () => {
      const rendered = renderIntoDocument(<AddressSearch />);
      const component = findRenderedVNodeWithType(rendered, AddressSearch);

      const suggestions = [{ id: '1' }, { id: '2' }];
      component.children.state.suggestions = suggestions;

      const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 38 });
      component.dom.dispatchEvent(event);

      expect(component.children.state.selectedSuggestion).toBe(suggestions[1]);
    });

    it('selects prev suggestion when up is pressed and a suggestion is selected', () => {
      const rendered = renderIntoDocument(<AddressSearch />);
      const component = findRenderedVNodeWithType(rendered, AddressSearch);

      const suggestions = [{ id: '1' }, { id: '2' }];
      component.children.state.suggestions = suggestions;
      component.children.state.selectedSuggestion = suggestions[1];

      const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 38 });
      component.dom.dispatchEvent(event);

      expect(component.children.state.selectedSuggestion).toBe(suggestions[0]);
    });

    it('selects the last suggestion when up is pressed and first suggestion is selected', () => {
      const rendered = renderIntoDocument(<AddressSearch />);
      const component = findRenderedVNodeWithType(rendered, AddressSearch);

      const suggestions = [{ id: '1' }, { id: '2' }];
      component.children.state.suggestions = suggestions;
      component.children.state.selectedSuggestion = suggestions[0];

      const event = new KeyboardEvent('keyup', { bubbles: true, keyCode: 38 });
      component.dom.dispatchEvent(event);

      expect(component.children.state.selectedSuggestion).toBe(suggestions[1]);
    });
  });
});

