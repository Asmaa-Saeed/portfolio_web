import { ImageResponse } from "next/og";

export const alt = "Asmaa Sakr, AI Automation Engineer & Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const dots = Array.from({ length: 220 }, (_, i) => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const y = 1 - (i / 219) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    const x = Math.cos(t) * r;
    const z = Math.sin(t) * r;
    return { x: 900 + x * 190, y: 315 + y * 190, o: 0.25 + (z + 1) * 0.37, s: 3 + (z + 1) * 2 };
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 75% 50%, #3b2457 0%, #0e0a15 55%)",
          color: "#f3eefa",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.s,
              height: d.s,
              borderRadius: 999,
              background: "#c2adeb",
              opacity: d.o,
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 720 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(138,99,167,0.22)",
              color: "#c2adeb",
              fontSize: 24,
            }}
          >
            AI Automation Engineer &amp; Web Developer
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, marginTop: 28, letterSpacing: -2 }}>Asmaa Sakr</div>
          <div style={{ fontSize: 38, color: "#bc90d1", marginTop: 12 }}>Building AI we can trust.</div>
        </div>
      </div>
    ),
    size,
  );
}
