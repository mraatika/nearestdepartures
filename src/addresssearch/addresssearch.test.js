import { render } from 'inferno';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import AddressSearch from './addresssearch';

it('renders a fieldset', () => {
    const $ = dom.load(renderToString(<AddressSearch />));
    const element = $('fieldset');
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
    expect(labelText).toEqual('Search for address or location...');
});

it('renders a button', () => {
    const $ = dom.load(renderToString(<AddressSearch />));
    const button = $('button');
    expect(button.length).toEqual(1);
});

it('renders a button with title', () => {
    const $ = dom.load(renderToString(<AddressSearch />));
    const buttonTitle = $('button').attr('title');
    expect(buttonTitle).toEqual('Search');
});

it('renders a button with text', () => {
    const $ = dom.load(renderToString(<AddressSearch />));
    const buttonText = $('button').text();
    expect(buttonText).toEqual('Search');
});

