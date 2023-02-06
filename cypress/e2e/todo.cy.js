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
    cy.wait(500);
  });

  it('selects first collection and deselects it', () => {
    cy.get('article')
      .first()
      .should('have.text', '✨ First Collection ✨')
      .click();
    cy.wait(500);
    cy.get('[data-cy="submit-btn"]').click().should('not.be.visible');
    cy.wait(500);
    cy.get('input[type="text"]').should('be.visible');
    cy.wait(500);
  });

  it('selects collection and adds item to it', () => {
    cy.get('article')
      .first()
      .should('have.text', '✨ First Collection ✨')
      .click();
    cy.wait(500);
    cy.get('input[type="text"]').type('Test todo item');
    cy.get('[data-cy="submit-btn"]').click();
    cy.wait(500);
    cy.get('article')
      .first()
      .children()
      .get('ul > li')
      .should('have.text', 'Test todo item');
  });
});
