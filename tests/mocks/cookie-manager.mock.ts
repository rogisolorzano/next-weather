import { CookieManager } from "@/lib/hooks/use-cookies";

export const getCookieManagerMock = (): CookieManager => ({
  setCookie: jest.fn(),
  removeCookie: jest.fn(),
});
