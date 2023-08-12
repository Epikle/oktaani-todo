/// <reference types="cypress" />

describe('oktaniTODO', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/todo-demo/');
  });

  it('Should display welcome/help page', () => {
    cy.get('h2').should('have.text', 'Welcome to oktaaniTODO!');
  });

  it('Should toggle settings open', () => {
    cy.get('[data-testid="btn-mode"]').should('be.disabled');
    cy.get('[data-testid="btn-language"]').should('be.disabled');
    cy.get('[data-testid="btn-settings"]').click();
    cy.get('[data-testid="btn-mode"]').should('not.be.disabled');
    cy.get('[data-testid="btn-language"]').should('not.be.disabled');
  });

  it('Should toggle settings open and change mode', () => {
    cy.get('[data-testid="btn-settings"]').click();
    cy.get('[data-testid="btn-mode"]').should('not.be.disabled');
    cy.get('[data-testid="icon-sun"]').should('exist');
    cy.get('[data-testid="btn-mode"]').click();
    cy.get('[data-testid="icon-moon"]').should('exist');
    cy.get('[data-testid="icon-sun"]').should('not.exist');
  });
});
