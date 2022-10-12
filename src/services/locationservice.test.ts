import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import { findGPSLocation, stopLocating } from './locationService';

let watchPositionMock: Mock = vi.fn();
let clearWatchMock: Mock = vi.fn();

describe('when unsupported', () => {
  it('throws when geolocation api is unsupported', async () => {
    await expect(findGPSLocation()).rejects.toEqual(
      new Error('Selain ei tue paikannusta'),
    );
  });
});

describe('when supported', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      geolocation: {
        watchPosition: watchPositionMock,
        clearWatch: clearWatchMock,
      },
    });
  });

  afterEach(() => {
    stopLocating();
    vi.resetAllMocks();
  });

  it('calls watchPosition', () => {
    findGPSLocation();
    expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
  });

  it('returns location when it is found', async () => {
    const location = { coords: { latitude: 1, longitude: 2 } };
    watchPositionMock.mockImplementationOnce((fn) => fn(location));

    const result = await findGPSLocation();
    expect(result.latitude).toEqual(location.coords.latitude);
    expect(result.longitude).toEqual(location.coords.longitude);
  });

  it('clears watcher when current position is found', async () => {
    const watcherId = '123';

    watchPositionMock.mockImplementationOnce((fn) => {
      setTimeout(() => fn({ coords: {} }), 0);
      return watcherId;
    });

    await findGPSLocation();
    expect(window.navigator.geolocation.clearWatch).toHaveBeenCalledWith(
      watcherId,
    );
  });

  it('throws when called when the previous watch is still active', async () => {
    watchPositionMock.mockImplementationOnce((fn) => {
      fn({ coords: {} });
      return '123';
    });

    expect.assertions(1);

    findGPSLocation();
    try {
      await findGPSLocation();
    } catch (e: any) {
      expect(e.message).toEqual('Sijainninhaku on jo käynnissä');
    }
  });

  it('throws when current position is not found', async () => {
    const error = new Error();
    watchPositionMock.mockImplementationOnce((_f, fn) => fn(error));
    await expect(findGPSLocation()).rejects.toBeInstanceOf(Error);
  });

  it('stops location search with stopLocating if a watcher is initiated', async () => {
    watchPositionMock.mockImplementationOnce((fn) => {
      fn({ coords: {} });
      return '123';
    });

    findGPSLocation();
    stopLocating();
    expect(window.navigator.geolocation.clearWatch).toHaveBeenCalled();
  });

  it('does not call clearWatch if a watcher is not initiated', async () => {
    watchPositionMock.mockImplementationOnce((fn) => {
      fn({ coords: {} });
      return '123';
    });
    stopLocating();
    expect(window.navigator.geolocation.clearWatch).not.toHaveBeenCalled();
  });
});
