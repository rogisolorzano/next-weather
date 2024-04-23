import HelloWorld from "@/components/hello-world";
import Logo from "@/components/logo";
import LogoutButton from "@/components/logout-button";

export default function Home() {
  return (
    <main className="p-4">
      <Logo />
      <HelloWorld className="p-4 text-blue-700" />
      <LogoutButton />
    </main>
  );
}
