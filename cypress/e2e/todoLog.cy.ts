/// <reference types="cypress" />

describe('Welcome page and settings', () => {
  // beforeEach(() => {
  //   cy.visit('/');
  //   cy.get('[data-testid="todo-input"]').type('First Collection');
  //   cy.get('[data-testid="submit-btn"]').click();
  //   cy.get('[data-testid="add-todo-btn"]').click();
  // });
  // it('Should share collection and open log and close', () => {
  //   cy.intercept('GET', '/api/v2/oktaani-todo-v2/log/**', [
  //     { id: 'test-id', shareId: 'test-share-id', message: 'test-message', createdAt: Date.now() },
  //   ]).as('getLogs');
  //   cy.intercept('GET', '/api/v2/oktaani-todo-v2/share/**', []);
  //   cy.intercept('PUT', '/api/v2/**', []);
  //   cy.intercept('POST', '/api/v2/**', []);
  //   cy.get('[data-testid="share-col-btn"]').click();
  //   cy.get('[data-testid="confirm-container"]').should('have.text', 'Share collection?');
  //   cy.get('[data-testid="confirm-delete-btn"]').click();
  //   cy.get('[aria-label="Show Changelog"]').click();
  //   cy.get('[data-testid="log-container"]').should((element) => {
  //     expect(element.text()).to.match(/Changelog/);
  //   });
  //   cy.get('[aria-label="Show Changelog"]').click();
  //   cy.get('[data-testid="log-container"]').should('not.exist');
  // });
});
