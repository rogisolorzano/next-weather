"use client";
import { useCookies } from "@/lib/utils/use-cookies";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { SESSION_COOKIE_NAME, LOGIN_ROUTE } from "./constants";

export default function LogoutButton() {
  const { removeCookie } = useCookies();
  const { push } = useRouter();

  const logout = () => {
    removeCookie(SESSION_COOKIE_NAME);
    push(LOGIN_ROUTE);
  };

  return (
    <Button onClick={logout}>
      <ExitIcon /> Logout
    </Button>
  );
}
