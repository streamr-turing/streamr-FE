import { aliasQuery } from "../utilities/graphql-test-utils"

describe("Details Page", () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
      switch (req.body.operationName) {
        case "users":
          aliasQuery(req, "users")
          req.reply({ fixture: "login-users.json" })
          break
        case "fetchUser":
          aliasQuery(req, "fetchUser")
          req.reply({ fixture: "DetailsPage-currentUser.json" })
          break
        case "showDetails":
          aliasQuery(req, "showDetails")
          req.reply({ fixture: "DetailsPage-showDetails.json" })
          break
      }
    })
    cy.visit("http://localhost:3000/")
    cy.wait("@gqlusersQuery")
    cy.get('[type="text"]').type("snoop_dogg")
    cy.get('[type="password"]').type("streamr")
    cy.get("button").click()
    cy.wait("@gqlfetchUserQuery")
    cy.get(".home-container a").first().click()
    cy.wait("@gqlshowDetailsQuery")
  })

  it("should display the correct show data", () => {
    cy.getByData("poster").invoke("attr", "src").should("eq", "https://image.tmdb.org/t/p/w500/k3RbNzPEPW0cmkfkn1xVCTk3Qde.jpg")
    cy.getByData("details-title").should("have.text", "30 Rock (2006)")
    cy.getByData("provider-icons").find("img").should("have.length", 2)
      .first().invoke("attr", "src").should("eq", "https://image.tmdb.org/t/p/w500/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg")
    cy.getByData("provider-icons").find("img").last().invoke("attr", "src").should("eq", "https://image.tmdb.org/t/p/w500/xTHltMrZPAJFLQ6qyCBjAnXSmZt.jpg")
    cy.getByData("genres").should("have.text", "Comedy, Another Genre")
    cy.getByData("rating").should("have.text", "7/10 ⭐️")
    cy.getByData("summary").should("have.text", "Liz Lemon, the head writer for a late-night TV variety show in New York, tries to juggle all the egos around her while chasing her own dream.")
  })

  it("should display the correct recommenders", () => {
    cy.getByData("avatars-container").find('[data-cy=avatar-container]').should("have.length", 3)
    cy.getByData("avatars-container").find("img").eq(0).invoke("attr", "src").should("eq", "https://cdn-icons-png.flaticon.com/512/3940/3940448.png")
    cy.getByData("avatars-container").find("p").eq(0).should("have.text", "martha_stewart")
    cy.getByData("avatars-container").find("img").eq(1).invoke("attr", "src").should("eq", "https://cdn-icons-png.flaticon.com/512/3940/3940405.png")
    cy.getByData("avatars-container").find("p").eq(1).should("have.text", "james-white-rules")
    cy.getByData("recc-container").contains("and other friends")
  })

  it("should be able to open the \"send recommendation\" modal", () => {
    cy.getByData("open-modal").click()
    cy.getByData("recc-modal").should("be.visible")
  })
})

describe("Details Page (missing data)", () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
      switch (req.body.operationName) {
        case "users":
          aliasQuery(req, "users")
          req.reply({ fixture: "login-users.json" })
          break
        case "fetchUser":
          aliasQuery(req, "fetchUser")
          req.reply({ fixture: "DetailsPage-currentUser.json" })
          break
        case "showDetails":
          aliasQuery(req, "showDetails")
          req.reply({ fixture: "DetailsPage-showDetails-missing.json" })
          break
      }
    })
    cy.visit("http://localhost:3000/")
    cy.wait("@gqlusersQuery")
    cy.get('[type="text"]').type("snoop_dogg")
    cy.get('[type="password"]').type("streamr")
    cy.get("button").click()
    cy.wait("@gqlfetchUserQuery")
    cy.get(".home-container a").first().click()
    cy.wait("@gqlshowDetailsQuery")
  })

  it("should not show a table row for streaming providers if there are none available", () => {
    cy.getByData("provider-icons").should("not.exist")
  })

  it("should not try to show the list of recommenders if there are none", () => {
    cy.getByData("recc-container").should("not.contain", "Recommended by Friends:")
  })
})

describe("Details Page (bad response)", () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
      switch (req.body.operationName) {
        case "users":
          aliasQuery(req, "users")
          req.reply({ fixture: "login-users.json" })
          break
        case "fetchUser":
          aliasQuery(req, "fetchUser")
          req.reply({ fixture: "DetailsPage-currentUser.json" })
          break
        case "showDetails":
          aliasQuery(req, "showDetails")
          req.reply({ fixture: "bad-response.json" })
          break
      }
    })
    cy.visit("http://localhost:3000/")
    cy.wait("@gqlusersQuery")
    cy.get('[type="text"]').type("snoop_dogg")
    cy.get('[type="password"]').type("streamr")
    cy.get("button").click()
    cy.wait("@gqlfetchUserQuery")
    cy.get(".home-container a").first().click()
    cy.wait("@gqlshowDetailsQuery")
  })

  it("should not show a table row for streaming providers if there are none available", () => {
    cy.url().should("eq", "http://localhost:3000/error")
  })

})
describe('Testing Details Page Navigation to Home View, Search View, and Watch List View', () => {
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
      aliasQuery(req, 'showDetails')
      req.reply({
        fixture: 'home-view-showDetails-30Rock.json'
      })
    })
    cy.get('.poster-img').eq(0).click()
    cy.wait('@gqlshowDetailsQuery')
  })

  it('Should navigate to Home View after clicking on "Home" link', () => {
    cy.get('p').eq(1).click()
    cy.get('.recommend-title').should('contain', 'Recommended By Friends')
  })

  it('Should navigate to Search View after entering show title in search bar via clicking magnifying glass button', () => {
    cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'shows')
      req.reply({
        fixture: 'home-view-shows-KingOfQueens.json'
      })
    })
    cy.get('.search-input').type('king of queens')
    cy.get('.magnifying-glass-icon').click()
    cy.wait('@gqlshowsQuery')
    cy.get('.search-title').should('contain', 'Search Results for "king of queens"')
  })

  it('Should navigate to Search View after entering show title in search bar via pressing enter', () => {
    cy.intercept('POST', 'https://streamr-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'shows')
      req.reply({
        fixture: 'home-view-shows-KingOfQueens.json'
      })
    })
    cy.get('.search-input').type('king of queens{enter}')
    cy.wait('@gqlshowsQuery')
    cy.get('.search-title').should('contain', 'Search Results for "king of queens"')
  })

  it('Should navigate to Watch List View after clicking "Watchlist"', () => {
    cy.get('p').eq(2).click()
    cy.get('.watch-list-title').should('contain', 'My Watch List')
  })
})