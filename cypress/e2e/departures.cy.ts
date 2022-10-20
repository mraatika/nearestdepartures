/// <reference types="cypress" />
import * as departures from '../fixtures/departures.json';
import { DateTime } from 'luxon';
import { PositionError } from '../../src/util/error.utils';

describe('Searching and filtering departures', () => {
  const now = DateTime.now();
  const day = now.startOf('day');
  const departureHours = now.get('hour') + 2;
  const time = departureHours * 60 * 60;
  const realtime = time + 5 * 60;

  beforeEach(() => {
    cy.intercept('POST', '**/graphql/batch', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('POST', '**/routing/v1/routers/hsl/index/graphql', (req) => {
      if (req.body.query.indexOf('alerts(') > -1) {
        return {
          statusCode: 200,
          body: [],
        };
      }

      const str = JSON.stringify(departures)
        .replace(/"__MOCK_DAY__"/gm, `${day.valueOf() / 1000}`)
        .replace(/"__MOCK_TIME__"/gm, `${time}`)
        .replace(/"__MOCK_REAL_TIME__"/gm, `${realtime}`);
      const body = JSON.parse(str);

      req.reply({
        statusCode: 200,
        body,
      });
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
        .should('have.length', 2);

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

      cy.get('output[for="departurefilter-range"]').should('have.text', '400m');
      cy.get('[name="range"]').should('have.value', 400);
      ['bus', 'tram', 'subway', 'rail', 'ferry'].forEach((mode) => {
        cy.testId(`filter-${mode}`).should('have.attr', 'aria-pressed', 'true');
      });

      cy.wait('@postGraphQL');

      cy.get('footer').should('contain.text', 'Lähdöt päivitetty');
      cy.testId('spinner').should('not.be.visible');

      cy.get('@departureList')
        .find('[role="row"]:visible')
        .as('departureRows')
        // 6 routes, one without stoptimes, one with 2 departures
        .should('have.length', 7);

      cy.get('@departureRows')
        .eq(2)
        .as('departureRow')
        .find('[role="cell"]')
        .should(
          'have.text',
          `${departureHours}:05Näytä linjan tiedot suuntaan Matinkylä via Tapiola M1 Avautuu uuteen välilehteen Matinkylä via Tapiola10 m`,
        );

      cy.get('@departureRows').eq(1).click();
      cy.checkA11y();
      cy.testId('departure-additional-content').should('be.visible');
      cy.testId('departure-realtime').should('not.exist');
      cy.testId('departure-scheduledtime').should(
        'have.text',
        `${departureHours}:00 (arvioitu)`,
      );
      cy.testId('departure-stop').should(
        'have.text',
        'Rautatientori Avautuu uuteen välilehteen H2043 Rautatientori',
      );

      cy.get('@departureRow').focus().type('{enter}');
      cy.checkA11y();
      // should hide the other
      cy.testId('departure-additional-content').should('have.length', 1);
      cy.testId('departure-realtime').should(
        'have.text',
        `${departureHours}:05 (arvioitu)`,
      );
      cy.testId('departure-scheduledtime').should(
        'have.text',
        `${departureHours}:00 (arvioitu)`,
      );
      cy.testId('departure-additional-content')
        .find('button')
        .focus()
        .type('{enter}');

      cy.testId('departure-additional-content').should('not.exist');

      cy.checkA11y();
    });

    it('filtering departures', () => {
      cy.visitWithLocation({
        latitude: 1,
        longitude: 2,
        accuracy: 15,
      });

      cy.wait('@postGraphQL');
      cy.testId('spinner').should('not.be.visible');
      cy.testId('departure-list').as('departureList');

      ['bus', 'tram', 'rail', 'subway', 'ferry'].forEach((mode) => {
        cy.testId(`filter-${mode}`)
          .as('filterButton')
          .should('have.attr', 'aria-pressed', 'true');

        cy.get('@filterButton').focus().type(' ');
        cy.get('@filterButton').should('have.attr', 'aria-pressed', 'false');
        cy.testId('departure-route').find(`.${mode}`).should('not.exist');

        cy.get('@filterButton').focus().type('{enter}');
        cy.get('@filterButton').should('have.attr', 'aria-pressed', 'true');
        cy.testId('departure-route').find(`.${mode}`).should('exist');
      });

      ['bus', 'tram', 'rail', 'subway', 'ferry'].forEach((mode) => {
        cy.testId(`filter-${mode}`).click();
      });

      cy.get('@departureList')
        .find('[role="cell"]')
        .should('have.length', 1)
        .and('contain.text', 'Lähtöjä ei löytynyt');

      ['bus', 'tram', 'rail', 'subway', 'ferry'].forEach((mode) => {
        cy.testId(`filter-${mode}`).click();
      });

      setSliderValue(200);
      cy.get('output[for="departurefilter-range"]').should('have.text', '200m');
      cy.get('@departureList')
        .find('[role="row"]:visible')
        .should('have.length', 5);

      setSliderValue(100);
      cy.get('@departureList')
        .find('[role="row"]:visible')
        .should('have.length', 4);
    });

    it('searching with changed range', () => {
      cy.visitWithLocation({ latitude: 1, longitude: 2 });

      // alerts
      cy.wait('@postGraphQL');
      // departures by location
      cy.wait('@postGraphQL');
      cy.testId('spinner').should('not.be.visible');

      setSliderValue(1400);
      cy.get('[type=submit]').click();
      // departures by set address
      cy.wait('@postGraphQL')
        .its('request.body.variables.maxDistance')
        .should('eql', 1400);
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
        .find('.lucide-alert-triangle')
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
        .find('.lucide-alert-triangle')
        .should('exist');

      cy.checkA11y();
    });

    it('displays no accuary indicator when the location has no accuracy', () => {
      cy.visitWithLocation({ latitude: 1, longitude: 2 });
      cy.testId('accuracy-indicator').should('not.exist');
    });

    it('navigation should work with keyboard', () => {
      cy.visitWithLocation({ latitude: 1, longitude: 2 });
      cy.wait('@postGraphQL');
      cy.wait('@postGraphQL');
      cy.testId('skip-to-departures-button').focus().type('{enter}');
      cy.testId('departure-list')
        .find('[role=row]')
        .eq(1)
        .should('have.focus')
        .type('{enter}');

      cy.testId('departure-additional-content')
        .find('button.close-button')
        .click();

      cy.testId('departure-additional-content').should('not.exist');
      cy.testId('departure-list').find('[role=row]').eq(1).should('have.focus');
    });
  });

  describe('without location', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/geocoding/v1/search*', {
        statusCode: 200,
        fixture: 'address-search-rauta.json',
      });

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

      cy.visitWithLocation(new PositionError('Position blocked', 1));
    });

    it('displays an error when location fetch fails', () => {
      cy.testId('location-error')
        .should('exist')
        .and(
          'contain.text',
          'Paikannus epäonnistui: Sijainnin haku on estetty tai kytketty pois.',
        )
        .find('.lucide-alert-triangle')
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
      assertDefaultState();
      cy.get('input[name=address]').type('rauta');
      cy.get('[type=submit]').click();
      cy.wait('@postGraphQL')
        .its('request.body.variables')
        .then((vars) => {
          expect(vars.latitude).to.eql(3);
          expect(vars.longitude).to.eql(4);
        });
      cy.testId('location-error').should('not.exist');
      cy.testId('departure-list')
        .find('[role=row]:visible')
        .should('have.length', 7);
    });

    it('searching with an address from suggestion', () => {
      assertDefaultState();
      cy.get('input[name=address]').type('rauta');
      cy.testId('suggestion-list').find('li').eq(1).click();
      cy.wait('@postGraphQL')
        .its('request.body.variables')
        .then((vars) => {
          expect(vars.latitude).to.eql(1);
          expect(vars.longitude).to.eql(2);
        });
      cy.testId('location-error').should('not.exist');
      cy.testId('departure-list')
        .find('[role=row]:visible')
        .should('have.length', 7);
    });

    it('searching with an address from favourites', () => {
      assertDefaultState();
      cy.testId('menu-button').click();
      cy.testId('favourites-list').find('li').eq(0).click();
      cy.wait('@postGraphQL')
        .its('request.body.variables')
        .then((vars) => {
          expect(vars.latitude).to.eql(5);
          expect(vars.longitude).to.eql(6);
        });
      cy.testId('location-error').should('not.exist');
      cy.testId('departure-list')
        .find('[role=row]')
        .should('not.contain', 'Lähtöjä ei löytynyt');
    });

    function assertDefaultState() {
      cy.wait('@postGraphQL');
      cy.get('[name=address]').should('have.value', '');
      cy.testId('location-error').should('be.visible');
      cy.testId('departure-list')
        .find('[role=row]')
        .should('contain', 'Lähtöjä ei löytynyt');
    }
  });

  function setSliderValue(value: number) {
    return cy
      .get('[type=range]')
      .invoke('val', value)
      .trigger('input')
      .click({ force: true });
  }
});
