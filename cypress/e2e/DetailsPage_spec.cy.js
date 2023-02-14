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