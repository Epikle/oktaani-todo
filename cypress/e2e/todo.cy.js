/// <reference types="cypress" />

describe('oktaniTODO', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:4173/todo-demo/');
  });

  it('displays collection named First Collection default', () => {
    cy.get('article')
      .first()
      .should('have.text', '✨ First Collection ✨')
      .click();
  });

  it('selects first collection and deselects it', () => {
    cy.get('article')
      .first()
      .should('have.text', '✨ First Collection ✨')
      .click();

    cy.get('[data-testid="submit-btn"]').click().should('not.be.visible');

    cy.get('[data-testid="todo-input"]').should('be.visible');
  });

  it('selects collection and adds item to it', () => {
    cy.get('article')
      .first()
      .should('have.text', '✨ First Collection ✨')
      .click();

    cy.get('[data-testid="todo-input"]').type('Test todo item');
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('article')
      .first()
      .children()
      .get('ul > li')
      .should('have.text', 'Test todo item');
  });

  it('creates collection with two items and marks one as done and checks if collection done-status is correct', () => {
    cy.get('article')
      .first()
      .should('have.text', '✨ First Collection ✨')
      .click();

    cy.get('[data-testid="todo-input"]').type('ITEM1');
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="todo-input"]').type('ITEM2');
    cy.get('[data-testid="submit-btn"]').click();

    cy.get('article')
      .first()
      .children()
      .get('ul > li input[type="checkbox"]')
      .first()
      .click();

    cy.get('article')
      .first()
      .should('have.attr', 'data-done')
      .should('eq', '1/2');
  });
});
