import { renderIntoDocument, findRenderedVNodeWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import SuggestionsListItem from './suggestionslistitem';

it('should render a list item', () => {
    const $ = dom.load(renderToString(<SuggestionsListItem suggestion={{ name: 'a' }}/>));
    const element = $('li');
    expect(element.length).toEqual(1);
});

it('should add a class name to list item', () => {
    const $ = dom.load(renderToString(<SuggestionsListItem suggestion={{ name: 'a' }}/>));
    const element = $('li');
    expect(element.hasClass('suggestions-list-item')).toEqual(true);
});

it('should add class name selected to list item if props.selected is true', () => {
    const $ = dom.load(renderToString(<SuggestionsListItem suggestion={{ name: 'a' }} selected={true} />));
    const element = $('li');
    expect(element.hasClass('selected')).toEqual(true);
});

it('should not add class name selected to list item if props.selected is false', () => {
    const $ = dom.load(renderToString(<SuggestionsListItem suggestion={{ name: 'a' }} selected={false} />));
    const element = $('li');
    expect(element.hasClass('selected')).toEqual(false);
});

it('should render name for each suggestion from name property', () => {
    const suggestion = { label: 'a' };
    const $ = dom.load(renderToString(<SuggestionsListItem suggestion={suggestion} />));
    const element = $('.suggestion-name');
    expect(element.text()).toEqual(suggestion.label);
});

it('should render city name for each suggestion from locality property', () => {
    const suggestion = { locality: 'a' };
    const $ = dom.load(renderToString(<SuggestionsListItem suggestion={suggestion} />));
    const element = $('.suggestion-locality');
    expect(element.text()).toEqual(suggestion.locality);
});

it('calls onClick when a list item is clicked', () => {
    const spy = jest.fn();
    const suggestion = { name: 'a' };
    const rendered = renderIntoDocument(<SuggestionsListItem onClick={spy} suggestion={suggestion} />);
    const listItem = findRenderedVNodeWithType(rendered, 'li');

    const event = new MouseEvent('mousedown', { bubbles: true });
    listItem.dom.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith(suggestion);
});