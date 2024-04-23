import { wait } from "./wait";

describe("Feature: Waiting", () => {
  describe("Scenario: when wait is used", () => {
    test("It should resolve", async () => {
      expect(wait(1)).resolves.toBeTruthy();
    });
  });
});
