import "@fontsource/noto-sans-malayalam/malayalam-600.css";
import "@fontsource/noto-sans-malayalam/malayalam-800.css";
import "@fontsource/noto-sans-malayalam/latin-600.css";
import "@fontsource/noto-sans-malayalam/latin-800.css";
import "@fontsource/baloo-chettan-2/malayalam-800.css";
import "@fontsource/baloo-chettan-2/latin-800.css";
import { Easing, interpolate, random } from "remotion";

export const FPS = 30;
export const DURATION_SEC = 50;
export const W = 1080;
export const H = 1920;

export const NAVY = "#081B33";
export const GOLD = "#D4AF37";
export const GOLD_LIGHT = "#F3D77A";
export const WHITE = "#FFFFFF";

/** Subtitles / body: Noto Sans Malayalam. Comic display: Baloo Chettan 2. */
export const SUB_FONT = '"Noto Sans Malayalam", sans-serif';
export const DISPLAY_FONT = '"Baloo Chettan 2", "Noto Sans Malayalam", sans-serif';

export const f = (sec: number) => Math.round(sec * FPS);

/** Clamped interpolate over seconds with optional easing. */
export const tween = (
  frame: number,
  [s0, s1]: [number, number],
  [v0, v1]: [number, number],
  ease: (t: number) => number = Easing.inOut(Easing.cubic),
) => interpolate(frame, [f(s0), f(s1)], [v0, v1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

/** Multi-key tween: keys = [[sec, value], ...] */
export const keys = (frame: number, k: [number, number][], ease = Easing.inOut(Easing.cubic)) => {
  if (frame <= f(k[0][0])) return k[0][1];
  for (let i = 0; i < k.length - 1; i++) {
    if (frame <= f(k[i + 1][0])) return tween(frame, [k[i][0], k[i + 1][0]], [k[i][1], k[i + 1][1]], ease);
  }
  return k[k.length - 1][1];
};

/** Natural blink: ~4-frame close every 2.5-4s, deterministic per seed. */
export const blinkAmount = (frame: number, seed: string) => {
  const period = 80 + Math.floor(random(seed) * 40);
  const ph = (frame + Math.floor(random(seed + "o") * period)) % period;
  return ph < 2 ? 1 - ph * 0.5 : ph < 4 ? (ph - 2) * 0.5 : 1; // 1 = open, 0 = closed
};

/** Pseudo lip-sync: 0..1 mouth openness that changes every ~3 frames while talking. */
export const mouthOpen = (frame: number, talking: boolean, seed: string) => {
  if (!talking) return 0;
  const k = Math.floor(frame / 3);
  const a = random(`${seed}-${k}`);
  const b = random(`${seed}-${k + 1}`);
  const t = (frame % 3) / 3;
  const v = a + (b - a) * t;
  return v < 0.2 ? 0.1 : v;
};
