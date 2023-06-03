/// <reference types="cypress" />

describe('oktaniTODO', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4173/todo-demo/');
  });

  it('should create new note with text', () => {
    const text = 'Test note';
    cy.get('[data-testid="todo-input"]').type('✨ First Collection ✨');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="submit-btn"]').should('not.be.visible');
    cy.get('[data-testid="add-note-btn"]').click();
    cy.get('[data-testid="submit-btn"]').click().should('not.be.visible');
    cy.get('h2 > button').click();
    cy.get('textarea').type(text);
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('p').should('have.text', text);
  });
});
