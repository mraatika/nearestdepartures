import { renderIntoDocument, findRenderedVNodeWithType } from 'inferno-test-utils';
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

it('renders a button', () => {
    const $ = dom.load(renderToString(<AddressSearch />));
    const button = $('button');
    expect(button.length).toEqual(1);
});

it('renders a button with text', () => {
    const $ = dom.load(renderToString(<AddressSearch />));
    const buttonText = $('button').text();
    expect(buttonText).toEqual('Hae');
});

it('gets default value from props', () => {
    const defaultValue = 'defaultValue';
    const $ = dom.load(renderToString(<AddressSearch address={defaultValue}/>));
    const inputValue = $('input').val();
    expect(inputValue).toEqual(defaultValue);
});

it('sets input value to state onInput', () => {
    const tree = <AddressSearch />;
    const rendered = renderIntoDocument(tree);
    const input = findRenderedVNodeWithType(rendered, 'input');
    const val = 'searchterm';

    input.dom.value = val;
    const event = new UIEvent('input');
    input.dom.dispatchEvent(event);

    expect(tree.children.state.searchTerm).toEqual(val);
});

it('calls onSearch when submit button is pressed', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const button = findRenderedVNodeWithType(rendered, 'button');

    const event = new MouseEvent('click');
    button.dom.dispatchEvent(event);

    expect(spy).toHaveBeenCalled();
});

it('calls onSearch when form is submitted', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const form = findRenderedVNodeWithType(rendered, 'form');

    const event = new Event('submit', { bubbles: true });
    form.dom.dispatchEvent(event);

    expect(spy).toHaveBeenCalled();
});

it('calls onSearch with searchTerm', () => {
    const spy = jest.fn();
    const rendered = renderIntoDocument(<AddressSearch onSearch={spy} />);
    const button = findRenderedVNodeWithType(rendered, 'button');
    const input = findRenderedVNodeWithType(rendered, 'input');
    const val = 'searchterm';

    // trigger input event on search field
    input.dom.value = val;
    const inputEvent = new UIEvent('input');
    input.dom.dispatchEvent(inputEvent);

    // trigger click event
    const clickEvent = new MouseEvent('click');
    button.dom.dispatchEvent(clickEvent);

    expect(spy).toHaveBeenCalledWith(val);
});
