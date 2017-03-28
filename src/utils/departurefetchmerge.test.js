import departureFetchMerge from './departurefetchmerge';
import * as departuresService from '../services/departuresservice';

global.Promise = require.requireActual('promise');

jest.mock('../services/departuresservice');

beforeEach(() => {
    departuresService.default.mockReset();
});

it('returns a Promise', () => {
    const result = departureFetchMerge();
    expect(result).toBeInstanceOf(Promise);
});

describe('fetching', () => {
    it('returns existing if vehicle types is empty', async () => {
        const existing = [];
        const result = await departureFetchMerge({}, [], existing);
        expect(result).toBe(existing);
    });

    it('fetches bus departures', () => {
        const position = { latitude: 1, longitude: 1 };
        const types = ['BUS'];
        departureFetchMerge(position, types);
        expect(departuresService.default).toHaveBeenCalledTimes(1);
        expect(departuresService.default).toHaveBeenCalledWith(position, { vehicleTypes: types });
    });

    it('fetches tram departures', async () => {
        const position = { latitude: 1, longitude: 1 };
        const types = ['TRAM'];
        departureFetchMerge(position, types);
        expect(departuresService.default).toHaveBeenCalledTimes(1);
        expect(departuresService.default).toHaveBeenCalledWith(position, { vehicleTypes: types });
    });

    it('fetches ferry departures', async () => {
        const position = { latitude: 1, longitude: 1 };
        const restTypes = ['FERRY', 'RAIL', 'SUBWAY'];
        departureFetchMerge(position, ['FERRY']);
        expect(departuresService.default).toHaveBeenCalledTimes(1);
        expect(departuresService.default).toHaveBeenCalledWith(position, { vehicleTypes: restTypes });
    });

    it('fetches rail departures', async () => {
        const position = { latitude: 1, longitude: 1 };
        const restTypes = ['FERRY', 'RAIL', 'SUBWAY'];
        departureFetchMerge(position, ['RAIL']);
        expect(departuresService.default).toHaveBeenCalledTimes(1);
        expect(departuresService.default).toHaveBeenCalledWith(position, { vehicleTypes: restTypes });
    });

    it('fetches subway departures', async () => {
        const position = { latitude: 1, longitude: 1 };
        const restTypes = ['FERRY', 'RAIL', 'SUBWAY'];
        departureFetchMerge(position, ['SUBWAY']);
        expect(departuresService.default).toHaveBeenCalledTimes(1);
        expect(departuresService.default).toHaveBeenCalledWith(position, { vehicleTypes: restTypes });
    });

    it('fetches all departures', async () => {
        const position = { latitude: 1, longitude: 1 };
        const restTypes = ['FERRY', 'RAIL', 'SUBWAY'];

        departuresService.default
            .mockReturnValueOnce(new Promise((resolve) => resolve([])))
            .mockReturnValueOnce(new Promise((resolve) => resolve([])))
            .mockReturnValueOnce(new Promise((resolve) => resolve([])));

        await departureFetchMerge(position, ['BUS', 'TRAM', 'RAIL', 'SUBWAY', 'FERRY']);

        expect(departuresService.default).toHaveBeenCalledTimes(3);

        expect(departuresService.default).toHaveBeenCalledWith(position, { vehicleTypes: ['BUS'] });
        expect(departuresService.default).toHaveBeenCalledWith(position, { vehicleTypes: ['TRAM'] });
        expect(departuresService.default).toHaveBeenCalledWith(position, { vehicleTypes: restTypes });
    });

    it('returns existing if no departures are fetched', async () => {
        const existing = [{ id: '1', vehicleType: 'BUS' }, { id: '2', vehicleType: 'BUS' }];

        departuresService.default.mockReturnValueOnce(new Promise((resolve) => resolve([])));

        const result = await departureFetchMerge({}, ['BUS'], existing);
        expect(result).toEqual(existing);
    });
});

describe('merging', () => {
    it('merges fetched departures with existing', async () => {
        const existing = [{ id: '1', vehicleType: 'BUS' }, { id: '2', vehicleType: 'BUS' }];
        const departures = [{ id: '3', vehicleType: 'BUS' }, { id: '4', vehicleType: 'BUS' }];

        departuresService.default.mockReturnValueOnce(new Promise((resolve) => resolve(departures)));

        const result = await departureFetchMerge({}, ['BUS'], existing);
        expect(result).toEqual([...existing, ...departures]);
    });

    it('merges fetched departures with existing and removes duplicates', async () => {
        const existing = [{ id: '1', vehicleType: 'BUS' }, { id: '2', vehicleType: 'BUS' }, { id: '3', vehicleType: 'BUS' }];
        const departures = [{ id: '3', vehicleType: 'BUS' }, { id: '4', vehicleType: 'BUS' }];

        departuresService.default.mockReturnValueOnce(new Promise((resolve) => resolve(departures)));

        const result = await departureFetchMerge({}, ['BUS'], existing);
        expect(result.length).toEqual(4);
        });

        it('merges fetched departures with existing and removes duplicates preferring fetched', async () => {
        const existing = [{ id: '3', version: 1, vehicleType: 'BUS' }];
        const departures = [{ id: '3', version: 2, vehicleType: 'BUS' }];

        departuresService.default.mockReturnValueOnce(new Promise((resolve) => resolve(departures)));

        const result = await departureFetchMerge({}, ['BUS'], existing);
        expect(result[0].version).toEqual(2);
    });

    it('merges results from all types', async () => {
        const position = { latitude: 1, longitude: 1 };
        const busDepartures = [{ id: '1', vehicleType: 'BUS' }];
        const tramDepartures = [{ id: '2', vehicleType: 'TRAM' }];
        const restDepartures = [
            { id: '3', vehicleType: 'RAIL' },
            { id: '4', vehicleType: 'FERRY' },
            { id: '5', vehicleType: 'SUBWAY' },
        ];

        departuresService.default
            .mockReturnValueOnce(new Promise((resolve) => resolve(busDepartures)))
            .mockReturnValueOnce(new Promise((resolve) => resolve(tramDepartures)))
            .mockReturnValueOnce(new Promise((resolve) => resolve(restDepartures)));

        const result = await departureFetchMerge(position, ['BUS', 'TRAM', 'RAIL', 'SUBWAY', 'FERRY']);

        expect(result.length).toBe(busDepartures.length + tramDepartures.length + restDepartures.length);
    });
});
