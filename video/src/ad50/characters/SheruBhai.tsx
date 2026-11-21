import { useCurrentFrame } from "remotion";
import { blinkAmount, mouthOpen } from "../theme";
import { ArmPose, Limb } from "./Limb";

export type SheruExpr = "boss" | "grin" | "shock" | "confused" | "relieved";

export const SHERU_POSES: Record<string, ArmPose> = {
  idle: { l1: 12, l2: -8, r1: 12, r2: -8 },
  hipsBoss: { l1: 40, l2: -110, r1: 40, r2: -110 },
  raiseRight: { l1: 12, l2: -8, r1: 150, r2: 20 },
  count: { l1: 30, l2: -100, r1: 135, r2: -30 },
  shrug: { l1: 70, l2: -120, r1: 70, r2: -120 },
  hug: { l1: -20, l2: -95, r1: -20, r2: -95 },
  bothUp: { l1: 160, l2: 10, r1: 160, r2: 10 },
  thumbsUp: { l1: 12, l2: -8, r1: 50, r2: -130 },
  shock: { l1: 130, l2: 40, r1: 130, r2: 40 },
};

const manePoints = (cx: number, cy: number, r1: number, r2: number, n: number, wob: number) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n;
    const r = (i % 2 ? r1 : r2) + (i % 2 ? 0 : Math.sin(wob + i) * 4);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const Hand: React.FC<{ thumb?: boolean }> = ({ thumb }) => (
  <g>
    <circle r={22} fill="#F0B350" stroke="#B8702A" strokeWidth={3} />
    {thumb && <rect x={-7} y={-46} width={14} height={30} rx={7} fill="#F0B350" stroke="#B8702A" strokeWidth={3} />}
    <rect x={-14} y={8} width={28} height={10} rx={4} fill="#D4AF37" opacity={0} />
  </g>
);

/**
 * Sheru Bhai — original cartoon boss lion. ViewBox 400x820, feet at y≈810.
 * All animation is prop-driven so every scene shares the exact same design.
 */
export const SheruBhai: React.FC<{
  width: number;
  talking?: boolean;
  expr?: SheruExpr;
  pose?: ArmPose;
  glasses?: boolean;
  walk?: number; // walk phase in radians, undefined = standing
  bounce?: number; // extra vertical bob px (dance)
  headTilt?: number;
  thumb?: boolean;
  seed?: string;
}> = ({ width, talking = false, expr = "boss", pose = SHERU_POSES.idle, glasses = true, walk, bounce = 0, headTilt = 0, thumb, seed = "sheru" }) => {
  const frame = useCurrentFrame();
  const m = mouthOpen(frame, talking, seed);
  const blink = blinkAmount(frame, seed);
  const breathe = Math.sin(frame / 14) * 3;
  const legA = walk !== undefined ? Math.sin(walk) * 22 : 0;
  const walkBob = walk !== undefined ? Math.abs(Math.cos(walk)) * -10 : 0;
  const bodyY = breathe * 0.4 + walkBob - bounce;
  const shock = expr === "shock";

  return (
    <svg viewBox="0 0 400 820" width={width} height={width * 2.05} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id="sh-suit" x1="0" x2="1">
          <stop offset="0" stopColor="#1b1b1f" />
          <stop offset="0.5" stopColor="#2a2a30" />
          <stop offset="1" stopColor="#141417" />
        </linearGradient>
        <radialGradient id="sh-face" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#FFD27A" />
          <stop offset="1" stopColor="#E9A23B" />
        </radialGradient>
        <radialGradient id="sh-mane" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#E08A22" />
          <stop offset="1" stopColor="#9C4A12" />
        </radialGradient>
      </defs>
      {/* shadow */}
      <ellipse cx={200} cy={812} rx={130} ry={14} fill="#000" opacity={0.25} />
      <g transform={`translate(0 ${bodyY})`}>
        {/* legs */}
        {[{ x: 165, a: legA }, { x: 235, a: -legA }].map((l, i) => (
          <g key={i} transform={`rotate(${l.a} ${l.x} 600)`}>
            <rect x={l.x - 26} y={590} width={52} height={190} rx={18} fill="#16161a" />
            <path d={`M${l.x - 34} 790 q0 -26 34 -26 q44 0 50 30 z`} fill="#0b0b0b" transform={i ? `scale(-1 1) translate(${-2 * l.x} 0)` : undefined} />
            <rect x={l.x - 6} y={772} width={14} height={8} rx={2} fill="#D4AF37" />
          </g>
        ))}
        {/* back arm (left) */}
        <Limb x={112} y={410} a1={pose.l1} a2={pose.l2} upper={110} lower={100} width={46} color="#202024" cuff="#ffffff"
          end={<Hand />} />
        {/* torso */}
        <path d="M108 385 Q200 352 292 385 L304 612 Q200 646 96 612 Z" fill="url(#sh-suit)" />
        <path d="M168 380 L200 470 L232 380 Z" fill="#f5f5f5" />
        <path d="M156 378 L200 482 L176 612 L120 606 Z" fill="#0f0f12" />
        <path d="M244 378 L200 482 L224 612 L280 606 Z" fill="#0f0f12" />
        <path d="M192 395 L208 395 L214 440 L200 458 L186 440 Z" fill="#D4AF37" />
        {/* gold chain + medallion */}
        <path d="M142 392 Q200 470 258 392" stroke="#D4AF37" strokeWidth={9} fill="none" />
        <path d="M142 392 Q200 470 258 392" stroke="#FFF2B0" strokeWidth={2} fill="none" strokeDasharray="6 10" />
        <circle cx={200} cy={448} r={17} fill="#D4AF37" stroke="#9c7a17" strokeWidth={3} />
        <text x={200} y={455} textAnchor="middle" fontSize={20} fontWeight={900} fill="#5b4300" fontFamily="Arial">S</text>
        {/* pocket square */}
        <path d="M250 450 l26 -4 l-4 18 z" fill="#D4AF37" />
        {/* head */}
        <g transform={`rotate(${headTilt} 200 330)`}>
          <polygon points={manePoints(200, 205, 150, 188, 22, frame / 9)} fill="url(#sh-mane)" />
          <polygon points={manePoints(200, 205, 126, 158, 18, frame / 7 + 1)} fill="#E8962A" />
          <circle cx={118} cy={102} r={30} fill="#EDA845" />
          <circle cx={282} cy={102} r={30} fill="#EDA845" />
          <circle cx={118} cy={102} r={15} fill="#B8702A" />
          <circle cx={282} cy={102} r={15} fill="#B8702A" />
          <ellipse cx={200} cy={212} rx={100} ry={110} fill="url(#sh-face)" />
          <ellipse cx={200} cy={266} rx={62} ry={50} fill="#FDE6B8" />
          {/* eyes (visible when glasses are off) */}
          {!glasses && (
            <g>
              {[150, 250].map((x) => (
                <g key={x}>
                  <ellipse cx={x} cy={192} rx={shock ? 30 : 24} ry={(shock ? 34 : 24) * blink} fill="#fff" stroke="#7a3d10" strokeWidth={3} />
                  <circle cx={x} cy={196} r={(shock ? 9 : 11) * Math.max(blink, 0.15)} fill="#2b1206" />
                  <circle cx={x + 4} cy={191} r={3 * blink} fill="#fff" />
                </g>
              ))}
            </g>
          )}
          {/* brows */}
          <path d={shock ? "M118 132 L176 140" : expr === "confused" ? "M120 150 L178 140" : "M120 150 L180 162"} stroke="#7a3d10" strokeWidth={10} strokeLinecap="round" />
          <path d={shock ? "M282 132 L224 140" : expr === "confused" ? "M280 140 L222 160" : "M280 150 L220 162"} stroke="#7a3d10" strokeWidth={10} strokeLinecap="round" />
          {glasses && (
            <g>
              <rect x={108} y={166} width={84} height={48} rx={16} fill="#0b0b0b" />
              <rect x={208} y={166} width={84} height={48} rx={16} fill="#0b0b0b" />
              <rect x={188} y={180} width={24} height={8} fill="#0b0b0b" />
              <path d="M120 176 L150 176" stroke="#ffffff66" strokeWidth={6} strokeLinecap="round" />
              <path d="M220 176 L250 176" stroke="#ffffff66" strokeWidth={6} strokeLinecap="round" />
              <path d="M108 180 L84 172 M292 180 L316 172" stroke="#D4AF37" strokeWidth={5} />
            </g>
          )}
          {/* nose */}
          <path d="M178 230 L222 230 L200 256 Z" fill="#4a2208" />
          {/* mouth */}
          {shock ? (
            <ellipse cx={200} cy={296} rx={24} ry={30} fill="#5a1a0a" />
          ) : m > 0 ? (
            <g>
              <ellipse cx={200} cy={289} rx={30} ry={6 + m * 20} fill="#5a1a0a" />
              <ellipse cx={200} cy={295 + m * 8} rx={16} ry={4 + m * 6} fill="#e0605a" />
            </g>
          ) : expr === "grin" || expr === "relieved" ? (
            <g>
              <path d="M160 278 Q200 322 240 278 Z" fill="#5a1a0a" />
              <path d="M166 280 L234 280 L230 290 L170 290 Z" fill="#fff" />
            </g>
          ) : expr === "confused" ? (
            <path d="M178 292 Q192 282 206 292 Q216 300 226 290" stroke="#4a2208" strokeWidth={6} fill="none" strokeLinecap="round" />
          ) : (
            <path d="M172 284 Q205 302 232 278" stroke="#4a2208" strokeWidth={6} fill="none" strokeLinecap="round" />
          )}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={160} cy={262 + i * 12} r={3} fill="#a0662a" />
              <circle cx={240} cy={262 + i * 12} r={3} fill="#a0662a" />
            </g>
          ))}
        </g>
        {/* front arm (right) */}
        <Limb x={288} y={410} mirror={-1} a1={pose.r1} a2={pose.r2} upper={110} lower={100} width={46} color="#26262b" cuff="#ffffff"
          end={<g><Hand thumb={thumb} /><rect x={-24} y={-30} width={48} height={12} rx={4} fill="#D4AF37" /></g>} />
      </g>
    </svg>
  );
};
