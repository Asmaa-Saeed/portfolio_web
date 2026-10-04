/** Pure-CSS stand-in shown while the WebGL orb loads, or if WebGL fails. */
export function OrbFallback({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="relative aspect-square w-[min(44vh,78vw)]">
        <div className="orb-fallback absolute inset-0 rounded-full" />
        <div className="absolute inset-[-18%] rounded-full border border-accent/15" />
        <div className="absolute inset-[-34%] rounded-full border border-accent/10" />
      </div>
    </div>
  );
}
