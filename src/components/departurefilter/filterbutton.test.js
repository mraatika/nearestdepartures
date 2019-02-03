import { findRenderedVNodeWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import { renderIntoDocument } from '../../utils/testutils';
import FilterButton from './filterbutton';

it('renders a button', () => {
  const $ = dom.load(renderToString(<FilterButton />));
  const button = $('button');
  expect(button.length).toBe(1);
});

it('renders a class corresponding to vehicleType when toggled', () => {
  const vehicleType = 'BUS';
  const $ = dom.load(renderToString(<FilterButton isToggled={true} vehicleType={vehicleType}/>));
  const button = $('button');
  const result = button.hasClass(`bg-${vehicleType.toLocaleLowerCase()}`);
  expect(result).toBe(true);
});

it('renders white background when not toggled', () => {
  const vehicleType = 'BUS';
  const $ = dom.load(renderToString(<FilterButton isToggled={false} vehicleType={vehicleType}/>));
  const button = $('button');
  expect(button.hasClass('bg-white')).toBe(true);
  expect(button.hasClass(`bg-${vehicleType.toLocaleLowerCase()}`)).toBe(false);
});

it('contains an icon', () => {
  const vehicleType = 'BUS';
  const $ = dom.load(renderToString(<FilterButton vehicleType={vehicleType}/>));
  const icon = $('svg');
  expect(icon.length).toBe(1);
});

it('contains an icon corresponding to vehicleType', () => {
  const vehicleType = 'TRAM';
  const $ = dom.load(renderToString(<FilterButton vehicleType={vehicleType} />));
  const svgUse = $('use');
  const result = svgUse.attr('href');
  expect(result.indexOf('#icon-icon_tram')).not.toBe(-1);
});

it('has class toggled when props.isToggled is true', () => {
  const $ = dom.load(renderToString(<FilterButton isToggled={true}/>));
  const button = $('button');
  const result = button.hasClass('toggled');
  expect(result).toBe(true);
});

it('does not have class toggled when props.isToggled is false', () => {
  const $ = dom.load(renderToString(<FilterButton isToggled={false}/>));
  const button = $('button');
  const result = button.hasClass('toggled');
  expect(result).toBe(false);
});

it('sets aria-pressed status to true when props.isToggled is true', () => {
  const $ = dom.load(renderToString(<FilterButton isToggled={true}/>));
  const button = $('button');
  const result = button.attr();
  expect('aria-pressed' in result).toBeTruthy();
});

it('sets aria-pressed status to false when props.isToggled is false', () => {
  const $ = dom.load(renderToString(<FilterButton isToggled={false}/>));
  const button = $('button');
  const result = button.attr();
  expect('aria-pressed' in result).toBeFalsy();
});

it('calls given callback on click', () => {
  const spy = jest.fn();
  const tree = <FilterButton onFilterToggle={spy} />;
  renderIntoDocument(tree);
  const button = findRenderedVNodeWithType(tree, 'button');

  button.dom.click();

  expect(spy).toHaveBeenCalled();
});

it('calls given callback with type and ctrl key pressed status', () => {
  const spy = jest.fn();
  const vehicleType = 'BUS';
  const tree = <FilterButton vehicleType={vehicleType} onFilterToggle={spy} />;
  renderIntoDocument(tree);
  const button = findRenderedVNodeWithType(tree, 'button');

  var event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
    ctrlKey: true,
  });

  button.dom.dispatchEvent(event);

  expect(spy).toHaveBeenCalledWith(vehicleType, true);
});
