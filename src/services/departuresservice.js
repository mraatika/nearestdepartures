import parseResponse from '../utils/graphqlresponseparser';
import query from './querynearest';

function formRequestBody(props) {
    return { query: query(props) };
}

function getNowInSeconds() {
    return Math.floor(new Date().getTime() / 1000);
}

/**
 * Fetch nearest departures from digitransit's public api
 * @async
 * @returns {Promise}
 */
export default async function fetchDepartures() {
    const lat = 60.189425;
    const lon = 24.951884;
    const time = getNowInSeconds();
    const reqBody = formRequestBody({ lat, lon, time, distance: 200 });
    let data;

    const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
    });

    data = await response.json();

    return parseResponse(data);
}