import sort from './departuresorter';

it('returns list in same order as before if prop is missing', () => {
     const departures = [
        { routeName: 'DEF' },
        { routeName: 'ABC' },
        { routeName: 'XYZ' },
    ];
    const result = sort(departures);
    expect(result).toEqual(departures);
});

it('sorts departures descending by route name', () => {
    const departures = [
        { routeName: 'DEF' },
        { routeName: 'ABC' },
        { routeName: 'XYZ' },
    ];
     const sorted = [
        { routeName: 'ABC' },
        { routeName: 'DEF' },
        { routeName: 'XYZ' },
    ];

    const result = sort(departures, 'routeName');

    expect(result).toEqual(sorted);
});

it('sorts departures descending by route name numbers first and naturally sorted', () => {
    const departures = [
        { routeName: '1' },
        { routeName: '10' },
        { routeName: '200' },
        { routeName: '2' },
        { routeName: 'M2' },
        { routeName: 'A' },
    ];

    const sorted = [
      { routeName: '1' },
      { routeName: '2' },
      { routeName: '10' },
      { routeName: '200' },
      { routeName: 'A' },
      { routeName: 'M2' },
    ];

    const result = sort(departures, 'routeName');

    expect(result).toEqual(sorted);
});

it('reverses sort array when sortDir is -1', () => {
    const departures = [
        { routeName: 'DEF' },
        { routeName: 'ABC' },
        { routeName: 'XYZ' },
    ];
     const sorted = [
        { routeName: 'XYZ' },
        { routeName: 'DEF' },
        { routeName: 'ABC' },
    ];

    const result = sort(departures, 'routeName', -1);

    expect(result).toEqual(sorted);
});

it('does not modify the original list', () => {
    const departures = [
        { destination: 'DEF' },
        { destination: 'ABC' },
        { destination: 'XYZ' },
    ];

    const result = sort(departures, 'destination');

    expect(result).not.toBe(departures);
});

it('sorts departures descending by destination', () => {
    const departures = [
        { destination: 'DEF' },
        { destination: 'ABC' },
        { destination: 'XYZ' },
    ];
     const sorted = [
        { destination: 'ABC' },
        { destination: 'DEF' },
        { destination: 'XYZ' },
    ];

    const result = sort(departures, 'destination');

    expect(result).toEqual(sorted);
});

it('sorts departures descending by distance', () => {
    const departures = [
        { distance: 100 },
        { distance: 50 },
        { distance: 600 },
    ];
     const sorted = [
        { distance: 50 },
        { distance: 100 },
        { distance: 600 },
    ];

    const result = sort(departures, 'distance');

    expect(result).toEqual(sorted);
});

it('sorts departures descending by departure time', () => {
    const departures = [
        { realtimeDeparture: 100, serviceDay: 100, realtime: true },
        { realtimeDeparture: 50, serviceDay: 100, realtime: true },
        { realtimeDeparture: 600, serviceDay: 100, realtime: true },
    ];
     const sorted = [
        { realtimeDeparture: 50, serviceDay: 100, realtime: true },
        { realtimeDeparture: 100, serviceDay: 100, realtime: true },
        { realtimeDeparture: 600, serviceDay: 100, realtime: true },
    ];

    const result = sort(departures, 'time');

    expect(result).toEqual(sorted);
});

it('sorts departures descending by distance and then by realtimedeparture', () => {
  const departures = [
    { distance: 150, realtimeDeparture: 100, serviceDay: 100, realtime: true },
    { distance: 100, realtimeDeparture: 50, serviceDay: 100, realtime: true },
    { distance: 150, realtimeDeparture: 50, serviceDay: 100, realtime: true },
    { distance: 50, realtimeDeparture: 600, serviceDay: 100, realtime: true },
    { distance: 100, realtimeDeparture: 600, serviceDay: 100, realtime: true },
    { distance: 50, realtimeDeparture: 50, serviceDay: 100, realtime: true },
  ];
  const sorted = [
    { distance: 50, realtimeDeparture: 50, serviceDay: 100, realtime: true },
    { distance: 50, realtimeDeparture: 600, serviceDay: 100, realtime: true },
    { distance: 100, realtimeDeparture: 50, serviceDay: 100, realtime: true },
    { distance: 100, realtimeDeparture: 600, serviceDay: 100, realtime: true },
    { distance: 150, realtimeDeparture: 50, serviceDay: 100, realtime: true },
    { distance: 150, realtimeDeparture: 100, serviceDay: 100, realtime: true },
  ];
  const result = sort(departures, 'distance');
  expect(result).toEqual(sorted);
});
