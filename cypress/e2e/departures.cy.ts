/// <reference types="cypress" />
import departures from '../fixtures/departures.json';
import departuresTwoPages from '../fixtures/departures_two_pages.json';
import departureBatch from '../fixtures/departure_batch.json';
import disruptions from '../fixtures/disruptions.json';
import { DateTime } from 'luxon';
import { PositionError } from '../../src/util/error.utils';
import { toUpper } from 'ramda';
import { BATCH_INTERVAL, PAGE_SIZE } from '../../src/constants';

describe('Searching and filtering departures', () => {
  const now = DateTime.now();
  const day = now.startOf('day').plus({ days: 1 });
  const departureHours = now.get('hour');
  const time = departureHours * 60 * 60;
  const realtime = time + 5 * 60;

  beforeEach(() => {
    cy.intercept('GET', '**/geocoding/v1/reverse*', {
      statusCode: 200,
      fixture: 'geocoding_reverse.json',
      delay: 500,
    }).as('getLocation');

    cy.intercept('GET', '**/geocoding/v1/search*', {
      statusCode: 200,
      fixture: 'address-search-rauta.json',
    }).as('getSuggestions');

    cy.intercept('POST', '**/graphql/batch', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('POST', '**/routing/v1/routers/hsl/index/graphql', (req) => {
      if (req.body.query.indexOf('alerts(') > -1) {
        const now = Date.now();
        const body = disruptions;

        body.data.alerts[0].effectiveStartDate = `${now / 1000}`;
        body.data.alerts[0].effectiveEndDate = `${now / 1000 + 24 * 60 * 60}`;

        body.data.alerts[1].effectiveStartDate = `${(now - 360) / 1000}`;
        body.data.alerts[1].effectiveEndDate = `${now / 1000 + 24 * 60 * 60}`;

        req.reply({
          statusCode: 200,
          body,
        });
      } else {
        req.reply({
          statusCode: 200,
          body: setDepartureTimes(departures),
        });
      }
    }).as('postGraphQL');
  });

  describe('with location', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/geocoding/v1/reverse*', {
        statusCode: 200,
        fixture: 'geocoding_reverse.json',
        delay: 500,
      }).as('getLocation');
    });

    it('searching departures with current location', () => {
      cy.visitWithLocation({
        latitude: 1,
        longitude: 2,
        accuracy: 15,
      });

      cy.testId('spinner')
        .should('be.visible')
        .and('have.attr', 'aria-busy', 'true');

      cy.testId('departure-list')
        .as('departureList')
        .find('[role="row"]')
        .should('have.length', 2); // heading row, placeholder row

      cy.get('@departureList')
        .find('[role="cell"]')
        .should('have.length', 1)
        .and('contain.text', 'Lähtöjä ei löytynyt');

      cy.checkA11y();

      cy.wait('@getLocation');

      cy.testId('accuracy-indicator')
        .should('contain.text', 'Paikannuksen tarkkuus: 15m')
        .find('.lucide-alert-triangle')
        .should('not.exist');

      cy.wait('@postGraphQL');

      cy.get('footer').should('contain.text', 'Lähdöt päivitetty');
      cy.testId('spinner').should('not.be.visible');
      cy.testId('departure-row').should('have.length', 6);

      cy.testId('departure-row')
        .eq(0)
        .find('[role="cell"]')
        .eq(2)
        .testId('disruption-icon')
        .should('exist');

      cy.testId('departure-row')
        .eq(1)
        .find('[role="cell"]')
        .should(
          'have.text',
          `${padNumber(
            departureHours,
          )}:05Näytä linjan tiedot suuntaan Matinkylä via Tapiola M1 Avautuu uuteen välilehteen Matinkylä via Tapiola10 m`,
        );

      cy.testId('departure-row').eq(0).click();
      cy.testId('departure-additional-content').should('be.visible');
      cy.testId('departure-realtime').should('not.exist');
      cy.testId('departure-scheduledtime').should(
        'have.text',
        `${padNumber(departureHours)}:00 (aikataulu)`,
      );
      // use contain so that we don't run into problems with whitespace characters
      cy.testId('departure-stop')
        .should('contain.text', 'Rautatientori')
        .and('contain.text', 'H2043');

      // should be sorted by start date
      cy.testId('disruption-info')
        .find('h2')
        .eq(0)
        .should('contain.text', 'Pysäkki Kurtinmäki räjäytetään');

      cy.testId('disruption-info')
        .find('h2')
        .eq(1)
        .should('contain.text', 'Porvoo siirtyy');

      // wait for fade
      cy.wait(250);
      cy.checkA11y();

      cy.testId('departure-row').eq(1).focus().type('{enter}');
      cy.checkA11y();
      // should hide the other
      cy.testId('departure-additional-content').should('have.length', 1);
      cy.testId('departure-realtime').should(
        'have.text',
        `${padNumber(departureHours)}:05 (arvioitu)`,
      );
      cy.testId('departure-scheduledtime').should(
        'have.text',
        `${padNumber(departureHours)}:00 (aikataulu)`,
      );
      cy.testId('departure-additional-content')
        .find('button')
        .focus()
        .type('{enter}');

      cy.testId('departure-additional-content').should('not.exist');

      cy.checkA11y();
    });

    // @TODO: try to figure out why this test is so flaky!
    it.skip('batches departures, updating real times', () => {
      cy.intercept('POST', '**/graphql/batch', (req) => {
        const str = JSON.stringify(departureBatch)
          .replace(/"__MOCK_DAY__"/gm, `${day.valueOf() / 1000}`)
          .replace(/"__MOCK_TIME__"/gm, `${time + 15 * 60}`)
          .replace(/"__MOCK_REAL_TIME__"/gm, `${realtime + 15 * 60}`);

        const body = JSON.parse(str);

        req.reply({
          statusCode: 200,
          body,
          delay: 400,
        });
      }).as('batchDepartures');

      cy.clock();

      visitAndWaitForDepartures({
        latitude: 1,
        longitude: 2,
      });

      cy.tick(BATCH_INTERVAL);
      cy.wait('@batchDepartures');

      cy.testId('departure-list')
        .find('[role=row]:visible')
        .last()
        .should('contain.text', 'Porvoo via Mikkeli')
        .and('contain.text', `${padNumber(departureHours)}:20`);
    });

    it('filtering departures', () => {
      visitAndWaitForDepartures({
        latitude: 1,
        longitude: 2,
        accuracy: 15,
      });

      // range filter should have default value
      cy.get('output[for="departurefilter-range"]').should('have.text', '400m');
      cy.get('[name="range"]').should('have.value', 400);

      const modes = ['bus', 'tram', 'rail', 'subway', 'ferry'];

      modes.forEach((mode, i) => {
        // vehicle filters should be toggled by default
        cy.testId(`filter-${mode}`)
          .as('filterButton')
          .should('have.attr', 'aria-pressed', 'true');

        cy.get('@filterButton')
          .focus()
          .type(' ')
          .then(() => {
            const filters = JSON.parse(localStorage.getItem('filters'));
            expect(filters).to.eql({
              range: 400,
              vehicleTypes: modes.slice(i + 1).map(toUpper),
            });
          });

        cy.get('@filterButton').should('have.attr', 'aria-pressed', 'false');

        if (i < modes.length - 1) {
          cy.testId('departure-route').find(`.${mode}`).should('not.exist');
        }
      });

      cy.testId('departure-list')
        .find('[role="cell"]')
        .should('have.length', 1)
        .and('contain.text', 'Lähtöjä ei löytynyt');

      modes.forEach((mode) => {
        cy.testId(`filter-${mode}`)
          .click()
          .should('have.attr', 'aria-pressed', 'true')
          .then(() => {
            const filters = JSON.parse(localStorage.getItem('filters'));
            expect(filters.vehicleTypes).to.include(mode.toUpperCase());
          });

        cy.testId('departure-route').find(`.${mode}`).should('exist');
      });

      setSliderValue(200).then(() => {
        const filters = JSON.parse(localStorage.getItem('filters'));
        expect(filters.range).to.eql(200);
      });

      cy.get('output[for="departurefilter-range"]').should('have.text', '200m');
      cy.testId('departure-row').should('have.length', 4);

      setSliderValue(100);
      cy.testId('departure-row').should('have.length', 3);
    });

    it('loads the saved filters on startup', () => {
      localStorage.setItem(
        'filters',
        JSON.stringify({
          range: 1600,
          vehicleTypes: ['FERRY'],
        }),
      );

      cy.visitWithLocation(new PositionError('', 1));
      cy.get('[name="range"]').should('have.value', 1600);

      cy.testId('filter-ferry').should('have.attr', 'aria-pressed', 'true');
      ['bus', 'tram', 'rail', 'subway'].forEach((mode) => {
        cy.testId(`filter-${mode}`).should(
          'have.attr',
          'aria-pressed',
          'false',
        );
      });
    });

    it('searching with changed range', () => {
      visitAndWaitForDepartures({ latitude: 1, longitude: 2 });

      setSliderValue(200);
      // no fetch here
      setSliderValue(600);
      // it fetches more departures when the range is increased
      // without clicking the submit button
      cy.wait('@postGraphQL')
        .its('request.body.variables.maxDistance')
        .should('eql', 600);

      cy.get('[type=submit]').click();
      // it uses the changed range in further fetches
      cy.wait('@postGraphQL')
        .its('request.body.variables.maxDistance')
        .should('eql', 600);
    });

    it('displays a warning when location accuracy is low', () => {
      cy.visitWithLocation({
        latitude: 1,
        longitude: 2,
        accuracy: 101,
      });
      cy.testId('accuracy-indicator')
        .should('contain.text', 'Paikannuksen tarkkuus: 101m')
        .and('not.have.class', 'color-alert')
        .find('.alert-triangle')
        .should('exist');

      cy.checkA11y();
    });

    it('displays an alert when location accuracy is very low', () => {
      cy.visitWithLocation({
        latitude: 1,
        longitude: 2,
        accuracy: 501,
      });

      cy.testId('accuracy-indicator')
        .should('contain.text', 'Paikannuksen tarkkuus: 501m')
        .and('have.class', 'color-alert')
        .find('.alert-triangle')
        .should('exist');

      cy.checkA11y();
    });

    it('displays no accuary indicator when the location has no accuracy', () => {
      cy.visitWithLocation({ latitude: 1, longitude: 2 });
      cy.testId('accuracy-indicator').should('not.exist');
    });
  });

  describe('paging', () => {
    function setup(manyPages: boolean) {
      cy.intercept('POST', '**/routing/v1/routers/hsl/index/graphql', (req) => {
        if (req.body.query.indexOf('alerts(') > -1) {
          req.reply({
            statusCode: 200,
            body: [],
          });
        } else {
          console.log(setDepartureTimes(departuresTwoPages));
          req.reply({
            statusCode: 200,
            body: setDepartureTimes(
              manyPages ? departuresTwoPages : departures,
            ),
          });
        }
      }).as('postGraphQL');

      cy.visitWithLocation({ latitude: 1, longitude: 2 });
      cy.wait('@postGraphQL');
      cy.wait('@postGraphQL');
    }

    it('has no pagination when departure count is lt PAGE_SIZE', () => {
      setup(false);
      cy.testId('departure-row').should('exist');
      cy.testId('pagination').should('not.exist');
    });

    it('has pagination when departure count is gt PAGE_SIZE', () => {
      setup(true);
      cy.testId('pagination').as('pagination').should('exist');
      cy.get('@pagination').find('button').eq(0).should('have.class', 'active');
      cy.testId('departure-row').should('have.length', PAGE_SIZE);

      cy.checkA11y();

      cy.testId('departure-list').realSwipe('toLeft', { length: 100 });
      assertActivePage(2);
      assertActivePage(1, false);

      cy.testId('departure-row').should('have.length.lessThan', PAGE_SIZE);

      // nothing happens when swiped left on the last page
      cy.testId('departure-list').realSwipe('toLeft', { length: 100 });
      assertActivePage(2);

      cy.testId('departure-list').realSwipe('toRight', { length: 100 });
      assertActivePage(1);

      cy.get('@pagination').find('button').eq(1).click();
      assertActivePage(2);

      // wait until fade is done
      cy.wait(250);

      cy.checkA11y();
    });
  });

  describe('without location', () => {
    beforeEach(() => {
      localStorage.setItem(
        'favourites',
        JSON.stringify([
          {
            id: 'node:418089207',
            localadmin: 'Helsinki',
            label: 'Rautatientori, Asemanaukio 2, Helsinki',
            location: { latitude: 5, longitude: 6 },
          },
        ]),
      );
    });

    it('displays an error when location fetch fails', () => {
      cy.visitWithLocation(new PositionError('Position blocked', 1));
      cy.testId('position-error')
        .should('exist')
        .and(
          'contain.text',
          'Paikannus epäonnistui: Sijainnin haku on estetty tai kytketty pois.',
        )
        .find('.alert-triangle')
        .should('exist');

      cy.testId('accuray-indicator').should('not.exist');
      cy.testId('departure-list')
        .find('[role="cell"]')
        .should('have.length', 1)
        .and('contain.text', 'Lähtöjä ei löytynyt');

      cy.get('footer').should('not.contain.text', 'Lähdöt päivitetty');

      cy.checkA11y();
    });

    it('searching with a search term', () => {
      cy.visitWithLocation(new PositionError('Position blocked', 1));
      assertDefaultState();
      cy.get('input[name=address]').type('rauta');
      cy.get('[type=submit]').click();
      cy.wait('@postGraphQL')
        .its('request.body.variables')
        .then((vars) => {
          expect(vars.latitude).to.eql(3);
          expect(vars.longitude).to.eql(4);
        });
      cy.testId('position-error').should('not.exist');
      cy.testId('departure-list')
        .find('[role=row]:visible')
        .should('have.length', 7);
    });

    it('searching with an address from suggestion', () => {
      cy.visitWithLocation(new PositionError('Position blocked', 1));
      assertDefaultState();
      cy.get('input[name=address]').type('rauta');
      cy.testId('suggestion-list').find('li').eq(1).click();
      cy.wait('@postGraphQL')
        .its('request.body.variables')
        .then((vars) => {
          expect(vars.latitude).to.eql(1);
          expect(vars.longitude).to.eql(2);
        });
      cy.testId('position-error').should('not.exist');
      cy.testId('departure-list')
        .find('[role=row]:visible')
        .should('have.length', 7);
    });

    it('searching with an address from favourites', () => {
      cy.visitWithLocation(new PositionError('Position blocked', 1));
      assertDefaultState();
      cy.testId('menu-button').click();
      cy.testId('favourites-list').find('li').eq(0).click();
      cy.wait('@postGraphQL')
        .its('request.body.variables')
        .then((vars) => {
          expect(vars.latitude).to.eql(5);
          expect(vars.longitude).to.eql(6);
        });
      cy.testId('position-error').should('not.exist');
      cy.testId('departure-list')
        .find('[role=row]')
        .should('not.contain', 'Lähtöjä ei löytynyt');
    });

    function assertDefaultState() {
      cy.wait('@postGraphQL');
      cy.get('[name=address]').should('have.value', '');
      cy.testId('position-error').should('be.visible');
      cy.testId('departure-list')
        .find('[role=row]')
        .should('contain', 'Lähtöjä ei löytynyt');
    }
  });

  function visitAndWaitForDepartures(
    location: Partial<GeolocationCoordinates>,
  ) {
    cy.visitWithLocation(location);
    // alerts
    cy.wait('@postGraphQL');
    cy.wait('@getLocation');
    // departures
    cy.wait('@postGraphQL');
    cy.testId('spinner').should('not.be.visible');
  }

  function assertActivePage(page: number, state = true) {
    return cy
      .get('@pagination')
      .find('button')
      .eq(page - 1)
      .should(state ? 'have.class' : 'not.have.class', 'active');
  }

  function setSliderValue(value: number) {
    return cy
      .get('[type=range]')
      .invoke('val', value)
      .trigger('input')
      .click({ force: true });
  }

  function padNumber(num: number) {
    return `${num}`.length < 2 ? `0${num}` : `${num}`;
  }

  function setDepartureTimes(json: { [key: string]: unknown }) {
    const str = JSON.stringify(json)
      .replace(/"__MOCK_DAY__"/gm, `${day.valueOf() / 1000}`)
      .replace(/"__MOCK_TIME__"/gm, `${time}`)
      .replace(/"__MOCK_REAL_TIME__"/gm, `${realtime}`);
    return JSON.parse(str);
  }
});
