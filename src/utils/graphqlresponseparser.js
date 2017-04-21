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
    const { scheduledDeparture, headsign, realtimeDeparture, serviceDay } = stoptime;
    // times are seconds from midnight and serviceday is current day
    const sumWithServiceDay = sumWith(serviceDay);

    return fputils.pipeAll([
        fputils.pick(['realtime']),
        fputils.assign({
            id: stoptime.trip.id,
            scheduledDeparture: sumWithServiceDay(scheduledDeparture),
            realtimeDeparture: sumWithServiceDay(realtimeDeparture),
            destination: headsign,
        }),
        fputils.ifThenElse(
            fputils.property('destination'),
            fputils.identity,
            // if destination is falsy then delete that property
            fputils.omit(['destination']),
        )
    ])(stoptime);
};

/**
 * Combine object (stoptime) with route object
 * @param {Object} route
 * @returns {Function}
 */
const combineWithRoute = route => fputils.assign(fputils.shallowClone(route));

/**
 * Get stoptimes from routes and creates an object of each one
 * and adds route data to those objects
 * @param {Object} route
 * @returns {Object[]} stoptimes with route data
 */
const combineRouteInfoWithStoptimes = (route) => {
    return fputils.composeAll([
        // combine with route info
        fputils.map(fputils.shave(1)(combineWithRoute(route))),
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
    // select all nodes with stoptimes
    fputils.filter(fputils.compose(fputils.head, fputils.property('stoptimes'))),
    // get route info for each node
    fputils.map(getRouteInfo),
    // pluck nodes
    fputils.map(val => val.node),
    fputils.property('edges'),
    fputils.property('nearest'),
]);

/**
 * Parse response from digitransit api
 * @param {Object} [result={}]
 * @returns {Object[]}
 */
export default fputils.pipe(
    // default to an empty object
    fputils.or({}),
    fputils.ifThenElse(
        fputils.property('data'),
        fputils.pipeAll([
            fputils.property('data'),
            findRoutesFromData,
            fputils.flatMap(combineRouteInfoWithStoptimes),
        ]),
        // if data is falsy then return an empty array
        fputils.always([])
    ),
);