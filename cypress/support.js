Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("input#email").type(email);
  cy.get("input#password").type(password);
  cy.get('button[type="submit"]').contains("Login").click();
  cy.contains("Add a city to get started").should("be.visible");
});
