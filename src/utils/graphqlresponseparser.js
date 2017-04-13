import assign from 'lodash/fp/assign';
import compose from 'lodash/fp/compose';
import curry from 'lodash/fp/curry';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import flatMap from 'lodash/fp/flatMap';
import pluck from 'lodash/fp/pluck';
import prop from 'lodash/fp/prop';
import first from 'lodash/fp/first';

/** @module GraphQLResponseParser */

/**
 * Curried sum of two numbers
 * @type {Function}
 * @param {number} a
 * @param {number} b
 * @return {number} sum
 */
const sumWith = curry((a, b) => a + b);

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
    return compose(
        // combine with route info
        map(assign(route)),
        // get times etc. departure specific info
        map(formStoptimeData),
        prop('stoptimes'),
    )(route);
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
const findRoutesFromData = compose(
    filter(compose(first, prop('stoptimes'))),
    map(getRouteInfo),
    pluck('node'),
    prop('edges'),
    prop('nearest'),
);

/**
 * Parse response from digitransit api
 * @param {Object} [result={}]
 * @returns {Object[]}
 */
export default function parseResponse(result = {}) {
    const data = result.data;

    if (!data) return [];

    return compose(
        flatMap(combineRouteInfoWithStoptimes),
        findRoutesFromData
    )(data);
}