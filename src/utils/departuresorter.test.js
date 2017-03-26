import sort from './departuresorter';

it('returns list in same order as before if prop is missing', () => {
     const departures = [
        { routeName: 'DEF' },
        { routeName: 'ABC' },
        { routeName: 'XYZ' },
    ];
    const result = sort()(departures);
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

    const result = sort('routeName')(departures);

    expect(result).toEqual(sorted);
});

it('does not modify the original list', () => {
    const departures = [
        { destination: 'DEF' },
        { destination: 'ABC' },
        { destination: 'XYZ' },
    ];

    const result = sort('destination')(departures);

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

    const result = sort('destination')(departures);

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

    const result = sort('distance')(departures);

    expect(result).toEqual(sorted);
});

it('sorts departures descending by scheduled departure', () => {
    const departures = [
        { scheduledDeparture: 100, serviceDay: 100 },
        { scheduledDeparture: 50, serviceDay: 100 },
        { scheduledDeparture: 600, serviceDay: 100 },
    ];
     const sorted = [
        { scheduledDeparture: 50, serviceDay: 100 },
        { scheduledDeparture: 100, serviceDay: 100 },
        { scheduledDeparture: 600, serviceDay: 100 },
    ];

    const result = sort('time')(departures);

    expect(result).toEqual(sorted);
});

it('sorts departures descending by realtime departure', () => {
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

    const result = sort('time')(departures);

    expect(result).toEqual(sorted);
});

it('sorts departures descending by realtime departure if available otherwise by scheduled', () => {
    const departures = [
        { realtimeDeparture: 100, serviceDay: 100, realtime: true },
        { scheduledDeparture: 20, serviceDay: 100 },
        { realtimeDeparture: 50, serviceDay: 100, realtime: true },
        { scheduledDeparture: 800, serviceDay: 100 },
        { realtimeDeparture: 600, serviceDay: 100, realtime: true },
    ];
     const sorted = [
        { scheduledDeparture: 20, serviceDay: 100 },
        { realtimeDeparture: 50, serviceDay: 100, realtime: true },
        { realtimeDeparture: 100, serviceDay: 100, realtime: true },
        { realtimeDeparture: 600, serviceDay: 100, realtime: true },
        { scheduledDeparture: 800, serviceDay: 100 },
    ];

    const result = sort('time')(departures);

    expect(result).toEqual(sorted);
});

