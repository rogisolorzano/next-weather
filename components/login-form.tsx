"use client";
import { Button, TextField, Flex } from "@radix-ui/themes";
import Label from "./label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "./error-message";
import { useCookies } from "@/lib/hooks/use-cookies";
import { useRouter } from "next/navigation";
import { wait } from "../lib/utils/wait";
import { useState } from "react";
import { SESSION_COOKIE_NAME, AUTHENTICATED_LANDING_ROUTE } from "../lib/constants";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid e-mail")
      .required("E-mail is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { setCookie } = useCookies();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(schema) });
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (_: LoginFormValues) => {
    // Note: auth is not implemented, this is not secure. In the real world we
    // would do something like set the tokens in an HttpOnly cookie server-side
    setLoggingIn(true);
    await wait(600);
    const thirtyMinutes = 30 * 60 * 1000;
    setCookie(SESSION_COOKIE_NAME, "some-value", thirtyMinutes);
    setLoggingIn(false);
    push(AUTHENTICATED_LANDING_ROUTE);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} noValidate>
      <Flex py="4" gap="4" direction="column">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <TextField.Root id="email" type="email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <TextField.Root
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <Button type="submit" loading={loggingIn}>
          Login
        </Button>
      </Flex>
    </form>
  );
}
