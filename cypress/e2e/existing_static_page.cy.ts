import { LIST_DATA } from 'cypress/support/e2e';

describe('Existing static page', () => {
  it('successfully loads', () => {
    cy.visit(`/v/${LIST_DATA.id}`);
  });

  it('should have correct page title', () => {
    cy.visit(`/v/${LIST_DATA.id}`);
    cy.get('[data-cy="list-title"]').should('have.text', LIST_DATA.title);
  });

  it('should have correct description', () => {
    cy.visit(`/v/${LIST_DATA.id}`);
    cy.get('[data-cy="list-description"]').should('have.text', LIST_DATA.description);
  });

  it('should have document title', () => {
    cy.visit(`/v/${LIST_DATA.id}`);
    cy.title().should('eq', `${LIST_DATA.title || 'Untitled'} - FILMQ`);
  });
});
