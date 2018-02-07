import { renderIntoDocument, findRenderedVNodeWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import SuggestionsList from './suggestionslist';
import SuggestionsListItem from './suggestionslistitem';

it('should render a list element', () => {
  const $ = dom.load(renderToString(<SuggestionsList />));
  const element = $('ol');
  expect(element.length).toEqual(1);
});

it('should not display list if suggestions array is empty', () => {
  const $ = dom.load(renderToString(<SuggestionsList suggestions={[]} />));
  const element = $('ol');
  expect(element.css('display')).toEqual('none');
});

it('should not display list if suggestions array is not passed in props', () => {
  const $ = dom.load(renderToString(<SuggestionsList />));
  const element = $('ol');
  expect(element.css('display')).toEqual('none');
});

it('should display list if suggestions array is not empty', () => {
  const suggestions = [{}];
  const $ = dom.load(renderToString(<SuggestionsList suggestions={suggestions} />));
  const element = $('ol');
  expect(element.css('display')).toEqual('block');
});

it('should render as many list items as there are suggestions', () => {
  const suggestions = [{}, {}];
  const $ = dom.load(renderToString(<SuggestionsList suggestions={suggestions} />));
  const elements = $('li');
  expect(elements.length).toEqual(2);
});

it('should mark list item selected', () => {
  const suggestions = [{ id: '1abc' }];
  const tree = renderIntoDocument(<SuggestionsList suggestions={suggestions} selected={suggestions[0]} />);
  const listItem = findRenderedVNodeWithType(tree, SuggestionsListItem);
  expect(listItem.props.selected).toEqual(true);
});

it('should pass item id as key', () => {
  const suggestions = [{ id: '1abc' }];
  const tree = renderIntoDocument(<SuggestionsList suggestions={suggestions} selected={suggestions[0]} />);
  const listItem = findRenderedVNodeWithType(tree, SuggestionsListItem);
  expect(listItem.key).toEqual(suggestions[0].id);
});
