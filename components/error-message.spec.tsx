import { render, screen } from "@testing-library/react";
import ErrorMessage from "./error-message";

describe("Feature: ErrorMessage", () => {
  describe("Scenario: when a message is displayed", () => {
    beforeAll(() => {
      render(<ErrorMessage>Password is required</ErrorMessage>);
    });

    test("It should render the message", () => {
      expect(screen.queryByText("Password is required")).toBeInTheDocument();
    });
  });
});
