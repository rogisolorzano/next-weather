import { cn } from "@/lib/utils/cn";

export default function HelloWorld({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-lg", className)} {...props}>
      Hello, world!
    </p>
  );
}
