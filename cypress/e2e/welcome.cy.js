/// <reference types="cypress" />

describe('oktaniTODO', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4173/todo-demo/');
  });

  it('display welcome/help page', () => {
    cy.get('h2').should('have.text', 'Welcome to oktaaniTODO!');
  });
});