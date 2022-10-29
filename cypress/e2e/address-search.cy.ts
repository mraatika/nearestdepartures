/// <reference types="cypress" />
import { PositionError } from '../../src/util/error.utils';
import { DEFAULT_FOCUS_POINT } from '../../src/constants';

describe('address search', () => {
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

    cy.intercept('POST', '**/routing/v1/routers/hsl/index/graphql', {
      statusCode: 200,
      body: [],
    }).as('postGraphQL');
  });

  it('suggests addresses when typing', () => {
    cy.visitWithLocation(new PositionError('Position blocked', 1));
    cy.get('input[name=address]').as('addressInput').type('ra');
    cy.wait(350);
    cy.testId('suggestion-list').as('suggestionList').should('not.be.visible');

    cy.checkA11y();

    cy.get('@addressInput').type('u');
    cy.wait('@getSuggestions').then((req) => {
      const params = new URLSearchParams(
        req.request.url.substring(req.request.url.indexOf('?') + 1),
      );

      expect(params.get('text')).to.eql('rau');
      // default focus point is used when there's no location
      expect(+params.get('focus.point.lat')).to.equal(DEFAULT_FOCUS_POINT[0]);
      expect(+params.get('focus.point.lon')).to.equal(DEFAULT_FOCUS_POINT[1]);
    });

    cy.get('@suggestionList')
      .should('be.visible')
      .find('li')
      .should('have.length', 2);

    cy.checkA11y();

    cy.get('@addressInput').type('{backspace}');
    cy.testId('suggestion-list').as('suggestionList').should('not.be.visible');

    // does not add anything when blurred from an empty input without selected suggestion
    cy.get('@addressInput').clear().trigger('blur').should('have.value', '');

    cy.get('@addressInput').type('rau');
    cy.get('@suggestionList').should('be.visible').find('li').eq(1).click();
    cy.get('@addressInput').should(
      'have.value',
      'Tikkurilan rautakauppa, Vantaa',
    );

    // should not replace the value when something is typed
    cy.get('@addressInput').clear().type('ab').trigger('blur');
    cy.get('@addressInput').should('have.value', 'ab');

    // should replace the value with the current address's label when blurring an empty field
    cy.get('@addressInput').clear().trigger('blur');
    cy.get('@addressInput').should(
      'have.value',
      'Tikkurilan rautakauppa, Vantaa',
    );
  });

  it('suggestions work with keyboard', () => {
    cy.visitWithLocation(new PositionError('Position blocked', 1));
    cy.get('input[name=address]').as('addressInput').type('rau');
    cy.wait('@getSuggestions');
    cy.testId('suggestion-list').as('suggestionList').should('be.visible');

    [0, 1, 0].forEach((i) => {
      cy.get('@addressInput').type('{downArrow}');

      cy.get('@suggestionList')
        .find('li')
        .eq(i)
        .should('have.attr', 'aria-selected', 'true');
    });

    [1, 0, 1].forEach((i) => {
      cy.get('@addressInput').type('{upArrow}');

      cy.get('@suggestionList')
        .find('li')
        .eq(i)
        .should('have.attr', 'aria-selected', 'true');
    });

    cy.get('@addressInput')
      .type('{esc}')
      .should('have.value', '')
      .and('have.focus');

    cy.get('@suggestionList').should('not.be.visible');

    cy.get('@addressInput').type('rau');
    cy.wait('@getSuggestions');
    cy.get('@suggestionList').should('be.visible');
    cy.get('@addressInput').type('{upArrow}').type('{enter}');
    cy.get('@postGraphQL')
      .its('request.body.variables')
      .then((vars) => {
        expect(vars.latitude).to.eql(1);
        expect(vars.longitude).to.eql(2);
      });

    cy.get('@addressInput').should(
      'have.value',
      'Tikkurilan rautakauppa, Vantaa',
    );
  });

  it("fetches suggestions with user's location as the location point", () => {
    cy.visitWithLocation({ latitude: 1, longitude: 2 });
    cy.wait('@getLocation');
    cy.get('[name=address]').type('rau');
    cy.wait('@getSuggestions').then((req) => {
      const params = new URLSearchParams(
        req.request.url.substring(req.request.url.indexOf('?') + 1),
      );
      expect(+params.get('focus.point.lat')).to.equal(1);
      expect(+params.get('focus.point.lon')).to.equal(2);
    });
  });
});
