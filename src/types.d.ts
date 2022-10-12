import { VEHICLE_TYPE } from './enums';

interface Trip {
  id: string;
}

interface Stoptime {
  serviceDay: number;
  scheduledDeparture: number;
  realtimeDeparture: number;
  realtimeState: string;
  realtime: boolean;
  headsign: string;
  trip: Trip;
}

interface Route {
  gtfsId: string;
  shortName: string;
  longName: string;
  mode: VEHICLE_TYPE;
}

interface RouteStop {
  gtfsId: string;
  code: string;
  name: string;
  desc: string;
}

interface DepartureRow {
  id: string;
  stop: RouteStop;
  stoptimes: Stoptime[];
  pattern: {
    route: Route;
    code: string;
    headsign: string;
  };
}

interface DepartureAtDistance {
  id: string;
  distance: number;
  place: DepartureRow;
}

interface DepartureAtDistanceEdge {
  node: DepartureAtDistance;
}

interface AddressProps {
  id: string;
  gid: string;
  layer: string;
  source: string;
  source_id: string;
  name: string;
  postalcode: number;
  postalcode_gid: string;
  confidence: number;
  distance: number;
  accuracy: string;
  country: string;
  country_gid: string;
  country_a: string;
  region: string;
  region_gid: string;
  localadmin: string;
  localadmin_gid: string;
  locality: string;
  locality_gid: string;
  neighbourhood: string;
  neighbourhood_gid: string;
  label: string;
}

type Feature<P> = {
  geometry: Geometry;
  properties: P;
};

export interface AddressResponse {
  features: Feature<Address>[];
}

export interface DepartureBatchResponse {
  payload: {
    data: {
      node: {
        id: string;
        stoptimes: Stoptime[];
      };
    };
  };
}
export interface DepartureFetchResponse {
  data: {
    nearest: {
      edges: DepartureAtDistanceEdge[];
    };
  };
}

export interface Disruption {
  alertHeaderText: string;
  alertDescriptionText: string;
  alertUrl: string;
  effectiveStartDate: number;
  effectiveEndDate: number;
  route: {
    gtfsId: string;
    shortName: string;
  };
}

export interface DisruptionQueryResponse {
  data: {
    alerts: Disruption[];
  };
}

export interface Address extends AddressProps {
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface Geometry {
  coordinates: [number, number];
}

export type Favourite = Pick<Address, 'id' | 'label' | 'location'> &
  Partial<Omit<Address, 'id' | 'label' | 'location'>>;

export interface Filters {
  vehicleTypes: VEHICLE_TYPE[];
  range: number;
}

export interface Departure {
  id: string;
  distance: number;
  realtimeDeparture: number;
  scheduledDeparture: number;
  realtime: boolean;
  vehicleType: VEHICLE_TYPE;
  nodeId: string;
  destination: string;
  routeId: string;
  routeName: string;
  stoptimes: Stoptime[];
  routeUrl: string;
  stopUrl: string;
  stopDescription: string;
  stopName: string;
  stopCode: string;
}
