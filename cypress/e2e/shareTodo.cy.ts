/// <reference types="cypress" />

describe('Share todo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="todo-input"]').type('first-collection');
    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="add-todo-btn"]').click();
  });

  it('Should share created collection successfully', () => {
    cy.intercept('GET', 'http://localhost:5000/api/v2/**', []);
    cy.intercept('PUT', 'http://localhost:5000/api/v2/**', []);
    cy.intercept('POST', 'http://localhost:5000/api/v2/**', []);

    cy.get('[data-testid="share-col-btn"]').click();
    cy.get('[data-testid="confirm-container"]').should('have.text', 'Share collection?');
    cy.get('[data-testid="confirm-delete-btn"]').click();
    cy.get('[data-testid="confirm-container"]').should('not.exist');
    cy.get('[data-testid="share-col-btn"]').should((element) => {
      expect(element.attr('class')).to.match(/shared/);
    });
  });

  it('Should cancel share collection', () => {
    cy.get('[data-testid="share-col-btn"]').click();
    cy.get('[data-testid="confirm-container"]').should('have.text', 'Share collection?');
    cy.get('[data-testid="cancel-delete-btn"]').click();
    cy.get('[data-testid="confirm-container"]').should('not.exist');
    cy.get('[data-testid="share-col-btn"]').should((element) => {
      expect(element.attr('class')).not.to.match(/shared/);
    });
  });

  it('Should share created collection successfully and then cancel it', () => {
    cy.intercept('GET', 'http://localhost:5000/api/v2/**', []);
    cy.intercept('PUT', 'http://localhost:5000/api/v2/**', []);
    cy.intercept('POST', 'http://localhost:5000/api/v2/**', []);
    cy.intercept('DELETE', 'http://localhost:5000/api/v2/**', []);

    cy.get('[data-testid="share-col-btn"]').click();
    cy.get('[data-testid="confirm-container"]').should('have.text', 'Share collection?');
    cy.get('[data-testid="confirm-delete-btn"]').click();
    cy.get('[data-testid="confirm-container"]').should('not.exist');
    cy.get('[data-testid="share-col-btn"]').should((element) => {
      expect(element.attr('class')).to.match(/shared/);
    });
    cy.get('[data-testid="share-col-btn"]').click();
    cy.get('[data-testid="share-col-btn"]').should((element) => {
      expect(element.attr('class')).not.to.match(/shared/);
    });
  });
});
