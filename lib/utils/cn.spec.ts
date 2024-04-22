import { cn } from "./cn";

describe("Feature: Class Name Merging", () => {
  describe("Scenario: when class names are provided", () => {
    test("It should merge class names", () => {
      expect(cn("pt-4", "mb-2")).toBe("pt-4 mb-2");
    });
  });

  describe("Scenario: when an object with disabled class names is provided", () => {
    test("It should merge enabled class names", () => {
      expect(
        cn({
          "p-4": true,
          "bg-blue-700": false,
          "bg-red-300": true,
          "shadow-md": false,
        }),
      ).toBe("p-4 bg-red-300");
    });
  });
});
