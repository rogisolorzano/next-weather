import { cn } from "@/lib/utils/cn";

export default function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("inline-block pb-1 text-md", className)} {...props}>
      {children}
    </label>
  );
}
