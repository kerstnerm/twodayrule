import Chance from 'chance';

const chance = new Chance();

describe('set new habit page test', () => {
  beforeEach(() => {
    cy.visit('https://twodayrule-kerstner.web.app/app/dashboard')
  })

  it('check user is logged in', () => {
    cy.url().should('includes', 'dashboard')
  })

  it('click navigates create habit page', () => {
    cy.get('li').eq(1).children().click();
    cy.url().should('includes', 'create')
    cy.get('h2').should('include.text', 'Add a new habit')
  })

  it('submit button disabled by default', () => {
    cy.visit('https://twodayrule-kerstner.web.app/app/habits/create')
    cy.get('button').should('be.disabled');
    cy.get('#name').type(chance.word())
    cy.get('#unit').type(chance.syllable())
    cy.get('#goal').type(chance.natural({ min: 1, max: 30 })+'')
    cy.get('#icon').select(chance.natural({min: 0, max: 9}));
    cy.get('#description').type(chance.paragraph({sentences: 1}))
    cy.get('form').submit();
    cy.get('.swal2-html-container').should('include.text', 'New habit is added successfully');
  })
})
