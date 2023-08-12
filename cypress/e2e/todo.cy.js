/// <reference types="cypress" />

describe('Todo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="todo-input"]').type('First Collection');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="submit-btn"]').should('not.be.visible');
    cy.get('[data-testid="add-todo-btn"]').click();
    cy.get('[data-testid="submit-btn"]').click().should('not.be.visible');
  });

  it('Should display collection named First Collection', () => {
    cy.get('article').first().should('have.text', 'First Collection');
  });

  it('Should selects first collection and deselects it', () => {
    cy.get('article').first().should('have.text', 'First Collection').click();
    cy.get('[data-testid="submit-btn"]').click().should('not.be.visible');
  });

  it('Should select collection and add item to it', () => {
    cy.get('article').first().should('have.text', 'First Collection').click();
    cy.createCollectionItems();
    cy.get('article').first().find('ul > li').eq(1).should('have.text', 'ITEM1');
  });

  it('Should create collection with two items and mark one as done and checks if collection done-status is correct', () => {
    cy.get('article').first().should('have.text', 'First Collection').click();
    cy.createCollectionItems();
    cy.get(':nth-child(1) > label').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '1/2');
  });

  it('Should create collection with two items and mark one as done and remove done items', () => {
    cy.get('article').first().should('have.text', 'First Collection').click();
    cy.createCollectionItems();
    cy.get(':nth-child(1) > label').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '1/2');
    cy.get('[data-testid="remove-done-btn"]').should('not.be.disabled').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '0/1');
  });

  it('Should change collection color', () => {
    cy.get('article').first().should('have.text', 'First Collection').click();
    cy.get('[data-testid="input-color"]').focus().invoke('val', '#ff0000').blur();
    cy.get('article').first().should('have.css', 'border-color', 'rgb(255, 0, 0)');
  });

  it('Should remove checked items from list', () => {
    cy.get('article').first().should('have.text', 'First Collection').click();
    cy.createCollectionItems();
    cy.get(':nth-child(1) > label').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '1/2');
    cy.get('[data-testid="remove-done-btn"]').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '0/1');
  });

  it('Should cycle all different priorities', () => {
    cy.get('article').first().should('have.text', 'First Collection').click();
    cy.createCollectionItems();
    const priorityBtnElem = cy.get('[data-testid="item-btn-priority"]').first();
    priorityBtnElem.should('have.css', 'background-color', 'rgb(128, 128, 128)');
    priorityBtnElem.click();
    priorityBtnElem.should('have.css', 'background-color', 'rgb(86, 104, 80)');
    priorityBtnElem.click();
    priorityBtnElem.should('have.css', 'background-color', 'rgb(176, 24, 7)');
    priorityBtnElem.click();
    priorityBtnElem.should('have.css', 'background-color', 'rgb(128, 128, 128)');
  });
});
