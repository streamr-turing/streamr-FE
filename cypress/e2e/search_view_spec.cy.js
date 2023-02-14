import { aliasQuery } from "../utilities/graphql-test-utils"

describe('Testing Search Page Header, Nav Bar, and Page Name', () => {
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

        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'shows')
            req.reply({
                fixture: 'search-view-shows-spongebob.json'
            })
        })
        cy.get('.search-input').type('spongebob')
        cy.get('.magnifying-glass-icon').click()
        cy.wait('@gqlshowsQuery')
    })

    it('Should show Streamr logo in the header', () => {
        cy.get('h1').eq(0).should('contain', 'Streamr')
        cy.get('img').eq(2).should('have.attr', 'src', '/static/media/tv.d1669fef910821b06ff5.png')
    })

    it('Should display page name', () => {
        cy.get('.search-title').should('contain', 'Search Results for "spongebob"')
    })

    it('Should display nav bar with logged in user\'s avatar, avatar name, search bar, magnifying glass, "home" link, and "My Watchlist" link', () => {
        cy.get('img').eq(0).should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/3940/3940414.png')
        cy.get('p').eq(0).should('contain', 'snoop_dogg')
        cy.get('.search-input').should('be.visible')
        cy.get('.magnifying-glass-icon').should('be.visible')
        cy.get('p').eq(1).should('contain', 'Home')
        cy.get('p').eq(2).should('contain', 'My Watchlist')
    })
})

describe('Testing Search Page With Show Results', () => {
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

        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'shows')
            req.reply({
                fixture: 'search-view-shows-spongebob.json'
            })
        })
    })
    
    it('Should show 4 Spongebob tv shows after searching for "spongebob" via magnifying glass button', () => {
        cy.get('.search-input').type('spongebob')
        cy.get('.magnifying-glass-icon').click()
        cy.wait('@gqlshowsQuery')

        cy.get('.tile-img').eq(0).should('have.attr', 'src', 'https://image.tmdb.org/t/p/w500//mgRUpjG9fjMgOmaGeHZR5tzbNYS.jpg')
        cy.get('.bookmark-tile').eq(0).should('have.attr', 'src', '/static/media/bookmark-false.736e6f0f5d2de776d6d4.png')

        cy.get('.tile-img').eq(1).should('have.attr', 'src', 'https://image.tmdb.org/t/p/w500//peZYB3aFOBoZbpFhOZogrTHVlqX.jpg')
        cy.get('.bookmark-tile').eq(1).should('have.attr', 'src', '/static/media/bookmark-false.736e6f0f5d2de776d6d4.png')

        cy.get('.tile-img').eq(2).should('have.attr', 'src', 'https://image.tmdb.org/t/p/w500//fxB8pHdIri8U1pcrEhIV4qh3Etv.jpg')
        cy.get('.bookmark-tile').eq(2).should('have.attr', 'src', '/static/media/bookmark-false.736e6f0f5d2de776d6d4.png')

        cy.get('.tile-img').eq(3).should('have.attr', 'src', 'https://image.tmdb.org/t/p/w500//ge8Vr33fiXgGBLZBGJJYjlFcW46.jpg')
        cy.get('.bookmark-tile').eq(3).should('have.attr', 'src', '/static/media/bookmark-false.736e6f0f5d2de776d6d4.png')
    })

    it('Should show 4 Spongebob tv shows after searching for "spongebob" via enter key', () => {
        cy.get('.search-input').type('spongebob{enter}')
        cy.wait('@gqlshowsQuery')

        cy.get('.tile-img').eq(0).should('have.attr', 'src', 'https://image.tmdb.org/t/p/w500//mgRUpjG9fjMgOmaGeHZR5tzbNYS.jpg')
        cy.get('.bookmark-tile').eq(0).should('have.attr', 'src', '/static/media/bookmark-false.736e6f0f5d2de776d6d4.png')

        cy.get('.tile-img').eq(1).should('have.attr', 'src', 'https://image.tmdb.org/t/p/w500//peZYB3aFOBoZbpFhOZogrTHVlqX.jpg')
        cy.get('.bookmark-tile').eq(1).should('have.attr', 'src', '/static/media/bookmark-false.736e6f0f5d2de776d6d4.png')

        cy.get('.tile-img').eq(2).should('have.attr', 'src', 'https://image.tmdb.org/t/p/w500//fxB8pHdIri8U1pcrEhIV4qh3Etv.jpg')
        cy.get('.bookmark-tile').eq(2).should('have.attr', 'src', '/static/media/bookmark-false.736e6f0f5d2de776d6d4.png')

        cy.get('.tile-img').eq(3).should('have.attr', 'src', 'https://image.tmdb.org/t/p/w500//ge8Vr33fiXgGBLZBGJJYjlFcW46.jpg')
        cy.get('.bookmark-tile').eq(3).should('have.attr', 'src', '/static/media/bookmark-false.736e6f0f5d2de776d6d4.png')
    })
})

describe('Testing Search Page With No Show Results', () => {
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

        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'shows')
            req.reply({
                fixture: 'search-view-shows-no-results.json'
            })
        })
        cy.get('.search-input').type('asdf')
        cy.get('.magnifying-glass-icon').click()
        cy.wait('@gqlshowsQuery')
    })

    it('Should show updated page name and "No results" message"', () => {
        cy.get('.search-title').should('contain', 'Search Results for "asdf"')
        cy.get('.shrug-img').should('be.visible')
        cy.get('h2').should('contain', 'No search results')
    })
})

describe('Testing Search Page Navigating to Detail View, Home View, and Watch List View', () => {
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

        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'shows')
            req.reply({
                fixture: 'search-view-shows-spongebob.json'
            })
        })
        cy.get('.search-input').type('spongebob')
        cy.get('.magnifying-glass-icon').click()
        cy.wait('@gqlshowsQuery')
    })
    
    it('Should navigate to Detail View', () => {
        cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
            aliasQuery(req, 'showDetails')
            req.reply({
                fixture: 'search-view-showDetails-spongebob.json'
            })
        })
        cy.get('.tile-img').eq(1).click()
        cy.wait('@gqlshowDetailsQuery')

        cy.get('.detail-title').should('contain', 'Kamp Koral: SpongeBob\'s Under Years (2021)')
    })

    it('Should navigate to Home View', () => {
        cy.get('p').eq(1).click()
        cy.get('.recommend-title').should('contain', 'Recommended By Friends')
    })

    it('Should navigate to Watch List View', () => {
        cy.get('p').eq(2).click()
        cy.get('.watch-list-title').should('contain', 'My Watch List')
    })
})