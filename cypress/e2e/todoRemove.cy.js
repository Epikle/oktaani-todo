/// <reference types="cypress" />

describe('oktaniTODO', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4173/todo-demo/');

    cy.get('article')
      .first()
      .should('have.text', '✨ First Collection ✨')
      .click();

    cy.get('[data-testid="todo-input"]').type('ITEM1');
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="todo-input"]').type('ITEM2');
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="todo-input"]').type('ITEM3');
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('article')
      .first()
      .should('have.attr', 'data-done')
      .should('eq', '0/3');
  });

  it('marks one item as done and clears all done items and should update collection correctly', () => {
    cy.get('article')
      .first()
      .children()
      .get('ul > li input[type="checkbox"]')
      .first()
      .click();

    cy.get('article')
      .first()
      .should('have.attr', 'data-done')
      .should('eq', '1/3');

    cy.get('[data-testid="remove-done-btn"]').click();

    cy.get('article')
      .first()
      .should('have.attr', 'data-done')
      .should('eq', '0/2');

    cy.get('[data-testid="remove-done-btn"]').should('be.disabled');
  });

  it('should not delete collection when not confirming delete', () => {
    cy.get('[data-testid="delete-collection-btn"]').click();

    cy.get('[data-testid="cancel-delete-btn"]').click();

    cy.get('article').first().contains('✨ First Collection ✨');
  });

  it.only('should delete collection when confirming delete', () => {
    cy.get('[data-testid="delete-collection-btn"]').click();

    cy.get('[data-testid="confirm-delete-btn"]').click();

    cy.get('article').should('have.length', 0);
  });
});
