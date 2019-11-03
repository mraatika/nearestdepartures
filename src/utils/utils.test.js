import * as utils from './utils';

describe('areLocationsEqual', () => {
  it('returns true if two addresses have matching labels', () => {
    const address = { label: 'Label' };
    expect(utils.areLocationsEqual(address, address)).toEqual(true);
  });

  it('returns false if two addresses do not have matching labels', () => {
    const address1 = { label: 'Label1' };
    const address2 = { label: 'Label2' };
    expect(utils.areLocationsEqual(address1, address2)).toEqual(false);
  });
});
