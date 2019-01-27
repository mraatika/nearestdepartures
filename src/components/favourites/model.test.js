import { isLocationFavoured } from './model';

describe('findAddress', () => {
  it('returns true if address is found from the list of favourites', () => {
    const address = { label: 'Label' };
    expect(isLocationFavoured(address, [address])).toEqual(true);
    expect(isLocationFavoured(address, [{ label: 'LabelX' }, address])).toEqual(true);
  });

  it('returns false if address is not found from the list of favourites', () => {
    const address = { label: 'Label' };
    expect(isLocationFavoured(address, [])).toEqual(false);
    expect(isLocationFavoured(address, [{ label: 'LabelX' }])).toEqual(false);
  });
});

