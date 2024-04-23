"use client";
import { useCookies } from "@/lib/hooks/use-cookies";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { SESSION_COOKIE_NAME, LOGIN_ROUTE } from "../lib/constants";
import { useLocationStore } from "@/lib/store/location/location";

export default function LogoutButton() {
  const { removeCookie } = useCookies();
  const { push } = useRouter();
  const { clear } = useLocationStore();

  const logout = () => {
    clear();
    removeCookie(SESSION_COOKIE_NAME);
    push(LOGIN_ROUTE);
  };

  return (
    <Button onClick={logout}>
      <ExitIcon /> Logout
    </Button>
  );
}
