/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('visitWithLocation', (location) => {
  let t: ReturnType<typeof setTimeout>;

  cy.visit('/', {
    onBeforeLoad: (win) => {
      cy.stub(win.navigator.geolocation, 'watchPosition').callsFake(
        (onSuccess, onError) => {
          if (t !== undefined) {
            clearTimeout(t);
          }

          t = setTimeout(() => {
            if (location instanceof Error) {
              onError(location);
            } else {
              onSuccess({ coords: location });
            }
          }, 200);
        },
      );
    },
  });

  cy.injectAxe();
});

Cypress.Commands.add(
  'testId',
  { prevSubject: 'optional' },
  (prevSubject: any, cyId) => {
    const selector = `[data-testId="${cyId}"]`;
    return prevSubject ? prevSubject.find(selector) : cy.get(selector);
  },
);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      visitWithLocation(
        location: Partial<GeolocationCoordinates> | Error,
      ): Chainable<void>;

      testId(cyId: string): Chainable<Element>;

      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      // dismiss(
      //   subject: string,
      //   options?: Partial<TypeOptions>,
      // ): Chainable<Element>;
      // visit(
      //   originalFn: CommandOriginalFn,
      //   url: string,
      //   options: Partial<VisitOptions>,
      // ): Chainable<Element>;
    }
  }
}

export {};
