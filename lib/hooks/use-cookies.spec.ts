import { renderHook } from "@testing-library/react";
import { useCookies } from "./use-cookies";

describe("Feature: useCookies", () => {
  Object.defineProperty(document, "cookie", {
    writable: true,
    value: "",
  });

  describe("Scenario: when a cookie is set", () => {
    beforeAll(() => {
      const { result } = renderHook(() => useCookies());
      result.current.setCookie("session", "example", 3600);
    });

    test("It should set the cookie", () => {
      expect(document.cookie).toEqual(
        "session=example; path=/; max-age=3600; Secure",
      );
    });
  });

  describe("Scenario: when a cookie is deleted", () => {
    beforeAll(() => {
      const { result } = renderHook(() => useCookies());
      result.current.removeCookie("session");
    });

    test("It should expire the cookie", () => {
      expect(document.cookie).toEqual(
        "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;",
      );
    });
  });
});
