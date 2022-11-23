/// <reference types="cypress" />

describe('oktaniTODO', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/todo-demo/');
  });

  it('displays collection named First Collection default', () => {
    const collection = cy.get('article').first();

    collection.should('have.text', 'First Collection');

    collection.click();
  });

  it('selects first collection and deselects it', () => {
    const collection = cy.get('article').first();

    collection.should('have.text', 'First Collection');

    collection.click();

    const closeBtn = cy.get('form > button').click();
    closeBtn.should('not.be.visible');

    cy.get('input[placeholder="Add a new collection"]').should('be.visible');
  });

  it('selects collection and adds item to it', () => {
    const collection = cy.get('article').first();

    collection.should('have.text', 'First Collection');

    collection.click();

    const input = cy
      .get('input[placeholder="Add a new todo to First Collection"]')
      .type('Test todo item');
    cy.get('button[aria-label="Add"]').click();

    collection.children().get('ul > li').should('have.text', 'Test todo item');
  });
});
