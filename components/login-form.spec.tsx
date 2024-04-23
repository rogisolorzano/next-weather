import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import * as UseCookies from "@/lib/hooks/use-cookies";
import * as Navigation from "next/navigation";
import { mocked } from "@/tests/utils/mocked";
import { getCookieManagerMock } from "@/tests/mocks/cookie-manager.mock";
import {
  AUTHENTICATED_LANDING_ROUTE,
  SESSION_COOKIE_NAME,
} from "../lib/constants";
import { getAppRouterMock } from "@/tests/mocks";
import LoginForm from "./login-form";

jest.mock("@/lib/hooks/use-cookies");
jest.mock("next/navigation");
const useCookiesModule = mocked(UseCookies);
const navigationModule = mocked(Navigation);
jest.useFakeTimers();

describe("Feature: LoginForm", () => {
  describe("Scenario: when a user logs in", () => {
    const cookieManager = getCookieManagerMock();
    const mockRouter = getAppRouterMock();

    beforeAll(async () => {
      useCookiesModule.useCookies.mockReturnValue(cookieManager);
      navigationModule.useRouter.mockReturnValue(mockRouter);
      render(<LoginForm />);

      const emailInput = screen.getByLabelText("E-mail");
      const passwordInput = screen.getByLabelText("Password");
      const submit = screen.getByRole("button");

      fireEvent.change(emailInput, {
        target: { value: "example@email.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "SomePassword" } });
      fireEvent.click(submit);
      await waitForElementToBeRemoved(() => screen.queryByText("Login"));
      jest.runAllTimers();
      await screen.findByText("Login");
    });

    test("It should remove the session cookie", async () => {
      expect(cookieManager.setCookie).toHaveBeenCalledWith(
        SESSION_COOKIE_NAME,
        "some-value",
        1800000,
      );
    });

    test("It should navigate to the login route", async () => {
      expect(mockRouter.push).toHaveBeenCalledWith(AUTHENTICATED_LANDING_ROUTE);
    });
  });

  describe("Scenario: when there is a validation error", () => {
    const cookieManager = getCookieManagerMock();
    const mockRouter = getAppRouterMock();

    beforeAll(async () => {
      useCookiesModule.useCookies.mockReturnValue(cookieManager);
      navigationModule.useRouter.mockReturnValue(mockRouter);
      render(<LoginForm />);

      const emailInput = screen.getByLabelText("E-mail");
      const submit = screen.getByRole("button");

      fireEvent.change(emailInput, {
        target: { value: "invalid-email" },
      });
      fireEvent.click(submit);
      await screen.findByText("Please enter a valid e-mail");
    });

    test("It should show an error message", () => {
      expect(
        screen.queryByText("Please enter a valid e-mail"),
      ).toBeInTheDocument();
    });

    test("It should not run side effects", () => {
      expect(cookieManager.setCookie).not.toHaveBeenCalled();
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });
});
