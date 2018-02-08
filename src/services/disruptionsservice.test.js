import * as service from './disruptionsservice';

const doFetch = async (response) => {
  fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });
  return service.fetchDisruptions();
};

const expectAlert = (response, id, expected) => {
  return doFetch(response)
    .then(res => expect(res[id]).toEqual(expected));
};

describe('DisruptionsService', () => {
  it('should resolve with an object', () => {
    return doFetch({data: { alerts: [] } })
      .then(res => expect(res).toEqual({}));
  });

  it('should return an object with routeId as key and received alert as value', () => {
    const routeId = 'HSL:2001';
    const alert = { 
      alertHeaderText: 'Alert!',
      alertUrl: 'http://google.com',
      alertDescriptionText: 'Alert body',
      route: { gtfsId: routeId },
    };
    const data = { data: { alerts: [alert] } };
    return expectAlert(data, routeId, data.data.alerts);
  });

  it('should return all departures errors', () => {
    const routeId = 'HSL:2001';
    const alert1 = { 
      alertHeaderText: 'Alert!',
      alertUrl: 'http://google.com',
      alertDescriptionText: 'Alert body',
      route: { gtfsId: routeId },
    };
    const alert2 = { 
      alertHeaderText: 'Other alert!',
      alertDescriptionText: 'Other alert body',
      route: { gtfsId: routeId },
    };
    const data = { data: { alerts: [alert1, alert2] } };
    return expectAlert(data, routeId, data.data.alerts);
  });
});
