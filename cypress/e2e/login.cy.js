/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('login page test', () => {
  beforeEach(() => {
    cy.visit('https://twodayrule-kerstner.web.app')
  })

  it('url redirects to login', () => {
    cy.url().should('includes', 'login');
  })

  it('displays two input items and a submit button', () => {
    cy.get('input').should('have.length', 2)
    cy.get('[type=submit]').should('have.length', 1)
  })

  it('login error', () => {
    const email = 'sample@user.huu'
    const password = 'System_1234'
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button').click();
    cy.get('.sr-only').should('have.text', 'Error info');
  })

  it('login success', () => {
    const email = 'sample@user.hu'
    const password = 'System_1234'
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button').click();
  })

  it('logout', () => {
    const email = 'sample@user.hu'
    const password = 'System_1234'
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button').click();
  })

})
