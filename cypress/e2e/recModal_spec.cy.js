import { aliasQuery, aliasBadQuery, aliasMutation } from "../utilities/graphql-test-utils"

describe('Testing Recommendation Modal', () => {

    beforeEach(() => {
        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'users')
            req.reply({
              fixture: 'recModal-users.json'
            })
          })
          cy.visit('http://localhost:3000/')
          cy.wait('@gqlusersQuery')
      
          cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'fetchUser')
            req.reply({
              fixture: 'recModal-currentUser.json'
            })
          })
          cy.get('[type="text"]').type('snoop_dogg')
          cy.get('[type="password"]').type('streamr')
          cy.get('button').click()
          cy.wait('@gqlfetchUserQuery')
          cy.get('#watchlist-button > p').click()
          cy.get(':nth-child(2) > .watch-list-poster-and-info > .watch-list-card-info > .watch-list-title-and-share-container > .share-button').click()
    })

    it('Should display all user\'s friends with associated checkboxes', () => {

        cy.get('.friend-list').should('be.visible')
        cy.get('.friend-list > :nth-child(1)').should('be.visible')
        cy.get(':nth-child(1) > .label').should('be.visible')
        .and('contain', 'martha_stewart')
        cy.get('form').find('[value="2"]').should('be.visible')
        cy.get('.friend-list > :nth-child(2)').should('be.visible')
        cy.get(':nth-child(2) > .label').should('be.visible')
        .and('contain', 'james-white-rules')
        cy.get('form').find('[value="3"]').should('be.visible')
        cy.get('.friend-list > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(3) > .label').should('be.visible')
        .and('contain', 'sean_not_shaun')
        cy.get('form').find('[value="4"]').should('be.visible')
        cy.get('.friend-list > :nth-child(4)').should('be.visible')
        cy.get(':nth-child(4) > .label').should('be.visible')
        .and('contain', 'the_burger_king')
        cy.get('form').find('[value="5"]').should('be.visible')
    })

    it('Should display send recommendation modal when user clicks share button', () => {

        cy.get('.modalContainer').should('be.visible')
        cy.get('[data-cy="recc-modal"]').should('be.visible')

    })

    it('Should be able to check all checkboxes', () => {

        cy.get('[type="checkbox"]').check('2')
        cy.get('[type="checkbox"]').check('3')
        cy.get('[type="checkbox"]').check('4')
        cy.get('[type="checkbox"]').check('5')

    })

    it('Should be able to uncheck checked checkboxes', () => {

        cy.get('[type="checkbox"]').check('2')
        cy.get('[type="checkbox"]').uncheck('2')
        cy.get('[type="checkbox"]').check('3')
        cy.get('[type="checkbox"]').uncheck('3')
        cy.get('[type="checkbox"]').check('4')
        cy.get('[type="checkbox"]').uncheck('4')
        cy.get('[type="checkbox"]').check('5')
        cy.get('[type="checkbox"]').uncheck('5')

    })

    it('Should be able to close out of Modal by clicking the X button at the top of the Modal', () => {
        cy.get('.modalContainer').should('exist')
        cy.get('.titleCloseBtn').click()
        cy.get('.modalContainer').should('not.exist')
    })

    it('Should be able to check a friend checkbox, click send button, and a sent message will appear and then disappear after 1000ms if recommendation was sent', () => {
        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasMutation(req, 'createRecommendation')
            req.reply({
              fixture: 'recModal-createRecommendation-sean.json'
            })
          })
        cy.get('[type="checkbox"]').check('4')
        cy.get('.body > button').click()
        cy.wait('@gqlcreateRecommendationMutation')
        cy.get('.sent-container').should('be.visible')
        cy.get('.sent-text').should('be.visible')
        cy.get('.sent-container', { timeout: 1500 }).should('not.exist')
        cy.get('.sent-text', { timeout: 1500 }).should('not.exist')
    })

    it('Should be able to check a friend checkbox, click send button, and a failed message will appear and then disappear after 1500ms if recommendation failed to send', () => {
      cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
          aliasMutation(req, 'createRecommendation')
          req.reply({
            fixture: 'bad-response.json'
          })
        })
      cy.get('[type="checkbox"]').check('4')
      cy.get('.body > button').click()
      cy.wait('@gqlcreateRecommendationMutation')
      cy.get('.failed-container').should('be.visible')
      cy.get('.failed-text').should('be.visible')
      cy.get('.failed-container', { timeout: 1500 }).should('not.exist')
      cy.get('.failed-text', { timeout: 1500 }).should('not.exist')
  })

  })

  describe('Testing that the send recommendations modal displays when clicking the share button from different page views', () => {

    beforeEach(() => {
        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'users')
            req.reply({
              fixture: 'recModal-users.json'
            })
          })
          cy.visit('http://localhost:3000/')
          cy.wait('@gqlusersQuery')
      
          cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'fetchUser')
            req.reply({
              fixture: 'recModal-currentUser.json'
            })
          })
          cy.get('[type="text"]').type('snoop_dogg')
          cy.get('[type="password"]').type('streamr')
          cy.get('button').click()
          cy.wait('@gqlfetchUserQuery')
 
    })

    it('Should display send recommendation modal when user clicks share button on Watchlist View', () => {
        cy.get('#watchlist-button > p').click()
        cy.get(':nth-child(2) > .watch-list-poster-and-info > .watch-list-card-info > .watch-list-title-and-share-container > .share-button').click()

        cy.get('.modalContainer').should('be.visible')
        cy.get('[data-cy="recc-modal"]').should('be.visible')

    })

    it('Should display send recommendation modal when user clicks share button on Details View', () => {
        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'showDetails')
            req.reply({
              fixture: 'recModal-showDetails-30Rock.json'
            })
        })
        cy.get(':nth-child(2) > :nth-child(3) > .recommendee-card-container > .clickable-poster > .poster-img').click()
        cy.wait('@gqlshowDetailsQuery')
        cy.get('[data-cy="open-modal"]').click()

        cy.get('.modalContainer').should('be.visible')
        cy.get('[data-cy="recc-modal"]').should('be.visible')

    })

  })

  describe('Testing send recommendation Modal display when user has no other users to send to', () => {

    beforeEach(() => {
        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'users')
            req.reply({
              fixture: 'recModal-users-only-one.json'
            })
          })
          cy.visit('http://localhost:3000/')
          cy.wait('@gqlusersQuery')
      
          cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'fetchUser')
            req.reply({
              fixture: 'recModal-currentUser.json'
            })
          })
          cy.get('[type="text"]').type('snoop_dogg')
          cy.get('[type="password"]').type('streamr')
          cy.get('button').click()
          cy.wait('@gqlfetchUserQuery')
          cy.get('#watchlist-button > p').click()
          cy.get(':nth-child(2) > .watch-list-poster-and-info > .watch-list-card-info > .watch-list-title-and-share-container > .share-button').click()
 
    })

    it('Should display "Add Some Friends!" message on the Modal View if the user does not have any users to send recommendations to', () => {
        cy.get('.modalContainer').should('be.visible')
        cy.get('[data-cy="recc-modal"]').should('be.visible')
        cy.get('.friend-list > p').should('be.visible')
        .and('contain', 'Add some friends!')
        cy.get('.titleCloseBtn').click()
        cy.get('.modalContainer').should('not.exist')

    })

    it('Should be able to close out of Modal with "Add some friends" message by clicking the X button', () => {
        cy.get('.modalContainer').should('be.visible')
        cy.get('[data-cy="recc-modal"]').should('be.visible')
        cy.get('.friend-list > p').should('be.visible')
        .and('contain', 'Add some friends!')
        cy.get('.titleCloseBtn').click()
        cy.get('.modalContainer').should('not.exist')

    })

  })


  // describe("RecModal (bad response)", () => {
  //   beforeEach(() => {
  //     cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
  //       switch (req.body.operationName) {
  //         case "users":
  //           aliasQuery(req, "users")
  //           req.reply({ fixture: "login-users.json" })
  //           break
  //         case "fetchUser":
  //           aliasQuery(req, "fetchUser")
  //           req.reply({ fixture: "recModal-currentUser.json" })
  //           break
  //         case "showDetails":
  //           aliasQuery(req, "showDetails")
  //           req.reply({ fixture: "recModal-showDetails-30Rock.json" })
  //           break
  //       }
  //     })
  //     cy.visit("http://localhost:3000/")
  //     cy.wait("@gqlusersQuery")
  //     cy.get('[type="text"]').type("snoop_dogg")
  //     cy.get('[type="password"]').type("streamr")
  //     cy.get("button").click()
  //     cy.wait("@gqlfetchUserQuery")
  //     cy.get(':nth-child(1) > :nth-child(3) > .recommendee-card-container > .clickable-poster > .poster-img').click()
  //     cy.wait("@gqlshowDetailsQuery")
  //     cy.get('[data-cy="open-modal"]').click()


  //   })
  
  //   it.only("should not show a table row for streaming providers if there are none available", () => {
  //     cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
  //       aliasQuery(req, 'allUsers')
  //       req.reply({
  //         fixture: 'bad-response.json'
  //       })
  //     })
  //     cy.wait('@gqlallUsersQuery')
      
  //   })
  // })