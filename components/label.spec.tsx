import { render, screen } from "@testing-library/react";
import Label from "./label";

describe("Feature: Label", () => {
  describe("Scenario: when a label is displayed", () => {
    beforeAll(() => {
      render(<Label htmlFor="field">Field name</Label>);
    });

    test("It should render the label", () => {
      expect(screen.queryByText("Field name")).toBeInTheDocument();
    });
  });
});
