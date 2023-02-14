import { aliasQuery } from "../utilities/graphql-test-utils"

describe('Testing Login Page', () => {

  beforeEach(() => {
    cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'users')
      req.reply({
        fixture: 'login-users.json'
      })
    })
    cy.visit('http://localhost:3000/')
    cy.wait('@gqlusersQuery')
  })

  it('Should display the application logo', () => {
    cy.get('.logo-section').should('be.visible')
    cy.get('img').should('be.visible')
      .and('have.attr', "src", "/static/media/tv.d1669fef910821b06ff5.png")
    cy.get('h1').should('be.visible')
      .and('contain', 'Streamr')
  })

  // it('Should display a username and password form with submit button', () => {
  //   cy.get('[type="text"]').should('be.visible')
  //   cy.get('[type="password"]').should('be.visible')
  //   cy.get('button').should('be.visible')
  // })

  // it('Should be able to type in a valid username and password into inputs, click submit button, and then be directed to user\'s homepage', () => {
  //   cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
  //     aliasQuery(req, 'fetchUser')
  //     req.reply({
  //       fixture: 'login-currentUser.json'
  //     })
  //   })
  //   cy.get('[type="text"]').type('snoop_dogg')
  //   cy.get('[type="password"]').type('streamr')
  //   cy.get('button').click()
  //   cy.wait('@gqlfetchUserQuery')
  // })

  // it('Should see an invalid username/ password message if input an invalid username and click submit', () => {
  //   cy.get('[type="text"]').type('banana')
  //   cy.get('[type="password"]').type('streamr')
  //   cy.get('button').click()

  //   cy.get('p').should('be.visible')
  //     .and('contain', 'Sorry, the username/password is incorrect. Please try again.')
  // })

  // it('Should see an invalid username/ password message if input an invalid password and click submit', () => {
  //   cy.get('[type="text"]').type('snoop_dogg')
  //   cy.get('[type="password"]').type('banana')
  //   cy.get('button').click()

  //   cy.get('p').should('be.visible')
  //     .and('contain', 'Sorry, the username/password is incorrect. Please try again.')
  // })

  // it('Should see an invalid username/ password message if username input is left empty and click submit', () => {
  //   cy.get('[type="password"]').type('streamr')
  //   cy.get('button').click()

  //   cy.get('p').should('be.visible')
  //     .and('contain', 'Sorry, the username/password is incorrect. Please try again.')
  // })

  // it('Should see an invalid username/ password message if password input is left empty and click submit', () => {
  //   cy.get('[type="text"]').type('snoop_dogg')
  //   cy.get('button').click()

  //   cy.get('p').should('be.visible')
  //     .and('contain', 'Sorry, the username/password is incorrect. Please try again.')
  // })

  // it('Should see an invalid username/ password message if password and username inputs are left empty and click submit', () => {
  //   cy.get('button').click()

  //   cy.get('p').should('be.visible')
  //     .and('contain', 'Sorry, the username/password is incorrect. Please try again.')
  // })

})