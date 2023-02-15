import { aliasQuery } from "../utilities/graphql-test-utils"

describe('Testing Loading Message', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'users')
            req.reply({
                fixture: 'login-users.json'
            })
        })
        cy.visit('http://localhost:3000/')
        cy.wait('@gqlusersQuery')

        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'fetchUser')
            req.reply({
                fixture: 'home-view-currentUser-recommendations.json'
            })
        })
        cy.get('[type="text"]').type('snoop_dogg')
        cy.get('[type="password"]').type('streamr')
        cy.get('button').click()
        cy.wait('@gqlfetchUserQuery')
    })

    it('Should show "Loading..." message after clicking on show poster to Detail View', () => {
        // cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
        //     aliasQuery(req, 'showDetails')
        //     req.reply({
        //         fixture: 'home-view-showDetails-30Rock.json'
        //     })
        // })
        // cy.get('.poster-img').eq(0).click()
        // cy.wait('@gqlshowDetailsQuery')
        // cy.get('.detail-title').should('contain', '30 Rock (2006)')

        it('Should show "Loading..." message after clicking on show poster to Detail View', () => {
            cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
                aliasQuery(req, 'showDetails')
                req.reply((res) => {
                    res.sendDelay = 5000 // Set the response delay to 2 seconds
                    res.send({
                        fixture: 'home-view-showDetails-30Rock.json'
                    })
                })
            })

            cy.get('.poster-img').eq(0).click()
            cy.wait('@gqlshowDetailsQuery')
            cy.get('.detail-title').should('contain', '30 Rock (2006)')
        })

    })
})