/// <reference types="cypress" />

describe('Todo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="todo-input"]').type('collection');
    cy.get('[data-testid="submit-btn"]').click();
    cy.wait(1000);
    cy.get('[data-testid="add-todo-btn"]').click();
    cy.get('[data-testid="submit-btn"]').click();
  });

  it('Should display collection named collection', () => {
    cy.get('article').first().should('have.text', 'collection');
  });

  it('Should selects collection and deselects it', () => {
    cy.get('article').first().click();
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="submit-btn"]').should('be.disabled');
  });

  it('Should select collection and add item to it', () => {
    cy.get('article').first().click();
    cy.createCollectionItems();
    cy.get('article').first().find('ul > li').eq(1).should('have.text', 'ITEM1');
  });

  it('Should create collection with two items and mark one as done and checks if collection done-status is correct', () => {
    cy.get('article').first().click();
    cy.createCollectionItems();
    cy.get(':nth-child(1) > label').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '1/2');
  });

  it('Should create collection with two items and mark one as done and remove done items', () => {
    cy.get('article').first().click();
    cy.createCollectionItems();
    cy.get(':nth-child(1) > label').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '1/2');
    cy.get('[data-testid="remove-done-btn"]').should('not.be.disabled').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '0/1');
  });

  it('Should change collection color', () => {
    cy.get('article').first().click();
    cy.get('[data-testid="input-color"]').focus().invoke('val', '#ff0000').blur();
    cy.get('article').first().should('have.css', 'border-color', 'rgb(255, 0, 0)');
  });

  it('Should remove checked items from list', () => {
    cy.get('article').first().click();
    cy.createCollectionItems();
    cy.get(':nth-child(1) > label').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '1/2');
    cy.get('[data-testid="remove-done-btn"]').click();
    cy.get('article').first().should('have.attr', 'data-done').should('eq', '0/1');
  });

  it('Should cycle all different priorities', () => {
    cy.get('article').first().click();
    cy.createCollectionItems();
    const priorityBtnCommand = cy.get('[data-testid="item-btn-priority"]').first();
    priorityBtnCommand.should('have.css', 'background-color', 'rgb(128, 128, 128)');
    priorityBtnCommand.click();
    priorityBtnCommand.should('have.css', 'background-color', 'rgb(86, 104, 80)');
    priorityBtnCommand.click();
    priorityBtnCommand.should('have.css', 'background-color', 'rgb(176, 24, 7)');
    priorityBtnCommand.click();
    priorityBtnCommand.should('have.css', 'background-color', 'rgb(128, 128, 128)');
  });
});
