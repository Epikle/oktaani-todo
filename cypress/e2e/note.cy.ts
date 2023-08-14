/// <reference types="cypress" />

describe('Note', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create new note with text', () => {
    const text = 'Test note';
    cy.get('[data-testid="todo-input"]').type('✨ First Collection ✨');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="add-note-btn"]').click();
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('h2 > button').click();
    cy.get('textarea').type(text);
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('p').should('have.text', text);
  });
});
