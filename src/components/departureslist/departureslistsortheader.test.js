import { scryRenderedVNodesWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import { renderIntoDocument } from '../../utils/testutils';
import DeparturesListSortHeader from './departureslistsortheader';

it('renders a div element', () => {
  const $ = dom.load(renderToString(<DeparturesListSortHeader />));
  const element = $('div.header');
  expect(element.length).toEqual(1);
});

it('has a title text', () => {
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

it('calls onClick callback when clicked', () => {
  const spy = jest.fn();
  const propName = 'time';
  const tree = <DeparturesListSortHeader propName={propName} onClick={spy} />;
  renderIntoDocument(tree);
  const button = scryRenderedVNodesWithType(tree, 'button')[0];

  const event = new MouseEvent('click', { bubbles: true });
  button.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalledWith(propName, event);
});

it('text span does not have classname active when props.active is false', () => {
  const $ = dom.load(renderToString(<DeparturesListSortHeader active={false} />));
  const element = $('div.header > button');
  expect(element.hasClass('active')).toEqual(false);
});

it('text span has classname active when props.active is true', () => {
  const $ = dom.load(renderToString(<DeparturesListSortHeader active={true} />));
  const element = $('div.header > button');
  expect(element.hasClass('active')).toEqual(true);
});
