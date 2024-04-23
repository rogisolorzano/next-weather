import { fireEvent, render } from "@testing-library/react";
import * as UseCookies from "@/lib/utils/use-cookies";
import * as Navigation from "next/navigation";
import LogoutButton from "./logout-button";
import { mocked } from "@/tests/utils/mocked";
import { getCookieManagerMock } from "@/tests/mocks/cookie-manager.mock";
import { LOGIN_ROUTE, SESSION_COOKIE_NAME } from "./constants";
import { getAppRouterMock } from "@/tests/mocks";

jest.mock("@/lib/utils/use-cookies");
jest.mock("next/navigation");
const useCookiesModule = mocked(UseCookies);
const navigationModule = mocked(Navigation);

describe("Feature: LogoutButton", () => {
  describe("Scenario: when the logout button is clicked", () => {
    const cookieManager = getCookieManagerMock();
    const mockRouter = getAppRouterMock();

    beforeAll(() => {
      useCookiesModule.useCookies.mockReturnValue(cookieManager);
      navigationModule.useRouter.mockReturnValue(mockRouter);
      const { getByRole } = render(<LogoutButton />);
      fireEvent.click(getByRole("button"));
    });

    test("It should remove the session cookie", () => {
      expect(cookieManager.removeCookie).toHaveBeenCalledWith(
        SESSION_COOKIE_NAME,
      );
    });

    test("It should navigate to the login route", () => {
      expect(mockRouter.push).toHaveBeenCalledWith(LOGIN_ROUTE);
    });
  });
});
