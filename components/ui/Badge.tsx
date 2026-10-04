import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/12 px-3 py-1 text-xs font-medium text-accent-soft">
      <span className="size-1.5 rounded-full bg-accent-soft" aria-hidden="true" />
      {children}
    </span>
  );
}
