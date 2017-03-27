import Inferno, { render } from 'inferno';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import RangeFilter from './rangefilter';

it('renders an input element', () => {
    const $ = dom.load(renderToString(<RangeFilter />));
    const input = $('input');
    expect(input.length).toBe(1);
});

it('renders an range input element', () => {
    const $ = dom.load(renderToString(<RangeFilter />));
    const inputType = $('input').attr('type');
    expect(inputType).toBe('range');
});

it('takes default value as prop', () => {
    const defaultRange = 100;
    const $ = dom.load(renderToString(<RangeFilter range={defaultRange} />));
    const inputValue = $('input').val();
    expect(inputValue).toBe('' + defaultRange);
});

it('has minimum of 100', () => {
    const $ = dom.load(renderToString(<RangeFilter />));
    const inputValue = $('input').attr('min');
    expect(inputValue).toBe('100');
});

it('has minimum of maximum of 5000', () => {
    const $ = dom.load(renderToString(<RangeFilter />));
    const inputValue = $('input').attr('max');
    expect(inputValue).toBe('3500');
});

it('has step of 10', () => {
    const $ = dom.load(renderToString(<RangeFilter />));
    const inputValue = $('input').attr('step');
    expect(inputValue).toBe('100');
});

it('has displays value in an output element', () => {
    const range = 100;
    const $ = dom.load(renderToString(<RangeFilter range={range}/>));
    const outputValue = $('output').text();
    expect(outputValue).toBe('100m');
});





