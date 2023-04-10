describe('New edit page', () => {
  after(() => {
    cy.clearCookie('session_token');
  });

  it('successfully loads', () => {
    cy.visit('/');
  });

  it('should have valid session token cookie', () => {
    cy.visit('/');
    cy.getCookie('session_token').should('exist');
  });

  it('should update list title', () => {
    cy.visit('/');
    cy.get('[data-cy="list-title"]').type('My watchlist!');
    cy.get('[data-cy="list-title"]').should('have.text', 'My watchlist!');
  });

  it('should find film by title', () => {
    cy.visit('/');
    cy.get('[data-cy="movie-search-input"]').type('The Matrix');
    cy.get('[data-cy="movie-search-results"]').should('include.text', 'The Matrix');
  });

  it('should add film to list', () => {
    cy.visit('/');

    cy.get('[data-cy="list-movies-grid"]').children().should('have.length', 0);

    cy.get('[data-cy="movie-search-input"]').type('The Matrix');
    cy.get('[data-cy="movie-search-results"]').children().first().click();
    cy.get('[data-cy="movie-search-results"]').children().first().next().click();

    cy.get('[data-cy="list-movies-grid"]').children().should('have.length', 2);
  });

  it('should remove film from list', () => {
    cy.visit('/');

    cy.get('[data-cy="movie-search-input"]').type('The Matrix');
    cy.get('[data-cy="movie-search-results"]').children().first().click();
    cy.get('[data-cy="movie-search-results"]').children().first().next().click();

    cy.get('[data-cy="list-movies-grid"]').children().should('have.length', 2);

    cy.get('[data-cy="movie-item-1"]').find('[data-cy="movie-item-delete-button"]').click();

    cy.get('[data-cy="list-movies-grid"]').children().should('have.length', 1);
  });

  it('should undo and redo', () => {
    cy.visit('/');

    cy.get('[data-cy="movie-search-input"]').type('The Matrix');
    cy.get('[data-cy="movie-search-results"]').children().first().click();
    cy.get('[data-cy="movie-search-results"]').children().first().next().click();

    cy.get('[data-cy="list-movies-grid"]').children().should('have.length', 2);

    cy.get('body').type('{meta}z');

    cy.get('[data-cy="list-movies-grid"]').children().should('have.length', 1);

    cy.get('body').type('{meta}{shift}z');

    cy.get('[data-cy="list-movies-grid"]').children().should('have.length', 2);
  });
});
