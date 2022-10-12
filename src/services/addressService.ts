import * as R from 'ramda';
import { getJSON } from '@/api';
import { findGPSLocation } from '@/services/locationService';
import type { Address, AddressResponse, Location } from '@/types';
import { MAX_ADDRESS_SUGGESTIONS } from '@/constants';

const parseAddressResponse = R.pipe(
  R.pathOr<AddressResponse['features']>([], ['features']),
  R.map(({ geometry: { coordinates }, properties }) => ({
    ...properties,
    location: { latitude: coordinates[1], longitude: coordinates[0] },
  })),
);

/**
 * Search for address/location coordinates
 */
export async function searchAddress(
  searchTerm: string,
  coordinates?: GeolocationCoordinates,
): Promise<Address[]> {
  const encoded = encodeURIComponent(searchTerm);
  const searchParams = new URLSearchParams({
    text: encoded,
    size: `${MAX_ADDRESS_SUGGESTIONS}`,
    lang: 'fi',
    'boundary.rect.min_lat': '59.9548',
    'boundary.rect.max_lat': '60.6217',
    'boundary.rect.min_lon': '23.9970',
    'boundary.rect.max_lon': '25.6605',
    ...(coordinates && {
      'focus.point.lat': `${coordinates.latitude}`,
      'focus.point.lon': `${coordinates.longitude}`,
    }),
  });

  try {
    const response = await getJSON<AddressResponse>(
      `geocoding/v1/search?${searchParams.toString()}`,
    );

    if (!response.features?.length) {
      throw new Error(
        `Osoitetta tai paikkaa ei löytynyt hakusanalla ${searchTerm}`,
      );
    }
    return parseAddressResponse(response);
  } catch (e) {
    throw new Error(`Osoitteen haku epäonnistui: ${(e as Error).message}`);
  }
}

/**
 * Search address for given coordinates
 */
export async function lookupAddress({ latitude, longitude }: Location) {
  const searchParams = new URLSearchParams({
    'point.lat': `${latitude}`,
    'point.lon': `${longitude}`,
    size: '1',
  });

  try {
    const response = await getJSON<AddressResponse>(
      `/geocoding/v1/reverse?${searchParams.toString()}`,
    );

    if (!response.features?.length) {
      throw new Error('Osoitetta tai paikkaa ei löytynyt');
    }

    return response.features[0].properties;
  } catch (e) {
    throw new Error(`Osoitteen haku epäonnistui: ${(e as Error).message}`);
  }
}

/**
 * Find current location and lookup address based on that
 */
export async function findAddressByCurrentLocation() {
  const location = await findGPSLocation();
  const address = await lookupAddress(location);
  return { ...address, location };
}

/**
 * Search address by a search term
 */
export async function getAddressBySearchTerm(searchTerm: string) {
  const result = await searchAddress(searchTerm);
  return result[0];
}
