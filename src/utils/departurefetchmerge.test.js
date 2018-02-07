import { fetchDepartures, batchDepartures } from './departurefetchmerge';
import * as departuresService from '../services/departuresservice';

global.Promise = require.requireActual('promise');

jest.mock('../services/departuresservice');

beforeEach(() => {
  departuresService.fetchDepartures.mockReset();
  departuresService.batchDepartures.mockReset();
});

it('returns a Promise', () => {
  return fetchDepartures();
});

describe('fetching', () => {
  it('returns existing if vehicle types is empty', async () => {
    const existing = [];
    const result = await fetchDepartures({}, [], existing);
    expect(result).toBe(existing);
  });

  it('fetches bus departures', () => {
    const position = { latitude: 1, longitude: 1 };
    const types = ['BUS'];
    fetchDepartures(position, types);
    expect(departuresService.fetchDepartures).toHaveBeenCalledTimes(1);
    expect(departuresService.fetchDepartures).toHaveBeenCalledWith(position, { vehicleTypes: types });
  });

  it('fetches tram departures', async () => {
    const position = { latitude: 1, longitude: 1 };
    const types = ['TRAM'];
    fetchDepartures(position, types);
    expect(departuresService.fetchDepartures).toHaveBeenCalledTimes(1);
    expect(departuresService.fetchDepartures).toHaveBeenCalledWith(position, { vehicleTypes: types });
  });

  it('fetches ferry departures', async () => {
    const position = { latitude: 1, longitude: 1 };
    const restTypes = ['FERRY', 'RAIL', 'SUBWAY'];
    fetchDepartures(position, ['FERRY']);
    expect(departuresService.fetchDepartures).toHaveBeenCalledTimes(1);
    expect(departuresService.fetchDepartures).toHaveBeenCalledWith(position, { vehicleTypes: restTypes });
  });

  it('fetches rail departures', async () => {
    const position = { latitude: 1, longitude: 1 };
    const restTypes = ['FERRY', 'RAIL', 'SUBWAY'];
    fetchDepartures(position, ['RAIL']);
    expect(departuresService.fetchDepartures).toHaveBeenCalledTimes(1);
    expect(departuresService.fetchDepartures).toHaveBeenCalledWith(position, { vehicleTypes: restTypes });
  });

  it('fetches subway departures', async () => {
    const position = { latitude: 1, longitude: 1 };
    const restTypes = ['FERRY', 'RAIL', 'SUBWAY'];
    fetchDepartures(position, ['SUBWAY']);
    expect(departuresService.fetchDepartures).toHaveBeenCalledTimes(1);
    expect(departuresService.fetchDepartures).toHaveBeenCalledWith(position, { vehicleTypes: restTypes });
  });

  it('fetches all departures', async () => {
    const position = { latitude: 1, longitude: 1 };
    const restTypes = ['FERRY', 'RAIL', 'SUBWAY'];

    departuresService.fetchDepartures
      .mockReturnValueOnce(new Promise((resolve) => resolve([])))
      .mockReturnValueOnce(new Promise((resolve) => resolve([])))
      .mockReturnValueOnce(new Promise((resolve) => resolve([])));

    await fetchDepartures(position, ['BUS', 'TRAM', 'RAIL', 'SUBWAY', 'FERRY']);

    expect(departuresService.fetchDepartures).toHaveBeenCalledTimes(3);

    expect(departuresService.fetchDepartures).toHaveBeenCalledWith(position, { vehicleTypes: ['BUS'] });
    expect(departuresService.fetchDepartures).toHaveBeenCalledWith(position, { vehicleTypes: ['TRAM'] });
    expect(departuresService.fetchDepartures).toHaveBeenCalledWith(position, { vehicleTypes: restTypes });
  });

  it('returns existing if no departures are fetched', async () => {
    const existing = [{ id: '1', vehicleType: 'BUS' }, { id: '2', vehicleType: 'BUS' }];

    departuresService.fetchDepartures.mockReturnValueOnce(new Promise((resolve) => resolve([])));

    const result = await fetchDepartures({}, ['BUS'], existing);
    expect(result).toEqual(existing);
  });
});

describe('merging', () => {
  it('merges fetched departures with existing', async () => {
    const existing = [{ id: '1', vehicleType: 'BUS' }, { id: '2', vehicleType: 'BUS' }];
    const departures = [{ id: '3', vehicleType: 'BUS' }, { id: '4', vehicleType: 'BUS' }];

    departuresService.fetchDepartures.mockReturnValueOnce(new Promise((resolve) => resolve(departures)));

    const result = await fetchDepartures({}, ['BUS'], existing);
    expect(result).toEqual([...existing, ...departures]);
  });

  it('merges fetched departures with existing and removes duplicates', async () => {
    const existing = [{ id: '1', vehicleType: 'BUS' }, { id: '2', vehicleType: 'BUS' }, { id: '3', vehicleType: 'BUS' }];
    const departures = [{ id: '3', vehicleType: 'BUS' }, { id: '4', vehicleType: 'BUS' }];

    departuresService.fetchDepartures.mockReturnValueOnce(new Promise((resolve) => resolve(departures)));

    const result = await fetchDepartures({}, ['BUS'], existing);
    expect(result.length).toEqual(4);
  });

  it('merges fetched departures with existing and removes duplicates preferring fetched', async () => {
    const existing = [{ id: '3', version: 1, vehicleType: 'BUS' }];
    const departures = [{ id: '3', version: 2, vehicleType: 'BUS' }];

    departuresService.fetchDepartures.mockReturnValueOnce(new Promise((resolve) => resolve(departures)));

    const result = await fetchDepartures({}, ['BUS'], existing);
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

    departuresService.fetchDepartures
      .mockReturnValueOnce(new Promise((resolve) => resolve(busDepartures)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(tramDepartures)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(restDepartures)));

    const result = await fetchDepartures(position, ['BUS', 'TRAM', 'RAIL', 'SUBWAY', 'FERRY']);

    expect(result.length).toBe(busDepartures.length + tramDepartures.length + restDepartures.length);
  });
});

describe('batching', () => {
  it('should return an empty array when there are no departures', async () => {
    const result = await batchDepartures();
    expect(result).toEqual([]);
  });

  it('should return departures unmodified when there are no realtime departures', async () => {
    const departures = [{ realtime: false }, { realtime: false }];
    const result = await batchDepartures(departures);
    expect(result).toBe(departures);
  });

  it('calls departureservice\'s batchDepartures', async() => {
    const departures = [{ realtime: true }];
    departuresService.batchDepartures.mockReturnValueOnce([]);
    await batchDepartures(departures);
    expect(departuresService.batchDepartures).toHaveBeenCalled();
  });

  it('calls departureservice\'s batchDepartures with unique departure\'s', async() => {
    const departures = [{ nodeId: '1', realtime: true }, { nodeId: '1', realtime: true }];
    const expected = [departures[0]];
    departuresService.batchDepartures.mockReturnValueOnce([]);
    await batchDepartures(departures);
    expect(departuresService.batchDepartures).toHaveBeenCalledWith(expected);
  });

  it('merges updates with existing departures', async () => {
    const departures = [{ nodeId: '1', realtime: true, id: '1', realtimeArrival: 1234567 }];
    const batch = [{ nodeId: '1', realtime: true, id: '1', realtimeArrival: 1234568 }];
    departuresService.batchDepartures.mockReturnValueOnce(batch);
    const result = await batchDepartures(departures);
    expect(result[0].realtimeArrival).toBe(batch[0].realtimeArrival);
  });

  it('merges updates with existing departures including non realtime departures', async () => {
    const departures = [{ nodeId: '1', realtime: true }, { nodeId: '2', realtime: false }];
    const batch = [{ nodeId: '1', realtime: true, id: '1', realtimeArrival: 1234568 }];
    departuresService.batchDepartures.mockReturnValueOnce(batch);
    const result = await batchDepartures(departures);
    expect(result.length).toBe(2);
  });
});
