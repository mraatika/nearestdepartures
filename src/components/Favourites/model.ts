import * as R from 'ramda';
import type { Address, Favourite } from '@/types';
import { isSameAddress } from '@/util';

/**
 * Check if an adress is in the list of favoured addresses
 */
export const isLocationFavoured = (
  favourites: Favourite[],
  address?: Address,
) => address && !!favourites.find(isSameAddress(address.id));

/**
 * Convert GeolocationCoordinates to a serializable object
 * @param {GeolocationCoordinates} coords
 * @returns
 */
export const toLocationObject = R.pick(['accuracy', 'latitude', 'longitude']);
