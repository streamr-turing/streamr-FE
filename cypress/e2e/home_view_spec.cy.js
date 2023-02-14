import { aliasQuery } from "../utilities/graphql-test-utils"

describe('Testing Home Page', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'users')
            req.reply({
                fixture: 'login.json'
            })
        })
        cy.visit('http://localhost:3000/')
        cy.wait('@gqlusersQuery')

        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'fetchUser')
            req.reply({
                fixture: 'currentUser.json'
            })
        })
        cy.get('[type="text"]').type('snoop_dogg')
        cy.get('[type="password"]').type('streamr')
        cy.get('button').click()
        cy.wait('@gqlfetchUserQuery')
    })

    it('Should display main with page name and display timeline feed with recommended shows', () => {
        cy.get('.recommend-title').should('contain', 'Recommended By Friends')
        cy.get('.recommender-avatar').eq(0).should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/3940/3940421.png')
    })
})