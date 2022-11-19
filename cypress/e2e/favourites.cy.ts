import { PositionError } from '../../src/util/error.utils';

describe('Favourites', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/geocoding/v1/reverse*', {
      statusCode: 200,
      fixture: 'geocoding_reverse.json',
      delay: 500,
    }).as('getLocation');

    cy.intercept('POST', '**/graphql/batch', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('POST', '**/routing/v1/routers/hsl/index/graphql', {
      statusCode: 200,
      body: [],
    }).as('postGraphQL');
  });

  describe('without existing favourites', () => {
    it('adds an address to favourites when address is defined', () => {
      const location = { latitude: 1, longitude: 2, accuracy: 12 };
      cy.visitWithLocation(location);
      cy.wait('@getLocation');
      cy.testId('menu-button').focus().type(' ');

      cy.testId('drawer').should('be.visible');
      assertEmptyList();

      cy.testId('favourite-button').should(
        'have.attr',
        'aria-pressed',
        'false',
      );
      cy.checkA11y();

      cy.testId('favourite-button')
        .click()
        .should('have.attr', 'aria-pressed', 'true');

      cy.window()
        .its('localStorage')
        .invoke('getItem', 'favourites')
        .then((favourites) => {
          expect(JSON.parse(favourites)[0].location).to.eql(location);
        });

      cy.testId('favourites-list')
        .find('li')
        .should('have.length', 1)
        .and('contain', 'Rautatientori')
        .and('contain', 'Valittu');

      cy.testId('favorite-remove-button').click();
      cy.testId('favourite-button').should(
        'have.attr',
        'aria-pressed',
        'false',
      );

      assertEmptyList();

      // clicking modal backdrop should close the drawer
      cy.testId('modal-backdrop')
        .click({ force: true })
        .should('not.be.visible');
      cy.testId('drawer').should('not.exist');
    });

    it('works with keyboard', () => {
      cy.visitWithLocation(new PositionError('Disabled', 1));
      cy.testId('menu-button').focus().type('{enter}');
      cy.testId('drawer').should('be.visible');
      cy.get('body').type('{esc}');
      cy.testId('drawer').should('not.exist');
    });

    it('works with swipe', () => {
      cy.visitWithLocation(new PositionError('Disabled', 1));
      cy.get('header').realSwipe('toLeft', { length: 80 });
      cy.testId('drawer').should('be.visible');

      cy.testId('drawer').realSwipe('toRight', { length: 80 });
      cy.testId('drawer').should('not.exist');
    });

    it('does not allow saving a favourite when there is no location to save', () => {
      cy.visitWithLocation(new PositionError('Disabled', 1));
      cy.testId('menu-button').click();
      cy.testId('favourite-button')
        .should('have.attr', 'aria-pressed', 'false')
        .and('have.attr', 'aria-disabled', 'true')
        .click();

      cy.checkA11y();
      assertEmptyList();
    });
  });

  describe('with existing favourites', () => {
    beforeEach(() => {
      localStorage.setItem(
        'favourites',
        JSON.stringify([
          {
            id: 'node:418089207',
            localadmin: 'Kerava',
            label: 'Keravan kertsin assa',
            location: { latitude: 1, longitude: 2 },
          },
          {
            id: 'node:418089208',
            localadmin: 'Itseäninen Kontula',
            label: 'Kontulan ostari',
            location: { latitude: 3, longitude: 4 },
          },
        ]),
      );
    });

    it('displays saved favourites, adds and removes saved and existing favourites', () => {
      cy.visitWithLocation({ latitude: 1, longitude: 2 });
      cy.wait('@getLocation');
      cy.testId('menu-button').click();
      cy.testId('favourites-list')
        .find('li')
        .as('favourites')
        .should('have.length', 2)
        .and('not.contain', 'Valittu');

      cy.get('@favourites').eq(1).click();
      cy.get('[name=address]').should('have.value', 'Kontulan ostari');
      cy.testId('menu-button').click();

      cy.get('@favourites').eq(1).should('contain.text', 'Valittu');
      cy.testId('favorite-remove-button').eq(1).click();
      // address should still be set
      cy.get('[name=address]').should('have.value', 'Kontulan ostari');
      cy.get('@favourites').should('not.contain.text', 'Valittu');
      cy.testId('favorite-remove-button').eq(0).click();
      cy.testId('modal-close-button').click();
      cy.testId('menu-button').click();

      assertEmptyList();
    });
  });

  function assertEmptyList() {
    cy.testId('favourites-list')
      .find('li')
      .should('have.length', 1)
      .and('contain', 'Et ole vielä lisännyt suosikkeja!');
  }
});
