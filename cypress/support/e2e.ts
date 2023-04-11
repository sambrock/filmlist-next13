// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
  // cy.exec('npm run db:reset && npm run db:push && npm run db:seed');
  // cy.exec('npm run db:reset').then(() => {
  //   cy.exec('npm run db:push').then(() => {
  //     cy.exec('npm run db:seed');
  //   });
  // });
});

// Part of seed data
export const LIST_DATA = {
  id: '01hjd120833j',
  title: 'My watchlist!',
  description: 'A list of my favorite movies',
  createdAt: '2023-02-28 20:11:47.047',
  updatedAt: '2023-03-17 15:24:38.282',
  userId: '',
  token: 'rhunht19hbrwzgk8o2a',
};
