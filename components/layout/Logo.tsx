import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/avatar.png"
        alt=""
        width={36}
        height={36}
        className="size-9 rounded-full object-cover ring-2 ring-accent-soft/40"
      />
      <span className="font-display text-[15px] font-semibold tracking-tight text-text">Asmaa Sakr</span>
    </span>
  );
}
