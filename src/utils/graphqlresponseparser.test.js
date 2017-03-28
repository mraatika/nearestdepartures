import parseResponse from './graphqlresponseparser';

it('returns an empty array if called without params', () => {
    const result = parseResponse();
    expect(result).toEqual([]);
});

it('returns an empty array if param.data is not defined', () => {
    const result = parseResponse({});
    expect(result).toEqual([]);
});

it('returns an array containing an object when response data.nearest.edges has one node', () => {
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes: [{ trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result.length).toBe(1);
    expect(result[0] instanceof Object).toBe(true);
});

it('returns an array with as many members as there are nodes', () => {
    const edges = [
        { node: { place: { pattern: { route: {} }, stoptimes: [{ trip: {} }]}, pattern: { route: {} } } },
        { node: { place: { pattern: { route: {} }, stoptimes: [{ trip: {} }]}, pattern: { route: {} } } },
    ];
    const response = { data: { nearest: { edges } } };
    const result = parseResponse(response);
    expect(result.length).toBe(edges.length);
});

it('returns exclude departure if there are no stoptimes', () => {
    const edges = [
        { node: { place: { pattern: { route: {} }, stoptimes: [] }, pattern: { route: {} } } },
        { node: { place: { pattern: { route: {} }, stoptimes: [{ trip: {} }] }, pattern: { route: {} } } },
    ];
    const response = { data: { nearest: { edges } } };
    const result = parseResponse(response);
    expect(result.length).toBe(1);
});

it('departure has id', () => {
    const id = 'abc';
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes: [{ trip: { id } }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].id).toBe(id);
});


it('departure has distance', () => {
    const distance = 100;
    const response = { data: { nearest: { edges: [{ node: { distance, place: { pattern: { route: {} }, stoptimes: [{ trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].distance).toBe(distance);
});

it('departure has vehicle type', () => {
    const vehicleType = 'TRAM';
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: { mode: vehicleType } }, stoptimes: [{ trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].vehicleType).toBe(vehicleType);
});

it('departure has route identifier', () => {
    const routeName = '9';
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: { shortName: routeName } }, stoptimes: [{ trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].routeName).toBe(routeName);
});

it('departure has destination', () => {
    const destination = 'Pasila';
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes: [{ headsign: destination, trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].destination).toBe(destination);
});

it('departure has departure time', () => {
    const scheduledDeparture = 1234567890;
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes: [{ scheduledDeparture, trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].scheduledDeparture).not.toBe(undefined);
});

it('departure time is sum of serviceDay and scheduledDeparture', () => {
    const scheduledDeparture = 123456;
    const serviceDay = 1234567890;
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes: [{ scheduledDeparture, serviceDay, trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].scheduledDeparture).toBe(serviceDay + scheduledDeparture);
});

it('departure has realtime flag', () => {
    const realtime = true;
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes: [{ realtime, trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].realtime).toBe(realtime);
});

it('departure has realtime departure time', () => {
    const realtimeDeparture = 1234567890;
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes: [{ realtimeDeparture, trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].realtimeDeparture).not.toBe(undefined);
});

it('realtime departure time is combination of serviceDay and realtimeDeparture', () => {
    const realtimeDeparture = 654321;
    const serviceDay = 1234567892;
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes: [{ realtimeDeparture, serviceDay, trip: {} }]}, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result[0].realtimeDeparture).toBe(serviceDay + realtimeDeparture);
});

it('returns as many rows as there are stoptimes', () => {
    const scheduledDeparture = 1234567890;
    const stoptimes = [
        { scheduledDeparture, trip: {} },
        { scheduledDeparture, trip: {} },
    ];
    const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stoptimes }, pattern: { route: {} } } }] } } };
    const result = parseResponse(response);
    expect(result.length).toBe(2);
});
