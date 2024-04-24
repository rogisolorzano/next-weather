describe("Feature: Login", () => {
  describe("Scenario: when the user logs in", () => {
    it("should login", () => {
      cy.login("example@email.com", "RandomPassword461");
    });
  });
});
