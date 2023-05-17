describe('details habit page test', () => {
  beforeEach(() => {
    cy.visit('https://twodayrule-kerstner.web.app/app/dashboard')
  })

  it('last item navigate', () => {
    cy.get('.p-5.text-center.bg-white.border.border-gray-200.rounded-lg.shadow').find('a').last().click();
    cy.url().should('includes', 'details')
  })
})
