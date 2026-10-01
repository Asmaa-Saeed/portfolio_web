export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent-soft to-accent-deep font-display text-[13px] font-bold text-white"
      >
        AS
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-text">Asmaa Sakr</span>
    </span>
  );
}
