/// <reference types="cypress" />

describe('Share todo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="todo-input"]').type('first-collection');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="add-todo-btn"]').click();
  });

  // TODO
  // it('Should share created collection successfully', () => {
  //   cy.get('[data-testid="share-col-btn"]').click();
  //   cy.get('[data-testid="confirm-container"]').should('have.text', 'Share collection?');
  //   cy.get('[data-testid="confirm-delete-btn"]').click();
  //   cy.get('[data-testid="confirm-container"]').should('not.exist');
  //   cy.get('[data-testid="share-col-btn"]').should((element) => {
  //     expect(element.attr('class')).to.match(/shared/);
  //   });
  // });

  it('Should cancel share collection', () => {
    cy.get('[data-testid="share-col-btn"]').click();
    cy.get('[data-testid="confirm-container"]').should('have.text', 'Share collection?');
    cy.get('[data-testid="cancel-delete-btn"]').click();
    cy.get('[data-testid="confirm-container"]').should('not.exist');
    cy.get('[data-testid="share-col-btn"]').should((element) => {
      expect(element.attr('class')).not.to.match(/shared/);
    });
  });

  // TODO
  // it('Should share created collection successfully and then cancel it', () => {
  //   cy.get('[data-testid="share-col-btn"]').click();
  //   cy.get('[data-testid="confirm-container"]').should('have.text', 'Share collection?');
  //   cy.get('[data-testid="confirm-delete-btn"]').click();
  //   cy.get('[data-testid="confirm-container"]').should('not.exist');
  //   cy.get('[data-testid="share-col-btn"]').should((element) => {
  //     expect(element.attr('class')).to.match(/shared/);
  //   });
  //   cy.get('[data-testid="share-col-btn"]').click();
  //   cy.get('[data-testid="share-col-btn"]').should((element) => {
  //     expect(element.attr('class')).not.to.match(/shared/);
  //   });
  // });
});
