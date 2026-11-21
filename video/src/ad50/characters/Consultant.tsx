import { useCurrentFrame } from "remotion";
import { blinkAmount, GOLD, mouthOpen, NAVY } from "../theme";
import { ArmPose, Limb } from "./Limb";

export type ConsultantExpr = "smile" | "shock" | "laugh" | "proud";

export const CONSULTANT_POSES: Record<string, ArmPose> = {
  idle: { l1: 10, l2: -10, r1: 10, r2: -10 },
  wave: { l1: 10, l2: -10, r1: 150, r2: -25 },
  stop: { l1: 10, l2: -10, r1: 95, r2: -80 },
  pointUp: { l1: 10, l2: -10, r1: 160, r2: 5 },
  present: { l1: 10, l2: -10, r1: 110, r2: -20 },
  handsUp: { l1: 140, l2: 30, r1: 140, r2: 30 },
  thumbsUp: { l1: 10, l2: -10, r1: 60, r2: -120 },
  shock: { l1: 35, l2: -140, r1: 35, r2: -140 },
};

const SKIN = "#B97A4C";
const SKIN_D = "#8E5A34";

const Hand: React.FC<{ open?: boolean; thumb?: boolean }> = ({ open, thumb }) => (
  <g>
    <ellipse rx={18} ry={20} fill={SKIN} stroke={SKIN_D} strokeWidth={2} />
    {open && [-12, -4, 4, 12].map((x) => <rect key={x} x={x - 3.5} y={-38} width={7} height={22} rx={3.5} fill={SKIN} />)}
    {thumb && <rect x={-6} y={-42} width={12} height={26} rx={6} fill={SKIN} stroke={SKIN_D} strokeWidth={2} />}
  </g>
);

/**
 * Friendly Malayali IHBS consultant. ViewBox 400x820, feet at y≈810.
 * Navy blazer, white shirt, gold tie, IHBS lanyard, neat hair & moustache.
 */
export const Consultant: React.FC<{
  width: number;
  talking?: boolean;
  expr?: ConsultantExpr;
  pose?: ArmPose;
  walk?: number;
  openHand?: boolean;
  thumb?: boolean;
  headTilt?: number;
}> = ({ width, talking = false, expr = "smile", pose = CONSULTANT_POSES.idle, walk, openHand, thumb, headTilt = 0 }) => {
  const frame = useCurrentFrame();
  const m = mouthOpen(frame, talking, "consultant");
  const blink = blinkAmount(frame, "consultant");
  const breathe = Math.sin(frame / 16) * 2;
  const legA = walk !== undefined ? Math.sin(walk) * 20 : 0;
  const bob = walk !== undefined ? Math.abs(Math.cos(walk)) * -8 : 0;
  const shock = expr === "shock";

  return (
    <svg viewBox="0 0 400 820" width={width} height={width * 2.05} style={{ overflow: "visible", display: "block" }}>
      <ellipse cx={200} cy={812} rx={110} ry={12} fill="#000" opacity={0.22} />
      <g transform={`translate(0 ${breathe * 0.5 + bob})`}>
        {/* legs */}
        {[{ x: 170, a: legA }, { x: 230, a: -legA }].map((l, i) => (
          <g key={i} transform={`rotate(${l.a} ${l.x} 540)`}>
            <rect x={l.x - 24} y={530} width={48} height={250} rx={16} fill="#0d2442" />
            <path d={`M${l.x - 30} 798 q0 -24 30 -24 q40 0 44 28 z`} fill="#5a3216" transform={i ? `scale(-1 1) translate(${-2 * l.x} 0)` : undefined} />
          </g>
        ))}
        {/* back arm */}
        <Limb x={128} y={300} a1={pose.l1} a2={pose.l2} upper={115} lower={105} width={40} color={NAVY} cuff="#fff" end={<Hand />} />
        {/* torso: blazer */}
        <path d="M122 285 Q200 262 278 285 L292 560 Q200 580 108 560 Z" fill={NAVY} />
        <path d="M172 282 L200 360 L228 282 Z" fill="#fff" />
        <path d="M194 300 L206 300 L212 380 L200 396 L188 380 Z" fill={GOLD} />
        <path d="M164 282 L200 372 L188 540 L130 540 Z" fill="#0b2340" />
        <path d="M236 282 L200 372 L212 540 L270 540 Z" fill="#0b2340" />
        {/* lanyard + ID */}
        <path d="M168 290 L196 420 M232 290 L204 420" stroke={GOLD} strokeWidth={5} />
        <rect x={176} y={414} width={48} height={62} rx={6} fill="#fff" stroke={GOLD} strokeWidth={3} />
        <text x={200} y={452} textAnchor="middle" fontSize={15} fontWeight={900} fill={NAVY} fontFamily="Arial">IHBS</text>
        <rect x={184} y={458} width={32} height={4} rx={2} fill={GOLD} />
        {/* neck */}
        <rect x={180} y={240} width={40} height={40} rx={10} fill={SKIN_D} />
        {/* head */}
        <g transform={`rotate(${headTilt} 200 250)`}>
          <ellipse cx={122} cy={170} rx={14} ry={22} fill={SKIN} />
          <ellipse cx={278} cy={170} rx={14} ry={22} fill={SKIN} />
          <ellipse cx={200} cy={160} rx={80} ry={94} fill={SKIN} />
          {/* hair */}
          <path d="M118 150 Q112 60 200 56 Q290 58 284 150 Q270 104 236 100 Q200 120 150 104 Q126 116 118 150 Z" fill="#1a120c" />
          <path d="M150 104 Q180 80 236 100" stroke="#3a2a1e" strokeWidth={4} fill="none" />
          {/* brows */}
          <path d={shock ? "M146 112 L182 108" : "M146 124 L182 120"} stroke="#1a120c" strokeWidth={8} strokeLinecap="round" />
          <path d={shock ? "M218 108 L254 112" : "M218 120 L254 124"} stroke="#1a120c" strokeWidth={8} strokeLinecap="round" />
          {/* eyes */}
          {expr === "laugh" ? (
            <>
              <path d="M150 152 Q164 138 178 152" stroke="#1a120c" strokeWidth={6} fill="none" strokeLinecap="round" />
              <path d="M222 152 Q236 138 250 152" stroke="#1a120c" strokeWidth={6} fill="none" strokeLinecap="round" />
            </>
          ) : (
            [164, 236].map((x) => (
              <g key={x}>
                <ellipse cx={x} cy={150} rx={shock ? 17 : 13} ry={(shock ? 19 : 12) * blink} fill="#fff" />
                <circle cx={x + 1} cy={151} r={(shock ? 6 : 7) * Math.max(blink, 0.15)} fill="#1a120c" />
                <circle cx={x + 3} cy={148} r={2 * blink} fill="#fff" />
              </g>
            ))
          )}
          {/* nose */}
          <path d="M200 160 Q192 186 198 192 Q206 194 210 188" stroke={SKIN_D} strokeWidth={5} fill="none" strokeLinecap="round" />
          {/* moustache */}
          <path d="M162 208 Q200 192 238 208 Q220 214 200 206 Q180 214 162 208 Z" fill="#1a120c" />
          {/* mouth */}
          {shock ? (
            <ellipse cx={200} cy={228} rx={16} ry={18} fill="#5a1a0a" />
          ) : m > 0 ? (
            <g>
              <ellipse cx={200} cy={224} rx={22} ry={4 + m * 13} fill="#5a1a0a" />
              <rect x={186} y={218} width={28} height={5} rx={2} fill="#fff" />
            </g>
          ) : expr === "laugh" || expr === "proud" ? (
            <g>
              <path d="M172 216 Q200 246 228 216 Z" fill="#5a1a0a" />
              <path d="M176 217 L224 217 L221 225 L179 225 Z" fill="#fff" />
            </g>
          ) : (
            <path d="M178 220 Q200 236 222 220" stroke="#5a1a0a" strokeWidth={5} fill="none" strokeLinecap="round" />
          )}
          {/* sweat when shocked */}
          {shock && <path d={`M276 ${110 + (frame % 24) * 2} q9 16 0 24 q-9 -8 0 -24`} fill="#8fd6ff" opacity={1 - (frame % 24) / 24} />}
        </g>
        {/* front arm */}
        <Limb x={272} y={300} mirror={-1} a1={pose.r1} a2={pose.r2} upper={115} lower={105} width={40} color="#0d2645" cuff="#fff"
          end={<Hand open={openHand} thumb={thumb} />} />
      </g>
    </svg>
  );
};
