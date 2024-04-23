"use client";
import { useCallback } from "react";

type Milliseconds = number;

export interface CookieManager {
  setCookie: (name: string, value: string, ttl: Milliseconds) => void;
  removeCookie: (name: string) => void;
}

export const useCookies = (): CookieManager => {
  const setCookie = useCallback(
    (name: string, value: string, ttl: Milliseconds) => {
      document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${ttl}; Secure`;
    },
    [],
  );

  const removeCookie = useCallback((name: string) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  }, []);

  return { setCookie, removeCookie };
};
