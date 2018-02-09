import flatMap from '1-liners/flatMap';
import parseFetchResponse, { formStoptimeData } from '../utils/graphqlresponseparser';
import query from './querynearest';
import batchQuery from './querybatch';
import { getNowInSeconds } from '../utils/utils';

/** @module DeparturesService */

/**
* Limit results by time (1h in seconds)
* @private
* @type {number}
*/
const TIME_RANGE = 1 * 60 * 60;
/**
* Number of stoptimes per route to fetch
* @private
* @type {number}
*/
const NUMBER_OF_DEPARTURES_PER_ROUTE = 2;
/**
* Max number of results to fetch
* @private
* @type {number}
*/
const MAX_RESULTS = 50;

/**
* Form graphql query for request body
* @private
* @param {Object} props
* @param {number} props.latitude
* @param {number} props.longitude
* @param {number} props.startTime
* @param {string[]} props.vehicleTypes
* @returns {Object}
*/
function formRequestBody({ latitude, longitude, startTime, vehicleTypes } = {}) {
  return {
    query: query,
    variables: {
      latitude,
      longitude,
      vehicleTypes,
      timeRange: TIME_RANGE,
      departuresCount: NUMBER_OF_DEPARTURES_PER_ROUTE,
      maxResults: MAX_RESULTS,
    },
  };
}

/**
* Fetch nearest departures from digitransit's public api
* @async
* @param {Object} location
* @param {number} location.latitude
* @param {number} location.longitude
* @returns {Promise}
*/
export async function fetchDepartures(location = {}, filters = {}) {
  const { latitude = 60.189425, longitude = 24.951884 } = location;
  const { vehicleTypes } = filters;
  const reqBody = formRequestBody({ latitude, longitude, vehicleTypes });
  let response;

  try {
    response = await fetch(`${process.env.INFERNO_APP_SERVER_URL}/routing/v1/routers/hsl/index/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
    });
  } catch (e) {
    throw new Error('Lähtöjen haku epäonnisui: Palveluun ei saatu yhteyttä');
  }

  if (!response.ok) {
    throw new Error('Lähtöjen haku epäonnisui: Palvelu palautti virheen');
  }

  const data = await response.json();

  return parseFetchResponse(data);
}

/**
* Form body for batch request
* @private
* @param {Object} props
* @param {string} props.id
* @returns {Object}
*/
function formBatchRequestBody({ id }) {
  const startTime = getNowInSeconds();

  return {
    query: batchQuery,
    variables: {
      id,
      startTime,
      departuresCount: NUMBER_OF_DEPARTURES_PER_ROUTE,
    }
  };
}

/**
* Parse batch response data
* @private
* @param {Object[]} data
* @returns {Function}
*/
const parseBatchResponse = response => flatMap((data) => {
  const { id: nodeId, stoptimes = [] } = data.payload.data.node;
  return stoptimes.map(stoptime => ({ nodeId, ...formStoptimeData(stoptime) }));
}, response);

/**
* Batch updated departures
* @param {Object[]} [departures=[]] Departures to batch
* @returns {Object[]}
*/
export async function batchDepartures(departures = []) {
  if (!departures.length) return departures;

  const query = departures.map(d => formBatchRequestBody({ id: d.nodeId }));
  let response;

  try {
    response = await fetch(`${process.env.INFERNO_APP_SERVER_URL}/routing/v1/routers/hsl/index/graphql/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    });
  } catch (e) {
    throw new Error('Lähtöjen päivitys epäonnistui: Palveluun ei saatu yhteyttä');
  }

  if (!response.ok) {
    throw new Error('Lähtöjen päivitys epäonnistui: Palvelu palautti virheen');
  }

  const data = await response.json();

  return parseBatchResponse(data);
}
