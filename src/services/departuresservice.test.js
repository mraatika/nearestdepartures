import { batchDepartures } from './departuresservice';

describe('batching', () => {
  beforeEach(() => fetch.mockReset());

  it('should resolve with an empty array when called without params', async () => {
    const result = await batchDepartures();
    expect(result).toEqual([]);
  });

  it('should resolve with an empty array when called with an empty array', async () => {
    const result = await batchDepartures([]);
    expect(result).toEqual([]);
  });

  it('should call fetch', async () => {
    const departures = [
      { nodeId: '1', realtime: true },
    ];

    fetch.mockResponseOnce('[]', { status: 200 });

    await batchDepartures(departures);

    expect(fetch).toHaveBeenCalled();
  });

  describe('parsing response', () => {
    it('should return an array of objects', async () => {
      const departures = [
        { nodeId: '1' },
        { nodeId: '2' },
      ];

      const response = [
        { payload: { data: { node: { id: '1', stoptimes: [{ trip: {} }] } } } },
        { payload: { data: { node: { id: '2', stoptimes: [{ trip: {} }] } } } },
      ];

      fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

      const data = await batchDepartures(departures);

      expect(data).toBeInstanceOf(Array);
      expect(data.length).toEqual(2);
    });

    it('data object has nodeId', async () => {
      const departures = [{ nodeId: '2', realtime: true }];
      const response = [{ payload: { data: { node: { id: '2', stoptimes: [{ trip: {} }]  } } } }];

      fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

      const data = await batchDepartures(departures);

      expect(data[0].nodeId).toEqual(departures[0].nodeId);
    });

    it('data object has all props from stoptime', async () => {
      const departures = [{ nodeId: '2', realtime: true }];
      const node = {
        id: '2',
        stoptimes: [
          {
            serviceDay: 0,
            realtimeDeparture: 1234567,
            trip: {},
          }
        ],
      };
      const response = [{ payload: { data: { node } } }];

      fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

      const data = await batchDepartures(departures);
      const row = data[0];

      expect(row.realtime).toEqual(node.stoptimes[0].realtime);
      expect(row.realtimeDeparture).toEqual(node.stoptimes[0].realtimeDeparture);
    });

    it('data object has id from trip', async () => {
      const departures = [{ nodeId: '2', realtime: true }];
      const node = {
        id: '2',
        stoptimes: [
          {
            realtime: true,
            realtimeDeparture: 1234567,
            trip: {
              id: '1',
            },
          }
        ],
      };
      const response = [{ payload: { data: { node } } }];

      fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

      const data = await batchDepartures(departures);
      const row = data[0];

      expect(row.id).toEqual(node.stoptimes[0].trip.id);
    });

    it('should parse row from each stoptime row', async () => {
      const departures = [{ nodeId: '2', realtime: true }];
      const node = {
        id: '2',
        stoptimes: [
          {
            realtime: true,
            realtimeDeparture: 1234567,
            trip: {
              id: '1',
            },
          },
          {
            realtime: true,
            realtimeDeparture: 1234568,
            trip: {
              id: '2',
            },
          }
        ],
      };

      const response = [{ payload: { data: { node } } }];

      fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

      const data = await batchDepartures(departures);

      expect(data.length).toEqual(2);
    });
  });
});