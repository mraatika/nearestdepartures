import Inferno from 'inferno';
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
    const result = svgUse.attr('xlink:href');
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
