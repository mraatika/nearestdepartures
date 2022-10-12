import { describe, expect, it, vi } from 'vitest';
import * as api from '@/api';
import { fetchDisruptions } from './disruptionsService';

const fetchMock = vi.spyOn(api, 'fetchJSON');

describe('DisruptionsService', () => {
  it('should return an object with routeId as key and received alert as value', async () => {
    const routeId = 'HSL:2001';
    const alert = {
      alertHeaderText: 'Alert!',
      alertUrl: 'http://google.com',
      alertDescriptionText: 'Alert body',
      route: { gtfsId: routeId },
    };
    fetchMock.mockResolvedValueOnce({ data: { alerts: [alert] } });
    const response = await fetchDisruptions();
    expect(response).toEqual([alert]);
  });

  it('should return all departures errors', async () => {
    const routeId = 'HSL:2001';
    const alert1 = {
      alertHeaderText: 'Alert!',
      alertUrl: 'http://google.com',
      alertDescriptionText: 'Alert body',
      route: { gtfsId: routeId },
    };
    const alert2 = {
      alertHeaderText: 'Other alert!',
      alertDescriptionText: 'Other alert body',
      route: { gtfsId: routeId },
    };
    fetchMock.mockResolvedValueOnce({ data: { alerts: [alert1, alert2] } });
    const response = await fetchDisruptions();
    expect(response).toEqual([alert1, alert2]);
  });

  it('should not contain disruptions without route', async () => {
    const alert = {
      alertHeaderText: 'Alert!',
      alertUrl: 'http://google.com',
      alertDescriptionText: 'Alert body',
      route: null,
    };
    fetchMock.mockResolvedValueOnce({ data: { alerts: [alert] } });
    const response = await fetchDisruptions();
    expect(response).toEqual([]);
  });

  it('should return an empty array if fetch fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error());
    const response = await fetchDisruptions();
    expect(response).toEqual([]);
  });
});
