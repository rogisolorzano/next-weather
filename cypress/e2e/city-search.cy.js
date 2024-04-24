import {
  authResponse,
  autocompleteResponse,
  geocodeResponse,
} from "../fixtures/google-places-api";
import { weatherResponse } from "../fixtures/openweather";
import { wrapPlacesResponse } from "../lib/wrap-places-response";

describe("Feature: City Search", () => {
  before(() => {
    cy.intercept("**/AuthenticationService.Authenticate**", (request) =>
      wrapPlacesResponse(request, authResponse),
    ).as("auth");
    cy.intercept("**/AutocompletionService.GetPredictionsJson**", (request) =>
      wrapPlacesResponse(request, autocompleteResponse),
    ).as("predictions");
    cy.intercept("**/GeocodeService.Search**", (request) =>
      wrapPlacesResponse(request, geocodeResponse),
    ).as("geocode");
    cy.intercept("**/onecall**", (request) =>
      request.reply(weatherResponse),
    ).as("openweather");
    cy.login("example@email.com", "RandomPassword461");
  });

  describe("Scenario: when a user selects a city", () => {
    it("should add it to the list", () => {
      cy.get("button").contains("Search for a city").click();
      cy.get('input[placeholder="Search for a city..."]').type("Olathe");
      cy.wait("@auth");
      cy.wait("@predictions");
      cy.get("button").contains("Olathe, KS, USA").click();
      cy.wait("@geocode");
      cy.wait("@openweather");
      cy.contains("Olathe, KS, USA").should("be.visible");
      cy.contains("54°").should("be.visible");
      cy.contains("H: 71°").should("be.visible");
      cy.contains("L: 52°").should("be.visible");
      cy.contains("Clear").should("be.visible");
    });
  });
});
