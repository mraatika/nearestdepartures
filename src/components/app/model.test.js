import * as model from './model';

describe('Toggling vehicle filters', () => {
  it('should not throw if vehicletypes is undefined', () => {
    const type = 'BUS';
    const state = { filters: { vehicleTypes: undefined } };
    expect(() => model.updateVehicleFilters(type, false, state)).not.toThrow();
  });


  it('selects a filter when it is not toggled', () => {
    const type = 'BUS';
    const state = { filters: { vehicleTypes: [] } };
    const result = model.updateVehicleFilters(type, false, state);
    expect(result.vehicleTypes).toEqual([type]);
  });

  it('selects only the given filter when multiple filters are toggled', () => {
    const type = 'BUS';
    const state = { filters: { vehicleTypes: [type, 'TRAIN'] } };
    const result = model.updateVehicleFilters(type, false, state);
    expect(result.vehicleTypes).toEqual([type]);
  });

  it('selects only the given filter when it\'s not selected but smultiple others are', () => {
    const type = 'BUS';
    const state = { filters: { vehicleTypes: ['TRAIN', 'FERRY'] } };
    const result = model.updateVehicleFilters(type, false, state);
    expect(result.vehicleTypes).toEqual([type]);
  });

  it('selects all filters when a filter is reselected', () => {
    const type = 'BUS';
    const state = { filters: { vehicleTypes: [type] } };
    const result = model.updateVehicleFilters(type, false, state);
    expect(result.vehicleTypes).toEqual(model.allVehicleTypes);
  });

  it('adds filter to the list of filters with when multiple is true', () => {
    const type = 'BUS';
    const state = { filters: { vehicleTypes: ['TRAIN', 'FERRY'] } };
    const result = model.updateVehicleFilters(type, true, state);
    expect(result.vehicleTypes).toEqual(['TRAIN', 'FERRY', 'BUS']);
  });

  it('removes filter from the list of filters with when multiple is true and the given filter is toggled', () => {
    const type = 'BUS';
    const state = { filters: { vehicleTypes: [type, 'TRAIN', 'FERRY'] } };
    const result = model.updateVehicleFilters(type, true, state);
    expect(result.vehicleTypes).toEqual(['TRAIN', 'FERRY']);
  });
});
