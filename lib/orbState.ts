/**
 * Shared, non-React state for the hero orb. Written by DOM listeners and
 * ScrollTriggers, read every frame inside the R3F render loop, so nothing
 * here triggers React re-renders.
 */
export type OrbPalette = readonly [string, string, string];

export const ORB_PALETTES = {
  hero: ["#8b5cf6", "#c4b5fd", "#f5f3ff"],
  projects: ["#6366f1", "#a78bfa", "#e0e7ff"],
  responsible: ["#d946ef", "#a78bfa", "#fce7f3"],
  contact: ["#7c3aed", "#d8b4fe", "#ffffff"],
} as const satisfies Record<string, OrbPalette>;

export type OrbPaletteName = keyof typeof ORB_PALETTES;

export const orbState = {
  /** Pointer in normalised device coords (-1..1). */
  pointer: { x: 0, y: 0, active: false },
  palette: "hero" as OrbPaletteName,
  /** Set by the canvas; requests a frame when rendering on demand. */
  invalidate: () => {},
};
