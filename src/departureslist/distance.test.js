import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import dom from 'cheerio';
import Distance from './distance';

it('renders a span element', () => {
    const $ = dom.load(renderToString(<Distance />));
    const elem = $('span');
    expect(elem.length).toEqual(1);
});

it('renders an empty element when distance is not defined', () => {
    const $ = dom.load(renderToString(<Distance />));
    const result = $('span').text();
    expect(result.trim()).toEqual('');
});

it('renders distance as meters', () => {
    const distance = 100;
    const $ = dom.load(renderToString(<Distance distance={ distance }/>));
    const result = $('span').text();
    expect(result).toEqual(`${distance} m`);
});

it('renders distance in kilometers when it is 1000', () => {
    const distance = 1000;
    const distanceInKm = distance / 1000;
    const $ = dom.load(renderToString(<Distance distance={distance}/>));
    const output = $('span').text();
    expect(output).toEqual(`${distanceInKm} km`);
});

it('renders distance in kilometers when it is more than 1000', () => {
    const distance = 3500;
    const distanceInKm = distance / 1000;
    const $ = dom.load(renderToString(<Distance distance={distance}/>));
    const output = $('span').text();
    expect(output).toEqual(`${distanceInKm} km`);
});

it('renders distance with one decimal', () => {
    const distance = 3522;
    const distanceInKm = (distance / 1000).toFixed(1);
    const $ = dom.load(renderToString(<Distance distance={distance}/>));
    const output = $('span').text();
    expect(output).toEqual(`${distanceInKm} km`);
});