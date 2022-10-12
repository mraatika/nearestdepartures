import { VEHICLE_TYPE } from '@/enums';
import type { Filters } from '@/types';
import * as R from 'ramda';

/**
 * Pad number with leading zero if necessary
 */
export const padNumber = (num: number) =>
  `${num}`.length < 2 ? `0${num}` : `${num}`;

type Extractors = ('getHours' | 'getMinutes' | 'getSeconds')[];

/**
 * Point free time.getHours() etc. :D
 */
const extractTimes = (extractors: Extractors) =>
  R.juxt(R.map(R.partial(R.invoker, [0]), extractors));

const toTimeStringWith = (extractors: Extractors): ((d: Date) => string) =>
  R.pipe(extractTimes(extractors), R.map(padNumber), R.join(':'));

export const toTimeStringWithSeconds = toTimeStringWith([
  'getHours',
  'getMinutes',
  'getSeconds',
]);

export const toTimeString = toTimeStringWith(['getHours', 'getMinutes']);

export const getNowInSeconds = () => Math.floor(new Date().getTime() / 1000);

export const isSameAddress = R.propEq('id');

export const defaultFilters = (): Filters => ({
  range: 400,
  vehicleTypes: <VEHICLE_TYPE[]>Object.values(VEHICLE_TYPE),
});
