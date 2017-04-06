import { renderIntoDocument, scryRenderedVNodesWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import DeparturesListSortHeader from './departureslistsortheader';

it('renders a span element', () => {
    const $ = dom.load(renderToString(<DeparturesListSortHeader />));
    const element = $('span.header');
    expect(element.length).toEqual(1);
});

it('renders span element with text', () => {
    const text = 'HeaderText';
    const $ = dom.load(renderToString(<DeparturesListSortHeader text={text} />));
    const element = $('span.header');
    expect(element.text()).toEqual(text);
});

it('has class related to given propName', () => {
    const propName = 'time';
    const $ = dom.load(renderToString(<DeparturesListSortHeader propName={propName} />));
    const element = $('span.header');
    expect(element.hasClass(`${propName}-header`)).toEqual(true);
});

it('calls onClick callback when clicked', () => {
    const spy = jest.fn();
    const propName = 'time';
    const rendered = renderIntoDocument(<DeparturesListSortHeader propName={propName} onClick={spy} />);
    const button = scryRenderedVNodesWithType(rendered, 'span')[0];

    const event = new MouseEvent('click', { bubbles: true });
    button.dom.dispatchEvent(event);

    expect(spy).toHaveBeenCalledWith(propName);
});

it('text span does not have classname active when props.active is false', () => {
    const $ = dom.load(renderToString(<DeparturesListSortHeader active={false} />));
    const element = $('span.header > span');
    expect(element.hasClass('active')).toEqual(false);
});

it('text span has classname active when props.active is true', () => {
    const $ = dom.load(renderToString(<DeparturesListSortHeader active={true} />));
    const element = $('span.header > span');
    expect(element.hasClass('active')).toEqual(true);
});