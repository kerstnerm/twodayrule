describe('dashboard page test', () => {
  beforeEach(() => {
    cy.visit('https://twodayrule-kerstner.web.app/app/dashboard')
  })

  it('page contains create item card', () => {
    cy.get('.flex.items-center.justify-center.h-24.my-3').should('be.visible');
  })

  it('click on create item navigates', () => {
    cy.get('.flex.items-center.justify-center.h-24.my-3').find('a').click();
    cy.url().should('includes', 'create')
  })

  it('have date picker component', () => {
    cy.get('.w-48.border.border-gray-200.flex.items-center.justify-center.h-16.rounded.cursor-pointer').should('be.visible');
  })

  it('have increase buttons', () => {
    cy.get('.p-5.text-center.bg-white.border.border-gray-200.rounded-lg.shadow').find('button').should('be.visible');
  })

  it('increase button click on last item', () => {
    cy.get('.p-5.text-center.bg-white.border.border-gray-200.rounded-lg.shadow').find('button').last().click();
  })
})
