import Chance from 'chance';

const chance = new Chance();
describe('register page test', () => {
  beforeEach(() => {
    cy.visit('https://twodayrule-kerstner.web.app/auth/register')
  })

  it('page contains sign up title', () => {
    cy.get('h1').first().should('contain', 'Sign up');
  })

  it('sign up button disabled by default', () => {
    cy.get('button').first().should('be.disabled');
  })

  it('fill form fields then button enabled', () => {
    const chance = new Chance();
    cy.get('#displayName').type(chance.name())
    cy.get('#email').type(chance.email())
    cy.get('#password').type('Password_1234')
    cy.get('#confirmPassword').type('Password_1234')
    cy.get('#description').type(chance.phone() + ' ' + chance.address())
    cy.get('button').first().should('be.enabled');
  })

  it('after click back return login', () => {
    cy.get('button').last().click();
    cy.url().should('includes', 'login');
  })

})
