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

describe('sortBy', () => {
    it('returns an empty array if given an empty array', () => {
        expect(utils.sortBy()([])).toEqual([]);
    });

    it('returns an empty array if given undefined', () => {
        expect(utils.sortBy()()).toEqual([]);
    });

    it('sorts array by values when iteratee is not defined', () => {
        const values = [2,3,1,4,5];
        expect(utils.sortBy()(values)).toEqual([1, 2, 3, 4, 5]);
    });

    it('sorts array running values through iterator', () => {
        const values = [{ id: 3 }, { id: 1 }, { id: 2 }];
        const iterator = val => val.id;
        const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
        expect(utils.sortBy(iterator)(values)).toEqual(expected);
    });
});