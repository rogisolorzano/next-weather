import Header from "@/components/header";
import LocationList from "@/components/location-list";
import { Container, Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <main>
      <Container size="4" p="4">
        <Flex direction="column" gap="4">
          <Header />
          <LocationList />
        </Flex>
      </Container>
    </main>
  );
}
