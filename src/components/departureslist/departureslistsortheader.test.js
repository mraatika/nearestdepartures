import { renderIntoDocument, scryRenderedVNodesWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import DeparturesListSortHeader from './departureslistsortheader';

it('renders a div element', () => {
  const $ = dom.load(renderToString(<DeparturesListSortHeader />));
  const element = $('div.header');
  expect(element.length).toEqual(1);
});

it('renders span element with text', () => {
  const text = 'HeaderText';
  const $ = dom.load(renderToString(<DeparturesListSortHeader text={text} />));
  const element = $('div.header');
  expect(element.text()).toEqual(text);
});

it('has class related to given propName', () => {
  const propName = 'time';
  const $ = dom.load(renderToString(<DeparturesListSortHeader propName={propName} />));
  const element = $('div.header');
  expect(element.hasClass(`${propName}`)).toEqual(true);
});

it('is tabbable', () => {
  const $ = dom.load(renderToString(<DeparturesListSortHeader />));
  const element = $('div.header');
  expect(element.attr('tabindex')).toEqual('0');
});

it('calls onClick callback when clicked', () => {
  const spy = jest.fn();
  const propName = 'time';
  const rendered = renderIntoDocument(<DeparturesListSortHeader propName={propName} onClick={spy} />);
  const button = scryRenderedVNodesWithType(rendered, 'span')[0];

  const event = new MouseEvent('click', { bubbles: true });
  button.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalledWith(propName, event);
});

it('calls onClick callback on space press', () => {
  const spy = jest.fn();
  const propName = 'time';
  const rendered = renderIntoDocument(<DeparturesListSortHeader propName={propName} onClick={spy} />);
  const button = scryRenderedVNodesWithType(rendered, 'span')[0];

  const event = new KeyboardEvent('keypress', { bubbles: true, keyCode: 32 });
  button.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});

it('calls onClick callback on enter press', () => {
  const spy = jest.fn();
  const propName = 'time';
  const rendered = renderIntoDocument(<DeparturesListSortHeader propName={propName} onClick={spy} />);
  const button = scryRenderedVNodesWithType(rendered, 'span')[0];

  const event = new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 });
  button.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalled();
});

it('does not call onClick callback on other key press', () => {
  const spy = jest.fn();
  const propName = 'time';
  const rendered = renderIntoDocument(<DeparturesListSortHeader propName={propName} onClick={spy} />);
  const button = scryRenderedVNodesWithType(rendered, 'span')[0];

  const event = new KeyboardEvent('keypress', { bubbles: true, keyCode: 2 });
  button.dom.dispatchEvent(event);

  expect(spy).not.toHaveBeenCalled();
});

it('text span does not have classname active when props.active is false', () => {
  const $ = dom.load(renderToString(<DeparturesListSortHeader active={false} />));
  const element = $('div.header > span');
  expect(element.hasClass('active')).toEqual(false);
});

it('text span has classname active when props.active is true', () => {
  const $ = dom.load(renderToString(<DeparturesListSortHeader active={true} />));
  const element = $('div.header > span');
  expect(element.hasClass('active')).toEqual(true);
});
