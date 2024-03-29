/// <reference types="cypress" />

describe('Todo remove', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="todo-input"]').as('input');
    cy.get('@input').type('collection');
    cy.get('[data-testid="submit-btn"]').as('submitBtn');
    cy.get('@submitBtn').click();
    cy.get('[data-testid="add-todo-btn"]').click();
    cy.get('@input').type('ITEM1');
    cy.get('@submitBtn').click();
    cy.get('@input').type('ITEM2');
    cy.get('@submitBtn').click();
    cy.get('@input').type('ITEM3');
    cy.get('@submitBtn').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '0/3');
  });

  it('marks one item as done and clears all done items and should update collection correctly', () => {
    cy.get(':nth-child(1) > label').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '1/3');
    cy.get('[data-testid="remove-done-btn"]').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '0/2');
    cy.get('[data-testid="remove-done-btn"]').should('be.disabled');
  });

  it('should not delete collection when not confirming delete', () => {
    cy.get('[data-testid="delete-collection-btn"]').click();
    cy.get('[data-testid="cancel-delete-btn"]').click();
    cy.get('article').first().contains('collection');
  });

  it('should delete collection when confirming delete', () => {
    cy.get('[data-testid="delete-collection-btn"]').click();
    cy.get('[data-testid="confirm-delete-btn"]').click();
    cy.get('article').should('have.length', 0);
  });
});
