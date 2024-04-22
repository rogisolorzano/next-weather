import { render, screen } from "@testing-library/react";
import HelloWorld from "./hello-world";

describe("Feature: HelloWorld", () => {
  describe("Scenario: component is rendered", () => {
    beforeAll(() => {
      render(<HelloWorld />);
    });

    test("It should say hello to the world!", () => {
      expect(screen.queryByText("Hello, world!")).toBeInTheDocument();
    });
  });

  describe("Scenario: component is rendered with class name", () => {
    const className = "my-class-name";
    let element: HTMLElement;

    beforeAll(() => {
      render(<HelloWorld className={className} />);
      element = screen.getByText("Hello, world!");
    });

    test("It should render with class name", () => {
      expect(element).toHaveClass(className);
    });
  });
});
