describe("Details Page", () => {

  beforeEach(() => {
    cy.intercept("POST", "https://streamr-be.herokuapp.com/graphql", req => {
      // switch (req.body.operationName) {
      //   case "users":
      //     req.alias = "users"
      //     req.reply(res => res.send({ fixture: "users.json" }))
      //     break
      // }
    })
  })
  it("should", () => {
    
    cy.visit("http://localhost:3000/")
  })
})