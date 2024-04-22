import HelloWorld from "@/components/hello-world";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-4">
      <Image
        src="/weather-logo.svg"
        alt="Weather Logo"
        width={180}
        height={36}
      />
      <HelloWorld className="p-4 text-blue-700" />
    </main>
  );
}
