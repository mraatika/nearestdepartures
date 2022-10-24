import { describe, expect, it, vi } from 'vitest';
import * as utils from './dom.utils';

describe('onKeys', () => {
  it('should call the given callback when key code is included in the codes list', () => {
    const cb = vi.fn();
    utils.onKeys(['Escape'], cb)({ code: 'Escape' } as any);
    expect(cb).toHaveBeenCalled();
  });

  it('should not call the given callback when key code is not included in the codes list', () => {
    const cb = vi.fn();
    utils.onKeys(['Escape'], cb)({ code: 'Enter' } as any);
    expect(cb).not.toHaveBeenCalled();
  });
});
