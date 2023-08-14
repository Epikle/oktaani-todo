/// <reference types="cypress" />

describe('Note', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create new note with text', () => {
    const text = 'Test note';
    cy.get('[data-testid="todo-input"]').type('✨ First Collection ✨');
    const submitBtnElem = cy.get('[data-testid="submit-btn"]');
    submitBtnElem.click();
    submitBtnElem.should('not.be.visible');
    cy.get('[data-testid="add-note-btn"]').click();
    submitBtnElem.click();
    submitBtnElem.should('not.be.visible');
    cy.get('h2 > button').click();
    cy.get('textarea').type(text);
    submitBtnElem.click();
    cy.get('p').should('have.text', text);
  });
});
