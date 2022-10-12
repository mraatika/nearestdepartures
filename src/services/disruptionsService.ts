import * as R from 'ramda';
import { fetchJSON } from '@/api';
import disruptionsQuery from '@/queries/disruptions';
import type { Disruption, DisruptionQueryResponse } from '@/types';
import logger from '@/util/logger';

const normalizeDisruptions = R.pipe(
  R.pathOr([], ['data', 'alerts']),
  R.reject<Disruption>(R.pipe(R.prop('route'), R.isNil)),
);

export async function fetchDisruptions() {
  try {
    const result = await fetchJSON<DisruptionQueryResponse>(
      '/routing/v1/routers/hsl/index/graphql',
      { query: disruptionsQuery },
    );
    return normalizeDisruptions(result);
  } catch (e) {
    logger.error(`Häiriötiedotteiden haku epäonnistui: ${e}`);
    return [] as Disruption[];
  }
}
