import flatMap from '1-liners/flatMap';
import omit from '1-liners/omit';

/** @module GraphQLResponseParser */

/**
* Curried sum of two numbers
* @private
* @type {Function}
* @param {number} a
* @param {number} b
* @return {number} sum
*/
const sumWith = a => b => a + b;

/**
* Get relevant data from a stoptime object
* @param {Object} stoptime
* @returns {Function}
*/
export const formStoptimeData = (stoptime) => {
  const { scheduledDeparture, headsign, realtimeDeparture, serviceDay } = stoptime;
  // times are seconds from midnight and serviceday is current day
  const sumWithServiceDay = sumWith(serviceDay);
  const props =  {
    realtime: stoptime.realtime,
    id: stoptime.trip.id,
    scheduledDeparture: sumWithServiceDay(scheduledDeparture),
    realtimeDeparture: sumWithServiceDay(realtimeDeparture),
    destination: headsign,
  };
  // omit the destination prop completely if falsy because
  // in that case it needs to be added from route
  return headsign ? props : omit(['destination'], props);
};

/**
* Get stoptimes from routes and creates an object of each one
* and adds route data to those objects
* @private
* @type {Function}
* @param {Object} route
* @returns {Object[]} stoptimes with route data
*/
const combineRouteInfoWithStoptimes = route =>
  route.stoptimes.map(s => ({ ...route, ...formStoptimeData(s) }));

/**
* Get route info from data node
* @private
* @param {Object} node
* @returns {Object}
*/
const getRouteInfo = (node) => {
  const { route, code, headsign } = node.place.pattern;
  const { name: stopName, code: stopCode, gtfsId: stopId, desc } = node.place.stop;

  return {
    nodeId: node.place.id,
    destination: headsign,
    distance: node.distance,
    vehicleType: route.mode,
    routeName: route.shortName,
    stoptimes: node.place.stoptimes,
    routeUrl: `https://www.reittiopas.fi/linjat/${route.gtfsId}/pysakit/${code}`,
    stopUrl: `https://www.reittiopas.fi/pysakit/${stopId}`,
    stopDescription: desc,
    stopName,
    stopCode,
  };
};

/**
* Find routes with stoptimes from response data
* @private
* @type {Function}
* @param {Object} data
* @returns {Object[]} routes with at least one stoptime
*/
const findRoutesFromData = (data) => {
  const { edges } = data.nearest;
  return edges
    .map(({ node }) => getRouteInfo(node))
    .filter(r => r.stoptimes.length);
};


/**
* Parse response from digitransit api
* @type {Function}
* @param {Object} [result={}]
* @returns {Object[]}
*/
export default (response = {}) => {
  const { data } = response;
  return data
    ? flatMap(combineRouteInfoWithStoptimes, findRoutesFromData(data))
    : [];
};
