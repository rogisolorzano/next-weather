import { render, screen } from "@testing-library/react";
import Logo from "./logo";

describe("Feature: Logo", () => {
  describe("Scenario: when the logo is displayed", () => {
    beforeAll(() => {
      render(<Logo />);
    });

    test("It should render the logo", () => {
      expect(screen.queryByAltText("Weather Logo")).toBeInTheDocument();
    });
  });
});
