import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import createDeparturesTable from './departureslist';
import dom from 'cheerio';

const DeparturesTable = createDeparturesTable(Inferno);

it('renders a table', () => {
    const $ = dom.load(renderToString(<DeparturesTable />));
    const table = $('table');
    expect(table.length).toBe(1);
});

it('renders a table header', () => {
    const $ = dom.load(renderToString(<DeparturesTable />));
    const thead = $('table thead');
    expect(thead.length).toBe(1);
});

it('renders a table header cell with text Departure', () => {
    const $ = dom.load(renderToString(<DeparturesTable />));
    const headerText = $('thead th:first-child').text();
    expect(headerText).toBe('Departure');
});

it('renders a table header cell with text Route', () => {
    const $ = dom.load(renderToString(<DeparturesTable />));
    const headerText = $('thead th:nth-child(2)').text();
    expect(headerText).toBe('Route');
});

it('renders a table header cell with text Destination', () => {
    const $ = dom.load(renderToString(<DeparturesTable />));
    const headerText = $('thead th:nth-child(3)').text();
    expect(headerText).toBe('Destination');
});

it('renders a table header cell with text Distance', () => {
    const $ = dom.load(renderToString(<DeparturesTable />));
    const headerText = $('thead th:nth-child(4)').text();
    expect(headerText).toBe('Distance');
});

it('renders an empty table body when departures list is empty', () => {
    const $ = dom.load(renderToString(<DeparturesTable departures={[]}/>));
    const tbodyContent = $('tbody').html();
    expect(tbodyContent).toBe('');
});

it('renders as many table body rows as there are departures', () => {
    const departures = [{ id: '1' }, { id: '2' }];
    const $ = dom.load(renderToString(<DeparturesTable departures={departures}/>));
    const rows = $('tbody tr');
    expect(rows.length).toBe(departures.length);
});







