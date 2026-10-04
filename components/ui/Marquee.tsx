import type { ReactNode } from "react";

/** Infinite horizontal loop. Content is duplicated once for a seamless wrap. */
export function Marquee({ children, duration = 40 }: { children: ReactNode; duration?: number }) {
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div
        className="flex w-max shrink-0 group-hover:[animation-play-state:paused] motion-reduce:!animate-none"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
