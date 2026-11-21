import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LINES, SPEAKER_LABEL } from "../script";
import { f, GOLD, NAVY, SUB_FONT, WHITE } from "../theme";

/**
 * One subtitle at a time, bottom-anchored inside the Reels safe zone
 * (bottom edge at y=1640 leaves ~280px for IG/TikTok UI). Grows upward, max width 960.
 */
export const Subtitles: React.FC<{ hideAfterSec?: number }> = ({ hideAfterSec = 99 }) => {
  const frame = useCurrentFrame(); // global
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const line = LINES.find((l) => sec >= l.at - 0.1 && sec <= l.end + 0.25);
  if (!line || sec > hideAfterSec) return null;
  const inP = spring({ frame: frame - f(line.at - 0.1), fps, config: { damping: 18 } });
  const out = interpolate(frame, [f(line.end + 0.1), f(line.end + 0.25)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sheru = line.who === "sheru";
  return (
    <div style={{ position: "absolute", left: 60, right: 60, bottom: 280, display: "flex", flexDirection: "column", alignItems: "center",
      opacity: Math.min(inP, out), transform: `translateY(${(1 - inP) * 30}px)` }}>
      <div style={{ fontFamily: SUB_FONT, fontWeight: 800, fontSize: 30, letterSpacing: 1, padding: "6px 22px", borderRadius: 999,
        background: sheru ? GOLD : WHITE, color: NAVY, marginBottom: -18, zIndex: 2, boxShadow: "0 6px 16px #0006" }}>
        {SPEAKER_LABEL[line.who].ml}
      </div>
      <div style={{ width: "100%", background: "rgba(8,27,51,0.88)", border: `3px solid ${sheru ? GOLD : "#ffffffaa"}`, borderRadius: 28,
        padding: "34px 36px 22px", textAlign: "center", boxShadow: "0 16px 40px #0008" }}>
        <div style={{ fontFamily: SUB_FONT, fontWeight: 800, fontSize: 52, lineHeight: 1.45, color: WHITE }}>{line.ml}</div>
        <div style={{ fontFamily: SUB_FONT, fontWeight: 600, fontSize: 28, lineHeight: 1.35, color: "#c9d5e6", marginTop: 8 }}>{line.en}</div>
      </div>
    </div>
  );
};

/** Camera rig: scale/pan/rotate + optional shake, origin at (ox, oy). */
export const Camera: React.FC<{ scale: number; x?: number; y?: number; rot?: number; shake?: number; ox?: number; oy?: number; children: React.ReactNode }> = ({
  scale, x = 0, y = 0, rot = 0, shake = 0, ox = 540, oy = 960, children,
}) => {
  const frame = useCurrentFrame();
  const sx = shake ? Math.sin(frame * 2.7) * shake : 0;
  const sy = shake ? Math.cos(frame * 3.3) * shake * 0.6 : 0;
  return (
    <AbsoluteFill style={{ transformOrigin: `${ox}px ${oy}px`, transform: `translate(${x + sx}px, ${y + sy}px) scale(${scale}) rotate(${rot}deg)` }}>
      {children}
    </AbsoluteFill>
  );
};

/** Diagonal gold+navy wipe, fully covering the frame at its midpoint (place so midpoint = scene cut). */
export const GoldWipe: React.FC<{ durationFrames: number }> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, durationFrames], [-1.4, 1.4], { easing: Easing.inOut(Easing.quad) });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: -600, bottom: -600, left: 0, width: 1500, transform: `translateX(${p * 1500 - 210}px) skewX(-18deg)`,
        background: `linear-gradient(90deg, transparent 0, ${GOLD} 4%, ${NAVY} 12%, ${NAVY} 88%, ${GOLD} 96%, transparent 100%)` }} />
    </AbsoluteFill>
  );
};

/** Comic pop text (top zone). */
export const PopText: React.FC<{ atSec: number; untilSec: number; children: React.ReactNode; top: number; size: number; rot?: number; color?: string; font: string }> = ({
  atSec, untilSec, children, top, size, rot = 0, color = GOLD, font,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < f(atSec) || frame > f(untilSec)) return null;
  const p = spring({ frame: frame - f(atSec), fps, config: { damping: 9, mass: 0.6 } });
  const out = interpolate(frame, [f(untilSec) - 6, f(untilSec)], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <div style={{ position: "absolute", top, left: 40, right: 40, textAlign: "center", fontFamily: font, fontWeight: 800, fontSize: size,
      color, lineHeight: 1.25, opacity: out, transform: `scale(${p}) rotate(${rot}deg)`,
      textShadow: `0 6px 0 ${NAVY}, 0 0 30px rgba(212,175,55,0.6)`, WebkitTextStroke: `1.5px ${NAVY}` }}>{children}</div>
  );
};

type IconKind = "license" | "visa" | "doc";
const CardIcon: React.FC<{ kind: IconKind }> = ({ kind }) => (
  <svg viewBox="0 0 100 100" width={120} height={120}>
    <circle cx={50} cy={50} r={47} fill={NAVY} stroke={GOLD} strokeWidth={4} />
    {kind === "license" && (<><rect x={26} y={24} width={48} height={56} rx={6} fill="#fff" /><path d="M35 40h30M35 51h30M35 62h16" stroke={NAVY} strokeWidth={5} /><circle cx={66} cy={70} r={10} fill={GOLD} /></>)}
    {kind === "visa" && (<><rect x={29} y={20} width={42} height={60} rx={6} fill={GOLD} /><circle cx={50} cy={44} r={11} fill="none" stroke={NAVY} strokeWidth={5} /><path d="M37 67h26" stroke={NAVY} strokeWidth={5} /></>)}
    {kind === "doc" && (<><path d="M30 18h30l12 12v52H30z" fill="#fff" /><path d="M38 56l9 9 17-20" stroke="#16a34a" strokeWidth={8} fill="none" strokeLinecap="round" /></>)}
  </svg>
);

/** Premium service card: 3D flip-in + gold shine sweep. atSec is scene-local. */
export const ServiceCard: React.FC<{ atSec: number; en: string; ml: string; icon: IconKind; fromLeft: boolean }> = ({ atSec, en, ml, icon, fromLeft }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - f(atSec), fps, config: { damping: 15, mass: 0.9 } });
  const shine = interpolate(frame, [f(atSec) + 12, f(atSec) + 34], [-30, 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const floatY = Math.sin((frame - f(atSec)) / 18) * 4;
  return (
    <div style={{ perspective: 1600 }}>
      <div style={{ position: "relative", height: 190, borderRadius: 30, overflow: "hidden", display: "flex", alignItems: "center", gap: 30, padding: "0 34px",
        background: "linear-gradient(135deg,#ffffff 0%,#f4f1e6 100%)", border: `5px solid ${GOLD}`, boxShadow: "0 18px 40px #0009",
        opacity: p, transform: `translateX(${(1 - p) * (fromLeft ? -700 : 700)}px) rotateY(${(1 - p) * (fromLeft ? 70 : -70)}deg) translateY(${floatY}px)` }}>
        <CardIcon kind={icon} />
        <div>
          <div style={{ fontFamily: SUB_FONT, fontWeight: 800, fontSize: 56, color: NAVY, letterSpacing: 1, lineHeight: 1.1 }}>{en}</div>
          <div style={{ fontFamily: SUB_FONT, fontWeight: 600, fontSize: 38, color: "#8a6d12", lineHeight: 1.5 }}>{ml}</div>
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${shine}%`, width: 120, transform: "skewX(-20deg)",
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)" }} />
      </div>
    </div>
  );
};
