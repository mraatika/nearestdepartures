import * as utils from './utils';

describe('unique', () => {
  it('returns an empty array if given an empty array', () => {
    expect(utils.uniq()([])).toEqual([]);
  });

  it('returns an empty array if given undefined', () => {
    expect(utils.uniq()()).toEqual([]);
  });

  it('returns unique values given no iterator fn', () => {
    const values = [1,2,2,3,3];
    expect(utils.uniq()(values)).toEqual([1, 2, 3]);
  });

  it('returns unique values using an iterator fn', () => {
    const values = [{ id: 1 }, { id: 1 }, { id: 2 }];
    const iterator = val => val.id;
    const expected = [{ id: 1 }, { id: 2 }];
    expect(utils.uniq(iterator)(values)).toEqual(expected);
  });
});

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
