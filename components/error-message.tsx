import { cn } from "@/lib/utils/cn";

export default function ErrorMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("pt-1 text-sm text-red-700", className)} {...props}>
      {children}
    </p>
  );
}
