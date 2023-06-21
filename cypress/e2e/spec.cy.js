describe("Login", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("API_URL")}/auth/login`, {
      email: Cypress.env("USERNAME"),
      password: Cypress.env("PASSWORD"),
      keepMeLoggedIn: true,
    }).then((res) => {
      cy.setCookie(
        "interior-service-admin-auth",
        res.body.data.tokens.accessToken
      );
    });
  });

  it("Login to Admin", () => {
    cy.visit(Cypress.env("APP_URL"));
  });

  it("Login to Admin Products", () => {
    cy.visit(Cypress.env("APP_URL") + "/masters/products");
  });
});
