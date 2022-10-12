import { describe, expect, it, vi } from 'vitest';
import * as util from '@/util';
import * as model from './model';

describe('filtering departures', () => {
  it('returns departures that match the filters and are in the future', () => {
    const filters: any = { range: 100, vehicleTypes: ['BUS', 'TRAM'] };
    const departures: any = [
      { distance: 99, realtimeDeparture: 2, vehicleType: 'BUS' },
      { distance: 100, realtimeDeparture: 2, vehicleType: 'BUS' },
      { distance: 101, realtimeDeparture: 2, vehicleType: 'TRAM' },
    ];

    vi.spyOn(util, 'getNowInSeconds').mockReturnValue(2);
    const result = model.filterDepartures(filters, departures);
    expect(result.length).toBe(2);
  });

  it('does not return departures are in the past', () => {
    const filters: any = { range: 100, vehicleTypes: ['BUS'] };
    const departures: any = [
      { distance: 100, realtimeDeparture: 1, vehicleType: 'BUS' },
    ];

    vi.spyOn(util, 'getNowInSeconds').mockReturnValue(2);
    const result = model.filterDepartures(filters, departures);
    expect(result.length).toBe(0);
  });

  it('does not return departures that do not match the vehicle filter', () => {
    const filters: any = { range: 100, vehicleTypes: ['BUS', 'TRAM'] };
    const departures: any = [
      { distance: 100, realtimeDeparture: 2, vehicleType: 'SUBWAY' },
    ];

    vi.spyOn(util, 'getNowInSeconds').mockReturnValue(2);
    const result = model.filterDepartures(filters, departures);
    expect(result.length).toBe(0);
  });
});

describe('getDistanceinHumanReadableForm', () => {
  it('returns empty string if number is not finite', () => {
    expect(model.getDistanceinHumanReadableForm(Infinity)).toEqual('');
  });

  it('returns distance in kilometers if >= 1000', () => {
    expect(model.getDistanceinHumanReadableForm(10001)).toEqual('10 km');
    expect(model.getDistanceinHumanReadableForm(1000)).toEqual('1 km');
    expect(model.getDistanceinHumanReadableForm(1000.2)).toEqual('1 km');
  });

  it('returns distance in kilometers if number rounds up to 1000', () => {
    expect(model.getDistanceinHumanReadableForm(999.99)).toEqual('1 km');
  });

  it('returns distance in meters if < 1000', () => {
    expect(model.getDistanceinHumanReadableForm(200)).toEqual('200 m');
    expect(model.getDistanceinHumanReadableForm(0.9)).toEqual('1 m');
  });
});
