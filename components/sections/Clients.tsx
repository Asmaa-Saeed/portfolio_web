import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClientsMap } from "./ClientsMap";
import { MAP_MARKERS } from "@/data/mapDots";

export function Clients() {
  return (
    <section id="clients" aria-labelledby="clients-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)] lg:items-center lg:gap-12">
          <div>
            <SectionHeading
              id="clients-title"
              title="Clients across five countries"
              description="Built from Egypt for teams in North Africa and the Middle East, where AI has to work in Arabic and English and earn trust fast."
            />
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-1">
              {MAP_MARKERS.map((m) => (
                <li key={m.code} className="flex items-center gap-3 border-b border-line/70 pb-3 text-sm">
                  <span
                    aria-hidden="true"
                    className={`size-2 rounded-full ${m.code === "EG" ? "bg-white" : "bg-accent-soft"}`}
                  />
                  <span className="text-text">{m.name}</span>
                  {m.code === "EG" && <span className="ml-auto text-xs text-faint">Home base</span>}
                </li>
              ))}
            </ul>
          </div>
          <ClientsMap />
        </div>
      </div>
    </section>
  );
}
