import Image from "next/image";

export default function Logo() {
  return (
    <Image src="/weather-logo.svg" alt="Weather Logo" width={180} height={36} />
  );
}
