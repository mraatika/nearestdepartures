import geolocate from 'mock-geolocation';
import { findGPSLocation, stopLocating } from './locationservice';


describe('when unsupported', () => {
  it('throws when geolocation api is unsupported', () => {
    return findGPSLocation().catch(e => expect(e.message).toEqual('Selain ei tue paikannusta'));
  });
});

describe('when supported', () => {
  beforeEach(() => geolocate.use());

  afterEach(() => {
    stopLocating();
    geolocate.restore();
  });

  it('calls watchPosition', () => {
    navigator.geolocation.watchPosition = jest.fn();

    findGPSLocation();
    expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
  });

  it('resolves when current position is found', () => {
    navigator.geolocation.watchPosition = jest.fn(resolve => resolve({ coords: {} }));
    return findGPSLocation();
  });

  it('returns location when it is found', async () => {
    const location = { latitude: 1, longitude: 2 };

    setTimeout(() => geolocate.send(location), 1);

    const result = await findGPSLocation();

    expect(result.latitude).toEqual(location.latitude);
    expect(result.longitude).toEqual(location.longitude);
  });

  it('clears watcher when current position is found', async () => {
    const watcherId = '123';

    navigator.geolocation.watchPosition = jest.fn((resolve) => {
      setTimeout(() => resolve({ coords: {} }), 0);
      return watcherId;
    });

    navigator.geolocation.clearWatch = jest.fn();

    await findGPSLocation();
    expect(navigator.geolocation.clearWatch).toHaveBeenCalledWith(watcherId);
  });

  it('should not initiate multiple watchers', async () => {
    navigator.geolocation.watchPosition = jest.fn().mockReturnValueOnce('123');

    findGPSLocation();
    findGPSLocation();

    expect(navigator.geolocation.watchPosition).toHaveBeenCalledTimes(1);
  });

  it('throws when current position is not found', () => {
    const error = new Error();
    navigator.geolocation.watchPosition = jest.fn((resolve, reject) => reject(error));
    return findGPSLocation().catch(e => expect(e).toBeInstanceOf(Error));
  });

  it('stops location search with stopLocating if a watcher is initiated', async () => {
    navigator.geolocation.clearWatch = jest.fn();

    findGPSLocation();
    stopLocating();

    expect(navigator.geolocation.clearWatch).toHaveBeenCalled();
  });

  it('does not call clearWatch if a watcher is not initiated', async () => {
    navigator.geolocation.clearWatch = jest.fn();

    stopLocating();

    expect(navigator.geolocation.clearWatch).not.toHaveBeenCalled();
  });
});
