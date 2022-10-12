import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as api from '@/api';
import { fetchDepartureBatch, fetchDepartures } from './departureService';
import type { Filters, Location } from '@/types';
import type { VEHICLE_TYPE } from '@/enums';
import * as util from '@/util';

const fetchMock = vi.spyOn(api, 'fetchJSON');

describe('fetchDepartures', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('fetching', () => {
    it('fetches all departures', async () => {
      const position = { latitude: 1, longitude: 2 };
      const filters = {
        range: 400,
        vehicleTypes: ['FERRY', 'RAIL', 'SUBWAY'] as VEHICLE_TYPE[],
      };

      fetchMock.mockResolvedValueOnce({});

      await fetchDepartures(position, filters);

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
        query: expect.any(String),
        variables: {
          latitude: 1,
          longitude: 2,
          timeRange: expect.any(Number),
          departuresCount: expect.any(Number),
          maxResults: expect.any(Number),
          maxDistance: 400,
        },
      });
    });

    it('rejects with an error message if fetch fails', async () => {
      fetchMock.mockRejectedValueOnce(new Error('BOOM!'));
      await expect(
        fetchDepartures({} as Location, {} as Filters),
      ).rejects.toEqual(new Error('Lähtöjen haku epäonnistui: BOOM!'));
    });
  });

  describe('normalizing departures', () => {
    it('returns an empty array if param.data is not defined', async () => {
      fetchMock.mockResolvedValueOnce({});
      const result = fetchDepartures({} as Location, {} as Filters);
      await expect(result).resolves.toEqual([]);
    });

    it('returns an array containing an object when response data.nearest.edges has one node', async () => {
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];

      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result.length).toBe(1);
    });

    it('returns an array with as many members as there are nodes', async () => {
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ trip: {} }],
            },
          },
        },
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result.length).toBe(edges.length);
    });

    it('returns exclude departure if there are no stoptimes', async () => {
      const edges = [
        {
          node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [] } },
        },
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result.length).toBe(1);
    });

    it('departure has id', async () => {
      const id = 'abc';
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ trip: { id } }],
            },
          },
        },
      ];

      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].id).toBe(id);
    });

    it('takes id from trip, not from node', async () => {
      const id = 'abc';
      const nodeId = '123';
      const edges = [
        {
          node: {
            id: nodeId,
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ trip: { id } }],
            },
          },
        },
      ];

      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].id).not.toBe(nodeId);
    });

    it('departure has routeUrl', async () => {
      const routeCode = 'abc';
      const stopCode = 'def';
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { code: stopCode, route: { gtfsId: routeCode } },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];

      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].routeUrl).toBe(
        `https://www.reittiopas.fi/linjat/${routeCode}/pysakit/${stopCode}`,
      );
    });

    it('departure has distance', async () => {
      const distance = 100;
      const edges = [
        {
          node: {
            distance,
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];

      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].distance).toBe(distance);
    });

    it('departure has vehicle type', async () => {
      const vehicleType = 'TRAM';
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: { mode: vehicleType } },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].vehicleType).toBe(vehicleType);
    });

    it('departure has route id', async () => {
      const routeId = 'HSL:200A';
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: { gtfsId: routeId } },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].routeId).toBe(routeId);
    });

    it('departure has route identifier', async () => {
      const routeName = '9';
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: { shortName: routeName } },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].routeName).toBe(routeName);
    });

    it('departure has destination', async () => {
      const destination = 'Pasila';
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ headsign: destination, trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].destination).toBe(destination);
    });

    it('departure has destination from route if stoptimes headsign is null', async () => {
      const destination = 'Lauttasaari';
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { headsign: destination, route: {} },
              stoptimes: [{ headsign: null, trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].destination).toBe(destination);
    });

    it('departure has departure time', async () => {
      const scheduledDeparture = 1234567890;
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ scheduledDeparture, trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].scheduledDeparture).not.toBe(undefined);
    });

    it('departure time is sum of serviceDay and scheduledDeparture', async () => {
      const scheduledDeparture = 123456;
      const serviceDay = 1234567890;
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ scheduledDeparture, serviceDay, trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].scheduledDeparture).toBe(
        serviceDay + scheduledDeparture,
      );
    });

    it('departure has realtime flag', async () => {
      const realtime = true;
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ realtime, trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].realtime).toBe(realtime);
    });

    it('departure has realtime departure time', async () => {
      const realtimeDeparture = 1234567890;
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ realtimeDeparture, trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].realtimeDeparture).not.toBe(undefined);
    });

    it('realtime departure time is combination of serviceDay and realtimeDeparture', async () => {
      const realtimeDeparture = 654321;
      const serviceDay = 1234567892;
      const edges = [
        {
          node: {
            place: {
              stop: {},
              pattern: { route: {} },
              stoptimes: [{ realtimeDeparture, serviceDay, trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].realtimeDeparture).toBe(serviceDay + realtimeDeparture);
    });

    it('departure has stop name', async () => {
      const stopName = 'Fleminginkatu';
      const edges = [
        {
          node: {
            place: {
              pattern: { route: {} },
              stop: { name: stopName },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].stopName).toBe(stopName);
    });

    it('departure has stop code', async () => {
      const stopCode = '0652';
      const edges = [
        {
          node: {
            place: {
              pattern: { route: {} },
              stop: { code: stopCode },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].stopCode).toBe(stopCode);
    });

    it('departure has stop description', async () => {
      const description = 'Fleminginkatu 13';
      const edges = [
        {
          node: {
            place: {
              pattern: { route: {} },
              stop: { desc: description },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].stopDescription).toBe(description);
    });

    it('departure has stop url', async () => {
      const stopId = 'HSL:100:1';
      const edges = [
        {
          node: {
            place: {
              pattern: { route: {} },
              stop: { gtfsId: stopId },
              stoptimes: [{ trip: {} }],
            },
          },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result[0].stopUrl).toBe(
        `https://www.reittiopas.fi/pysakit/${stopId}`,
      );
    });

    it('returns as many rows as there are stoptimes', async () => {
      const scheduledDeparture = 1234567890;
      const stoptimes = [
        { scheduledDeparture, trip: {} },
        { scheduledDeparture, trip: {} },
      ];
      const edges = [
        {
          node: { place: { stop: {}, pattern: { route: {} }, stoptimes } },
        },
      ];
      fetchMock.mockResolvedValueOnce({ data: { nearest: { edges } } });
      const result = await fetchDepartures({} as Location, {} as Filters);
      expect(result.length).toBe(2);
    });
  });

  describe('batching', () => {
    it('batches departures', async () => {
      const departures: any = [{ nodeId: '1', realtime: true }];

      vi.spyOn(util, 'getNowInSeconds').mockReturnValue(123);
      fetchMock.mockResolvedValueOnce({});
      await fetchDepartureBatch(departures);

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(expect.any(String), [
        {
          query: expect.any(String),
          variables: {
            id: '1',
            startTime: 123,
            departuresCount: expect.any(Number),
          },
        },
      ]);
    });

    it('rejects with an error message if fetch fails', async () => {
      fetchMock.mockRejectedValueOnce(new Error('BOOM!'));
      await expect(fetchDepartureBatch([])).rejects.toEqual(
        new Error('Lähtöjen päivitys epäonnistui: BOOM!'),
      );
    });
  });
});
