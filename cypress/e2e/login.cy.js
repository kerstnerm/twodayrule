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

  it('login error displays error msg', () => {
    const email = 'sample@user.huu'
    const password = 'System_1234'
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button').click();
    cy.get('.sr-only').should('have.text', 'Error info');
  })

  it('login success then logout', () => {
    const email = 'sample@user.hu'
    const password = 'System_1234'
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();
    cy.url().should('includes', 'dashboard')
    cy.get('li').last().click();
  })
})
