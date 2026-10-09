import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent px-6 py-3 text-sm text-white hover:bg-accent-deep shadow-[0_8px_30px_-12px_rgba(123,82,181,0.7)]",
  outline:
    "border border-accent/45 px-6 py-3 text-sm text-text hover:border-accent-soft hover:bg-accent/10",
  ghost: "px-3 py-2 text-sm text-muted hover:text-text",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant; children: ReactNode };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />;
}

type LinkProps = ComponentPropsWithoutRef<"a"> & { variant?: Variant; children: ReactNode };

export function ButtonLink({ variant = "primary", className = "", ...props }: LinkProps) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
