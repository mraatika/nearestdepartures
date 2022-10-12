import { describe, expect, it } from 'vitest';
import * as util from './';
describe('padNumber', () => {
  it('pads number if is zero digit', () => {
    expect(util.padNumber(1)).toEqual('01');
  });

  it('does not pad number if is two or more digits long', () => {
    expect(util.padNumber(11)).toEqual('11');
    expect(util.padNumber(111)).toEqual('111');
  });

  it('does not pad number if fraction', () => {
    expect(util.padNumber(0.5)).toEqual('0.5');
    expect(util.padNumber(0.5)).toEqual('0.5');
    expect(util.padNumber(1.1)).toEqual('1.1');
  });
});

describe('toTimeString', () => {
  it('displays padded times', () => {
    const d = new Date(2018, 1, 1, 1, 1, 1);
    expect(util.toTimeStringWithSeconds(d)).toEqual('01:01:01');
  });
});
