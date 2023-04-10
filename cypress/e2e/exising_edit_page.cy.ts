import { LIST_DATA } from 'cypress/support/e2e';

describe('Existing edit page', () => {
  it('successfully loads', () => {
    cy.visit(`/e/${LIST_DATA.id}?t=${LIST_DATA.token}`);
  });

  it('should have valid list token cookie', () => {
    cy.visit(`/e/${LIST_DATA.id}?t=${LIST_DATA.token}`);
    cy.getCookie('list_token').should('exist');
  });

  it('should have correct title', () => {
    cy.visit(`/e/${LIST_DATA.id}?t=${LIST_DATA.token}`);
    cy.get('[data-cy="list-title"]').should('have.text', LIST_DATA.title);
  });

  it('should have correct description', () => {
    cy.visit(`/e/${LIST_DATA.id}?t=${LIST_DATA.token}`);
    cy.get('[data-cy="list-description"]').should('have.text', LIST_DATA.description);
  });

  it('should empty list', () => {
    cy.visit(`/e/${LIST_DATA.id}?t=${LIST_DATA.token}`);
    cy.get('[data-cy="movie-item-1"]').find('[data-cy="movie-item-delete-button"]').click();
    cy.get('[data-cy="movie-item-1"]').find('[data-cy="movie-item-delete-button"]').click();
    cy.get('[data-cy="movie-item-1"]').find('[data-cy="movie-item-delete-button"]').click();
    cy.get('[data-cy="list-movies-grid"]').children().should('have.length', 0);
  });
});
