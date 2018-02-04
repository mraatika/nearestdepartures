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
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result.length).toBe(1);
    expect(result[0] instanceof Object).toBe(true);
});

it('returns an array with as many members as there are nodes', () => {
    const edges = [
        { node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ trip: {} }]} } },
        { node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ trip: {} }]} } },
    ];
    const response = { data: { nearest: { edges } } };
    const result = parseResponse(response);
    expect(result.length).toBe(edges.length);
});

it('returns exclude departure if there are no stoptimes', () => {
    const edges = [
        { node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [] } } },
        { node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ trip: {} }] } } },
    ];
    const response = { data: { nearest: { edges } } };
    const result = parseResponse(response);
    expect(result.length).toBe(1);
});

it('departure has id', () => {
    const id = 'abc';
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ trip: { id } }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].id).toBe(id);
});

it('takes id from trip, not from node', () => {
    const id = 'abc';
    const nodeId = '123';
    const response = { data: { nearest: { edges: [{ node: { id: nodeId, place: { stop: {}, pattern: { route: {} }, stoptimes: [{ trip: { id } }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].id).not.toBe(nodeId);
});

it('departure has routeUrl', () => {
    const routeCode = 'abc';
    const stopCode = 'def';
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { code: stopCode, route: { gtfsId: routeCode } }, stoptimes: [{ trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].routeUrl).toBe(`https://www.reittiopas.fi/linjat/${routeCode}/pysakit/${stopCode}`);
});

it('departure has distance', () => {
    const distance = 100;
    const response = { data: { nearest: { edges: [{ node: { distance, place: { stop: {}, pattern: { route: {} }, stoptimes: [{ trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].distance).toBe(distance);
});

it('departure has vehicle type', () => {
    const vehicleType = 'TRAM';
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: { mode: vehicleType } }, stoptimes: [{ trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].vehicleType).toBe(vehicleType);
});

it('departure has route id', () => {
    const routeId = 'HSL:200A';
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: { gtfsId: routeId } }, stoptimes: [{ trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].routeId).toBe(routeId);
});

it('departure has route identifier', () => {
    const routeName = '9';
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: { shortName: routeName } }, stoptimes: [{ trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].routeName).toBe(routeName);
});

it('departure has destination', () => {
    const destination = 'Pasila';
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ headsign: destination, trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].destination).toBe(destination);
});

it('departure has destination from route if stoptimes headsign is null', () => {
    const destination = 'Lauttasaari';
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { headsign: destination, route: {} }, stoptimes: [{ headsign: null, trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].destination).toBe(destination);
});

it('departure has departure time', () => {
    const scheduledDeparture = 1234567890;
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ scheduledDeparture, trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].scheduledDeparture).not.toBe(undefined);
});

it('departure time is sum of serviceDay and scheduledDeparture', () => {
    const scheduledDeparture = 123456;
    const serviceDay = 1234567890;
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ scheduledDeparture, serviceDay, trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].scheduledDeparture).toBe(serviceDay + scheduledDeparture);
});

it('departure has realtime flag', () => {
    const realtime = true;
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ realtime, trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].realtime).toBe(realtime);
});

it('departure has realtime departure time', () => {
    const realtimeDeparture = 1234567890;
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ realtimeDeparture, trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].realtimeDeparture).not.toBe(undefined);
});

it('realtime departure time is combination of serviceDay and realtimeDeparture', () => {
    const realtimeDeparture = 654321;
    const serviceDay = 1234567892;
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes: [{ realtimeDeparture, serviceDay, trip: {} }]} } }] } } };
    const result = parseResponse(response);
    expect(result[0].realtimeDeparture).toBe(serviceDay + realtimeDeparture);
});

it('departure has stop name', () => {
  const stopName = 'Fleminginkatu';
  const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stop: { name: stopName }, stoptimes: [{ trip: {} }]} } }] } } };
  const result = parseResponse(response);
  expect(result[0].stopName).toBe(stopName);
});

it('departure has stop code', () => {
  const stopCode = '0652';
  const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stop: { code: stopCode }, stoptimes: [{ trip: {} }]} } }] } } };
  const result = parseResponse(response);
  expect(result[0].stopCode).toBe(stopCode);
});

it('departure has stop description', () => {
  const description = 'Fleminginkatu 13';
  const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stop: { desc: description }, stoptimes: [{ trip: {} }]} } }] } } };
  const result = parseResponse(response);
  expect(result[0].stopDescription).toBe(description);
});

it('departure has stop url', () => {
  const stopId = 'HSL:100:1';
  const response = { data: { nearest: { edges: [{ node: { place: { pattern: { route: {} }, stop: { gtfsId: stopId }, stoptimes: [{ trip: {} }]} } }] } } };
  const result = parseResponse(response);
  expect(result[0].stopUrl).toBe(`https://www.reittiopas.fi/pysakit/${stopId}`);
});

it('returns as many rows as there are stoptimes', () => {
    const scheduledDeparture = 1234567890;
    const stoptimes = [
        { scheduledDeparture, trip: {} },
        { scheduledDeparture, trip: {} },
    ];
    const response = { data: { nearest: { edges: [{ node: { place: { stop: {}, pattern: { route: {} }, stoptimes } } }] } } };
    const result = parseResponse(response);
    expect(result.length).toBe(2);
});
