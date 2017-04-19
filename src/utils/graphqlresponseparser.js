import fputils from './fputils';

/** @module GraphQLResponseParser */

/**
 * Curried sum of two numbers
 * @type {Function}
 * @param {number} a
 * @param {number} b
 * @return {number} sum
 */
const sumWith = fputils.curry((a, b) => a + b);

/**
 * Get relevant data from a stoptime object
 * @param {*} departure
 */
export const formStoptimeData = (stoptime) => {
    const { scheduledDeparture, headsign, realtime, realtimeDeparture, serviceDay } = stoptime;
    const { id } = stoptime.trip;
    // times are seconds from midnight and serviceday is current day
    const sumWithServiceDay = sumWith(serviceDay);
    const data = {
        id,
        realtime,
        scheduledDeparture: sumWithServiceDay(scheduledDeparture),
        realtimeDeparture: sumWithServiceDay(realtimeDeparture),
    };

    if (headsign) data.destination = headsign;

    return data;
};

/**
 * Get stoptimes from routes and creates an object of each one
 * and adds route data to those objects
 * @param {Object} route
 * @returns {Object[]} stoptimes with route data
 */
const combineRouteInfoWithStoptimes = (route) => {
    return fputils.composeAll([
        // combine with route info
        fputils.map(stoptime => Object.assign({}, route, stoptime)),
        // get times etc. departure specific info
        fputils.map(formStoptimeData),
        fputils.property('stoptimes'),
    ])(route);
};

/**
 * Get route info from data node
 * @param {Object} node
 * @returns {Object}
 */
const getRouteInfo = (node) => {
    const { route, code, headsign } = node.place.pattern;
    return {
        nodeId: node.place.id,
        destination: headsign,
        distance: node.distance,
        vehicleType: route.mode,
        routeName: route.shortName,
        stoptimes: node.place.stoptimes,
        url: `https://www.reittiopas.fi/linjat/${route.gtfsId}/pysakit/${code}`
    };
}

/**
 * Find routes with stoptimes from response data
 * @type {Function}
 * @param {Object} data
 * @returns {Object[]} routes with at least one stoptime
 */
const findRoutesFromData = fputils.composeAll([
    fputils.filter(fputils.compose(fputils.head, fputils.property('stoptimes'))),
    fputils.map(getRouteInfo),
    fputils.map(val => val.node),
    fputils.property('edges'),
    fputils.property('nearest'),
]);

/**
 * Parse response from digitransit api
 * @param {Object} [result={}]
 * @returns {Object[]}
 */
export default function parseResponse(result = {}) {
    const data = result.data;

    if (!data) return [];

    return fputils.compose(
        fputils.flatMap(combineRouteInfoWithStoptimes),
        findRoutesFromData
    )(data);
}