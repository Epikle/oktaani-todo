/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

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
// Cypress.Commands.add('login', (email, password) => { ... })
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

Cypress.Commands.add('createCollectionItems', () => {
  cy.get('[data-testid="todo-input"]').type('ITEM1');
  cy.get('[data-testid="submit-btn"]').click();
  cy.get('[data-testid="todo-input"]').type('ITEM2');
  cy.get('[data-testid="submit-btn"]').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      createCollectionItems(): Chainable<void>;
    }
  }
}
