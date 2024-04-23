import { fireEvent, render } from "@testing-library/react";
import * as UseCookies from "@/lib/hooks/use-cookies";
import * as Navigation from "next/navigation";
import * as LocationStore from "@/lib/store/location/location";
import LogoutButton from "./logout-button";
import { mocked } from "@/tests/utils/mocked";
import { LOGIN_ROUTE, SESSION_COOKIE_NAME } from "../lib/constants";
import {
  getAppRouterMock,
  getLocationStoreMock,
  getCookieManagerMock,
} from "@/tests/mocks";

jest.mock("next/navigation");
jest.mock("@/lib/hooks/use-cookies");
jest.mock("@/lib/store/location/location");
const navigationModule = mocked(Navigation);
const useCookiesModule = mocked(UseCookies);
const locationStoreModule = mocked(LocationStore);

describe("Feature: LogoutButton", () => {
  describe("Scenario: when the logout button is clicked", () => {
    const cookieManager = getCookieManagerMock();
    const mockRouter = getAppRouterMock();
    const mockLocationStore = getLocationStoreMock();

    beforeAll(() => {
      useCookiesModule.useCookies.mockReturnValue(cookieManager);
      navigationModule.useRouter.mockReturnValue(mockRouter);
      locationStoreModule.useLocationStore.mockReturnValueOnce(
        mockLocationStore,
      );
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

    test("It should clear the location store", () => {
      expect(mockLocationStore.clear).toHaveBeenCalled();
    });
  });
});
