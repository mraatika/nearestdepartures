import { renderIntoDocument, findRenderedVNodeWithType } from 'inferno-test-utils';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import FilterButton from './filterbutton';

it('renders a button', () => {
    const $ = dom.load(renderToString(<FilterButton />));
    const button = $('button');
    expect(button.length).toBe(1);
});

it('renders a class corresponding to vehicleType', () => {
    const vehicleType = 'BUS';
    const $ = dom.load(renderToString(<FilterButton vehicleType={vehicleType}/>));
    const button = $('button');
    const result = button.hasClass(vehicleType.toLocaleLowerCase());
    expect(result).toBe(true);
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
    const tree = renderIntoDocument(<FilterButton onFilterToggle={spy} />);
    const button = findRenderedVNodeWithType(tree, 'button');

    button.dom.click();

    expect(spy).toHaveBeenCalled();
});

it('calls given callback with type and ctrl key pressed status', () => {
    const spy = jest.fn();
    const vehicleType = 'BUS';
    const tree = renderIntoDocument(<FilterButton vehicleType={vehicleType} onFilterToggle={spy} />);
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
