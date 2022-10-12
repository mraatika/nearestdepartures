import { describe, expect, it, vi } from 'vitest';
import { batchDepartures } from './model';
import * as departuresService from '@/services/departureService';

describe('batchDepartures', () => {
  it('does not call service if departures list is empty', async () => {
    vi.spyOn(departuresService, 'fetchDepartureBatch');
    await batchDepartures([]);
    expect(departuresService.fetchDepartureBatch).not.toHaveBeenCalled();
  });

  it('only batches realtime departures', async () => {
    const departures: any = [
      { nodeId: '1', realtime: true },
      { nodeId: '2', realtime: false },
    ];
    vi.spyOn(departuresService, 'fetchDepartureBatch');

    await batchDepartures(departures);

    expect(departuresService.fetchDepartureBatch).toHaveBeenLastCalledWith([
      departures[0],
    ]);
  });

  it('batch request only includes unique departures', async () => {
    const departures: any = [
      { nodeId: '1', realtime: true },
      { nodeId: '1', realtime: true },
    ];
    vi.spyOn(departuresService, 'fetchDepartureBatch');

    await batchDepartures(departures);
    expect(departuresService.fetchDepartureBatch).toHaveBeenLastCalledWith([
      departures[0],
    ]);
  });

  it('resolves when departures is empty', async () => {
    const departures: any = [];
    const result = await batchDepartures(departures);
    expect(result).toBe(undefined);
  });

  it('resolves even if service throws', async () => {
    const departures: any = [{ nodeId: '1', realtime: true }];
    vi.spyOn(departuresService, 'fetchDepartureBatch').mockRejectedValueOnce(
      new Error('BOOM!'),
    );
    const result = await batchDepartures(departures);
    expect(result).toBe(undefined);
  });

  it('merges updates with existing departures', async () => {
    const departures: any = [
      { nodeId: '1', realtime: true, id: '1', realtimeArrival: 123 },
    ];
    const batch: any = [
      { nodeId: '1', realtime: true, id: '1', realtimeArrival: 124 },
    ];

    vi.spyOn(departuresService, 'fetchDepartureBatch').mockResolvedValueOnce(
      batch,
    );
    const result: any = await batchDepartures(departures);
    expect(result[0].realtimeArrival).toBe(batch[0].realtimeArrival);
  });

  it('merges updates with existing departures including non realtime departures', async () => {
    const departures: any = [
      { nodeId: '1', realtime: true },
      { nodeId: '2', realtime: false },
    ];
    const batch: any = [{ nodeId: '1', realtime: true, realtimeArrival: 123 }];
    vi.spyOn(departuresService, 'fetchDepartureBatch').mockResolvedValueOnce(
      batch,
    );
    const result = await batchDepartures(departures);
    expect(result!.length).toBe(2);
  });
});
