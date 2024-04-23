import { Container, Flex } from "@radix-ui/themes";
import Logo from "./logo";
import LogoutButton from "./logout-button";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <Container size="4" p="4">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Logo />
          <Flex gapX="2">
            <SearchBar className="hidden sm:block" />
            <LogoutButton />
          </Flex>
        </Flex>
        <SearchBar className="flex w-full sm:hidden" fullWidth />
      </Flex>
    </Container>
  );
}
