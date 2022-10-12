import { describe, expect, it } from 'vitest';
import { isLocationFavoured } from './model';

describe('findAddress', () => {
  it('returns true if address is found from the list of favourites', () => {
    const address: any = { id: 'Label' };
    const favourites = [{ id: 'LabelX' }, address];
    expect(isLocationFavoured([address], address)).toEqual(true);
    expect(isLocationFavoured(favourites, address)).toEqual(true);
  });

  it('returns false if address is not found from the list of favourites', () => {
    const address: any = { id: 'Label' };
    const favourites = [<any>{ id: 'LabelX' }];
    expect(isLocationFavoured([], address)).toEqual(false);
    expect(isLocationFavoured(favourites, address)).toEqual(false);
  });
});
