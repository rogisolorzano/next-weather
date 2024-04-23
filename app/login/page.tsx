import LoginForm from "@/components/login-form";
import Logo from "@/components/logo";
import { Container, Flex, Text } from "@radix-ui/themes";

export default function Login() {
  return (
    <main className="align-center flex h-screen items-center">
      <Container size="1" p="4">
        <Flex direction="column" gap="2" align="center">
          <Logo />
          <Text>Because guessing is overrated</Text>
        </Flex>
        <LoginForm />
      </Container>
    </main>
  );
}
