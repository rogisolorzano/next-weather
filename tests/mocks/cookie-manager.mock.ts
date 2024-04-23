import { CookieManager } from "@/lib/utils/use-cookies";

export const getCookieManagerMock = (): CookieManager => ({
  setCookie: jest.fn(),
  removeCookie: jest.fn(),
});
