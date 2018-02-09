import query from './querydisruptions';
import { propOr } from '../utils/utils';

/**
 * @private
 * @param {object[]} acc
 * @param {object} alert
 * @return {object[]}
 */
const addAlert = (acc, alert) => propOr(alert.route.gtfsId, [], acc).concat(alert);

/**
 * Form an object from the disruptions array for quick lookup
 * @private
 * @param {object} props
 * @param {object[]} props.data
 * @return {object}
 */
const normalizeDisruptions = ({ data }) =>
  propOr('alerts', [], data)
    .reduce((acc, i) => ({ ...acc, [i.route.gtfsId]: addAlert(acc, i) }), {});

/**
 * Fetch disruptions from the api
 * @async
 * @return {object} Disruptions as an object with route id as key and it's disruptions as value
 */
export const fetchDisruptions = async () => {
  let response;
  const url = `${process.env.INFERNO_APP_SERVER_URL}/routing/v1/routers/hsl/index/graphql`;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
  } catch (e) {
    throw new Error('Häiriötiedotteiden haku epäonnistui: Paveluun ei saatu yhteyttä');
  }

  if (!response.ok) {
    throw new Error('Häiriötiedotteiden haku epäonnistui: Palvelu palautti virheen');
  }

  const data = await response.json();

  return normalizeDisruptions(data);
};
