/**
 * Shared, non-React state for the hero orb. Written by DOM listeners and
 * ScrollTriggers, read every frame inside the R3F render loop, so nothing
 * here triggers React re-renders.
 */
export type OrbPalette = readonly [string, string, string];

export const ORB_PALETTES = {
  hero: ["#8a63a7", "#b5a2e1", "#f5efff"],
  projects: ["#6a4699", "#9e6eb6", "#e6dcfa"],
  responsible: ["#9e6eb6", "#bc90d1", "#fbeaff"],
  contact: ["#7b52b5", "#c2adeb", "#ffffff"],
} as const satisfies Record<string, OrbPalette>;

export type OrbPaletteName = keyof typeof ORB_PALETTES;

export const orbState = {
  /** Pointer in normalised device coords (-1..1). */
  pointer: { x: 0, y: 0, active: false },
  palette: "hero" as OrbPaletteName,
  /** Set by the canvas; requests a frame when rendering on demand. */
  invalidate: () => {},
};
