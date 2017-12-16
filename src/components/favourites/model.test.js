import { areLocationsEqual, isLocationFavoured } from './model'

describe('areLocationsEqual', () => {
  it('returns true if two addresses have matching labels', () => {
      const address = { label: 'Label' }
      expect(areLocationsEqual(address, address)).toEqual(true);
  });

  it('returns false if two addresses do not have matching labels', () => {
      const address1 = { label: 'Label1' }
      const address2 = { label: 'Label2' }
      expect(areLocationsEqual(address1, address2)).toEqual(false);
  });
});

describe('findAddress', () => {
  it('returns true if address is found from the list of favourites', () => {
    const address = { label: 'Label' };
    expect(isLocationFavoured(address, [address])).toEqual(true)
    expect(isLocationFavoured(address, [{ label: 'LabelX' }, address])).toEqual(true)
  });

  it('returns false if address is not found from the list of favourites', () => {
    const address = { label: 'Label' };
    expect(isLocationFavoured(address, [])).toEqual(false)
    expect(isLocationFavoured(address, [{ label: 'LabelX' }])).toEqual(false)
  });
});

