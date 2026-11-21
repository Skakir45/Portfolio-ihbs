import { random, useCurrentFrame } from "remotion";
import { f, GOLD } from "../theme";

/** Luxury golden convertible. ViewBox 900x360. wheelSpin in degrees. */
export const GoldenCar: React.FC<{ width: number; wheelSpin: number; children?: React.ReactNode }> = ({ width, wheelSpin, children }) => (
  <div style={{ position: "relative", width, height: width * 0.4 }}>
    {/* driver sits between back and front layers */}
    <svg viewBox="0 0 900 360" width={width} height={width * 0.4} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <linearGradient id="car-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF0A8" />
          <stop offset="0.35" stopColor="#E8C14E" />
          <stop offset="0.7" stopColor="#B88A1C" />
          <stop offset="1" stopColor="#8A6510" />
        </linearGradient>
      </defs>
      <path d="M190 150 Q260 70 420 70 L470 150 Z" fill="#9fd3ff" opacity={0.55} stroke="#fff" strokeWidth={4} />
      <rect x={80} y={140} width={180} height={18} rx={8} fill="#3a2a10" />
    </svg>
    <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    <svg viewBox="0 0 900 360" width={width} height={width * 0.4} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <ellipse cx={450} cy={340} rx={420} ry={18} fill="#000" opacity={0.35} />
      <path d="M40 250 Q30 170 120 160 L300 150 Q360 120 470 140 L760 160 Q870 170 870 250 L860 290 L40 290 Z" fill="url(#car-gold)" stroke="#6b4e0c" strokeWidth={4} />
      <path d="M70 200 L840 205" stroke="#FFF6C8" strokeWidth={5} opacity={0.8} />
      <rect x={430} y={210} width={60} height={8} rx={4} fill="#6b4e0c" />
      <ellipse cx={850} cy={215} rx={18} ry={14} fill="#fffbe0" stroke="#6b4e0c" strokeWidth={3} />
      <rect x={35} y={205} width={20} height={26} rx={6} fill="#ff3b3b" />
      <rect x={300} y={268} width={300} height={14} rx={7} fill="#c9c9c9" />
      {[200, 710].map((cx) => (
        <g key={cx} transform={`translate(${cx} 285)`}>
          <circle r={64} fill="#111" />
          <circle r={40} fill="#D4AF37" stroke="#fff3b0" strokeWidth={4} />
          <g transform={`rotate(${wheelSpin})`}>
            {[0, 60, 120].map((a) => <rect key={a} x={-4} y={-38} width={8} height={76} fill="#7a5a10" transform={`rotate(${a})`} />)}
          </g>
          <circle r={9} fill="#fff3b0" />
        </g>
      ))}
    </svg>
  </div>
);

/** Suitcase with hinged lid (CSS 3D). open: 0 closed .. 1 open. glow: 0..1. */
export const Suitcase: React.FC<{ width: number; open: number; glow?: number }> = ({ width, open, glow = 0 }) => {
  const h = width * 0.62;
  return (
    <div style={{ position: "relative", width, height: h, perspective: 1400 }}>
      {glow > 0 && (
        <div style={{ position: "absolute", left: "50%", top: 0, width: width * 1.6, height: width * 1.6, transform: "translate(-50%,-62%)",
          background: `radial-gradient(circle, rgba(255,226,120,${0.75 * glow}) 0%, rgba(212,175,55,${0.3 * glow}) 35%, transparent 65%)` }} />
      )}
      {/* base */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.55, background: "linear-gradient(#3b2414,#24150b)",
        borderRadius: 18, border: "6px solid #D4AF37", boxShadow: "0 20px 40px #0008", overflow: "hidden" }}>
        {/* cash stacks inside */}
        <div style={{ position: "absolute", inset: 14, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, opacity: Math.min(1, open * 3) }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{ background: "repeating-linear-gradient(#2f9e55 0 6px,#47c06f 6px 9px)", borderRadius: 6, border: "2px solid #1d6b38",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#d9ffe4", fontWeight: 900, fontSize: width * 0.06, fontFamily: "Arial" }}>$</div>
          ))}
        </div>
      </div>
      {/* lid */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: h * 0.55 - 6, height: h * 0.45, transformOrigin: "50% 100%",
        transform: `rotateX(${open * -118}deg)`, background: open > 0.5 ? "linear-gradient(#7a1f2b,#4a0f18)" : "linear-gradient(#4a2c17,#2e1b0d)", borderRadius: "18px 18px 6px 6px",
        border: "6px solid #D4AF37", backfaceVisibility: "visible" }}>
        <div style={{ position: "absolute", left: "50%", top: -34, width: width * 0.3, height: 34, transform: "translateX(-50%)",
          border: "10px solid #D4AF37", borderBottom: "none", borderRadius: "20px 20px 0 0" }} />
        {[0.18, 0.82].map((p) => (
          <div key={p} style={{ position: "absolute", left: `${p * 100}%`, bottom: -8, width: 34, height: 22, transform: "translateX(-50%)",
            background: "#F3D77A", borderRadius: 4, border: "2px solid #8a6b1f" }} />
        ))}
      </div>
    </div>
  );
};

/** Cartoon dollar bill. */
export const Bill: React.FC<{ w: number }> = ({ w }) => (
  <svg viewBox="0 0 160 80" width={w} height={w / 2}>
    <rect x={2} y={2} width={156} height={76} rx={8} fill="#3fb06a" stroke="#1d6b38" strokeWidth={4} />
    <rect x={12} y={12} width={136} height={56} rx={6} fill="none" stroke="#bff0cf" strokeWidth={3} />
    <circle cx={80} cy={40} r={20} fill="#bff0cf" />
    <text x={80} y={50} textAnchor="middle" fontSize={30} fontWeight={900} fill="#1d6b38" fontFamily="Arial">$</text>
  </svg>
);

/**
 * Money fountain: bills launched from (ox, oy) between startSec and endSec (scene-local),
 * ballistic arcs with flutter, deterministic.
 */
export const MoneyBurst: React.FC<{ ox: number; oy: number; startSec: number; endSec: number; count: number }> = ({ ox, oy, startSec, endSec, count }) => {
  const frame = useCurrentFrame();
  const g = 0.9;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const born = f(startSec) + Math.floor(((endSec - startSec) * 30 * i) / count);
        const t = frame - born;
        if (t < 0 || t > 110) return null;
        const vx = (random(`vx${i}`) - 0.5) * 28;
        const vy = -26 - random(`vy${i}`) * 18;
        const x = ox + vx * t * 0.9;
        const y = oy + vy * t + 0.5 * g * t * t;
        const flutter = Math.sin(t / 4 + i) * 40;
        const rot = random(`r${i}`) * 360 + t * (random(`rs${i}`) - 0.5) * 18;
        const scale = 0.7 + random(`s${i}`) * 0.6;
        const op = t > 90 ? 1 - (t - 90) / 20 : 1;
        return (
          <div key={i} style={{ position: "absolute", left: x + flutter, top: y, opacity: op,
            transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${scale}) rotateX(${Math.sin(t / 5 + i) * 60}deg)` }}>
            <Bill w={130} />
          </div>
        );
      })}
    </>
  );
};

export const Sunglasses: React.FC<{ width: number }> = ({ width }) => (
  <svg viewBox="0 0 240 70" width={width} height={width * 0.29}>
    <rect x={6} y={8} width={96} height={54} rx={18} fill="#0b0b0b" />
    <rect x={138} y={8} width={96} height={54} rx={18} fill="#0b0b0b" />
    <rect x={98} y={22} width={44} height={9} fill="#0b0b0b" />
    <path d="M22 20 L56 20 M154 20 L188 20" stroke="#ffffff77" strokeWidth={7} strokeLinecap="round" />
  </svg>
);

export const Sparkle: React.FC<{ x: number; y: number; size: number; delay: number }> = ({ x, y, size, delay }) => {
  const frame = useCurrentFrame();
  const t = ((frame + delay) % 40) / 40;
  const s = Math.sin(t * Math.PI);
  return (
    <svg viewBox="-10 -10 20 20" width={size} height={size}
      style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${t * 90}deg)`, opacity: s }}>
      <path d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2 Z" fill={GOLD} />
    </svg>
  );
};
