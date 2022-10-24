import { fetchJSON } from '@/api';
import {
  MAX_RANGE,
  MAX_RESULTS,
  NUMBER_OF_DEPARTURES_PER_ROUTE,
  TIME_RANGE,
} from '@/constants';
import departureBatchQuery from '@/queries/batchNearest';
import departureFetchQuery from '@/queries/nearest';
import type {
  DepartureBatchResponse,
  Location,
  Departure,
  Stoptime,
  DepartureFetchResponse,
  DepartureAtDistanceEdge,
  DepartureAtDistance,
  Filters,
} from '@/types';
import { getNowInSeconds } from '@/util';
import * as R from 'ramda';

function formBatchRequestBody({ nodeId }: Departure) {
  const startTime = getNowInSeconds();

  return {
    query: departureBatchQuery,
    variables: {
      id: nodeId,
      startTime,
      departuresCount: NUMBER_OF_DEPARTURES_PER_ROUTE,
      timeRange: TIME_RANGE,
    },
  };
}

const formStoptimeData = (stoptime: Stoptime) => {
  const props = {
    realtime: stoptime.realtime,
    id: stoptime.trip.id,
    // times are seconds from midnight and serviceday is current day
    scheduledDeparture: stoptime.serviceDay + stoptime.scheduledDeparture,
    realtimeDeparture: stoptime.serviceDay + stoptime.realtimeDeparture,
    destination: stoptime.headsign ?? undefined,
  };

  return stoptime.headsign ? props : R.omit(['destination'], props);
};

const parseBatchResponse = R.chain((data: DepartureBatchResponse) => {
  const { id: nodeId, stoptimes = [] } = data.payload.data.node;
  return stoptimes.map((stoptime) => ({
    nodeId,
    ...formStoptimeData(stoptime),
  }));
});

export async function fetchDepartureBatch(departures: Departure[]) {
  try {
    const response = await fetchJSON<DepartureBatchResponse[]>(
      'routing/v1/routers/hsl/index/graphql/batch',
      departures.map(formBatchRequestBody),
    );

    return parseBatchResponse(response);
  } catch (e) {
    throw new Error(`Lähtöjen päivitys epäonnistui: ${(e as Error).message}`);
  }
}

function formDepartureFetchRequestBody(location: Location, filters: Filters) {
  return {
    query: departureFetchQuery,
    variables: {
      latitude: location.latitude,
      longitude: location.longitude,
      timeRange: TIME_RANGE,
      departuresCount: NUMBER_OF_DEPARTURES_PER_ROUTE,
      maxResults: MAX_RESULTS,
      maxDistance: filters.range || MAX_RANGE,
    },
  };
}

/**
 * Get route info from data node
 */
const getRouteInfo = (node: DepartureAtDistance) => {
  const { place, distance } = node;
  const { route, code, headsign } = place.pattern;

  return {
    nodeId: place.id,
    destination: headsign,
    distance: distance,
    vehicleType: route.mode,
    routeId: route.gtfsId,
    routeName: route.shortName,
    stoptimes: place.stoptimes,
    routeUrl: `https://www.reittiopas.fi/linjat/${route.gtfsId}/pysakit/${code}`,
    stopUrl: `https://www.reittiopas.fi/pysakit/${place.stop.gtfsId}`,
    stopDescription: place.stop.desc,
    stopName: place.stop.name,
    stopCode: place.stop.code,
  };
};

/**
 * Find routes with stoptimes from response data
 */
const findRoutesFromData = R.pipe(
  R.map<DepartureAtDistanceEdge, ReturnType<typeof getRouteInfo>>(
    R.pipe(R.prop('node'), getRouteInfo),
  ),
  R.reject(R.pipe(R.prop('stoptimes'), R.isEmpty)),
);

const combineRouteInfoWithStoptimes = (
  route: ReturnType<typeof getRouteInfo>,
) =>
  R.pipe(
    R.propOr([], 'stoptimes'),
    R.map(R.pipe(formStoptimeData, R.mergeDeepRight(route))),
  )(route);

function normalizeDepartures(response: DepartureFetchResponse) {
  return response.data
    ? R.chain(
        combineRouteInfoWithStoptimes,
        findRoutesFromData(response.data.nearest.edges),
      )
    : [];
}

/**
 * Fetch nearest departures from digitransit's public api
 */
export async function fetchDepartures(location: Location, filters: Filters) {
  try {
    const response = await fetchJSON<DepartureFetchResponse>(
      'routing/v1/routers/hsl/index/graphql',
      formDepartureFetchRequestBody(location, filters),
    );

    return normalizeDepartures(response);
  } catch (e) {
    throw new Error(`Lähtöjen haku epäonnistui: ${(e as Error).message}`);
  }
}
