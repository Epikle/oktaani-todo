/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/todo-demo/');
  });

  it('displays collection named First Collection default', () => {
    const collection = cy.get('article').first();

    collection.should('have.text', 'First Collection');

    collection.click();
  });
});
