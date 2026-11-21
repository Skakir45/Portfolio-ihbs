import { useCurrentFrame } from "remotion";

const manePoints = (cx: number, cy: number, r1: number, r2: number, n: number) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n;
    const r = i % 2 ? r1 : r2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");

/** Original "boss lion" character: golden mane, shades, black suit, gold chain. */
export const SheruBhai: React.FC<{ talking?: boolean; size: number; smirk?: boolean }> = ({ talking, size, smirk }) => {
  const frame = useCurrentFrame();
  const open = talking && frame % 8 < 4;
  const bob = Math.sin(frame / 10) * 4;
  return (
    <svg viewBox="0 0 400 600" width={size} height={size * 1.5} style={{ overflow: "visible" }}>
      {/* suit */}
      <path d="M60 600 L90 380 Q200 330 310 380 L340 600 Z" fill="#111" />
      <path d="M160 370 L200 470 L240 370 Z" fill="#f5f5f5" />
      <path d="M150 368 L200 480 L170 600 L120 600 Z" fill="#1d1d1d" />
      <path d="M250 368 L200 480 L230 600 L280 600 Z" fill="#1d1d1d" />
      <path d="M140 380 Q200 450 260 380" stroke="#e8b923" strokeWidth={9} fill="none" />
      <circle cx={200} cy={438} r={14} fill="#e8b923" />
      <g transform={`translate(0 ${bob})`}>
        {/* mane */}
        <polygon points={manePoints(200, 210, 150, 185, 22)} fill="#a8561a" />
        <polygon points={manePoints(200, 210, 125, 155, 18)} fill="#d4831f" />
        {/* ears */}
        <circle cx={120} cy={110} r={30} fill="#e9a640" />
        <circle cx={280} cy={110} r={30} fill="#e9a640" />
        <circle cx={120} cy={110} r={15} fill="#b8702a" />
        <circle cx={280} cy={110} r={15} fill="#b8702a" />
        {/* face */}
        <ellipse cx={200} cy={215} rx={100} ry={110} fill="#f0b350" />
        <ellipse cx={200} cy={268} rx={62} ry={50} fill="#fde6b8" />
        {/* brows */}
        <path d="M120 150 L180 162" stroke="#7a3d10" strokeWidth={10} strokeLinecap="round" />
        <path d="M280 150 L220 162" stroke="#7a3d10" strokeWidth={10} strokeLinecap="round" />
        {/* shades */}
        <rect x={110} y={168} width={80} height={46} rx={16} fill="#0b0b0b" />
        <rect x={210} y={168} width={80} height={46} rx={16} fill="#0b0b0b" />
        <rect x={188} y={182} width={24} height={8} fill="#0b0b0b" />
        <path d="M122 178 L150 178" stroke="#ffffff55" strokeWidth={6} strokeLinecap="round" />
        <path d="M222 178 L250 178" stroke="#ffffff55" strokeWidth={6} strokeLinecap="round" />
        {/* nose */}
        <path d="M178 232 L222 232 L200 258 Z" fill="#4a2208" />
        {/* mouth */}
        {open ? (
          <ellipse cx={200} cy={290} rx={26} ry={18} fill="#5a1a0a" />
        ) : (
          <path d={smirk ? "M172 284 Q205 300 232 278" : "M175 286 Q200 300 225 286"} stroke="#4a2208" strokeWidth={6} fill="none" strokeLinecap="round" />
        )}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={160} cy={262 + i * 12} r={3} fill="#a0662a" />
            <circle cx={240} cy={262 + i * 12} r={3} fill="#a0662a" />
          </g>
        ))}
      </g>
    </svg>
  );
};

/** Kuttan the fox: stressed small-business hopeful carrying a pile of files. */
export const Kuttan: React.FC<{ talking?: boolean; size: number; mood?: "sad" | "happy" | "shock"; files?: boolean }> = ({
  talking,
  size,
  mood = "sad",
  files = true,
}) => {
  const frame = useCurrentFrame();
  const open = talking && frame % 7 < 4;
  const shake = mood === "shock" ? Math.sin(frame * 2) * 4 : 0;
  const sweat = (frame % 30) / 30;
  return (
    <svg viewBox="0 0 400 600" width={size} height={size * 1.5} style={{ overflow: "visible" }}>
      <g transform={`translate(${shake} 0)`}>
        {/* body: shirt */}
        <path d="M90 600 L110 390 Q200 350 290 390 L310 600 Z" fill="#2f6fb0" />
        <path d="M170 380 L200 430 L230 380 Z" fill="#fff" />
        {/* head */}
        <polygon points="95,90 150,170 120,200" fill="#e0661e" />
        <polygon points="305,90 250,170 280,200" fill="#e0661e" />
        <polygon points="110,115 140,170 125,185" fill="#3a1a08" />
        <polygon points="290,115 260,170 275,185" fill="#3a1a08" />
        <path d="M100 170 Q200 120 300 170 L250 300 Q200 350 150 300 Z" fill="#ef7a2a" />
        <path d="M130 230 Q200 260 270 230 L235 305 Q200 340 165 305 Z" fill="#fff4e6" />
        <circle cx={200} cy={312} r={12} fill="#2b1206" />
        {/* eyes */}
        {mood === "happy" ? (
          <>
            <path d="M150 210 Q165 195 180 210" stroke="#2b1206" strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M220 210 Q235 195 250 210" stroke="#2b1206" strokeWidth={7} fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx={165} cy={208} r={mood === "shock" ? 16 : 12} fill="#fff" />
            <circle cx={235} cy={208} r={mood === "shock" ? 16 : 12} fill="#fff" />
            <circle cx={165} cy={210} r={6} fill="#2b1206" />
            <circle cx={235} cy={210} r={6} fill="#2b1206" />
            <path d="M145 186 L182 196" stroke="#2b1206" strokeWidth={6} strokeLinecap="round" />
            <path d="M255 186 L218 196" stroke="#2b1206" strokeWidth={6} strokeLinecap="round" />
          </>
        )}
        {/* mouth */}
        {open ? (
          <ellipse cx={200} cy={334} rx={14} ry={10} fill="#5a1a0a" />
        ) : mood === "happy" ? (
          <path d="M180 330 Q200 345 220 330" stroke="#2b1206" strokeWidth={5} fill="none" strokeLinecap="round" />
        ) : (
          <path d="M184 338 Q200 328 216 338" stroke="#2b1206" strokeWidth={5} fill="none" strokeLinecap="round" />
        )}
        {/* sweat */}
        {mood !== "happy" && (
          <path
            d={`M300 ${170 + sweat * 60} q10 18 0 26 q-10 -8 0 -26`}
            fill="#7fd0ff"
            opacity={1 - sweat}
          />
        )}
        {/* files */}
        {files &&
          [0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`rotate(${(i % 2 ? 4 : -3) + Math.sin(frame / 6 + i) * 2} 200 ${470 - i * 22})`}>
              <rect x={115} y={455 - i * 22} width={170} height={26} rx={4} fill={["#f6d365", "#ffe8a3", "#f2c14e", "#fff1c1", "#e9b949"][i]} stroke="#8a6b1f" strokeWidth={2} />
            </g>
          ))}
      </g>
    </svg>
  );
};

export const Gavel: React.FC<{ size: number; angle: number }> = ({ size, angle }) => (
  <svg viewBox="0 0 200 200" width={size} height={size}>
    <g transform={`rotate(${angle} 150 150)`}>
      <rect x={40} y={60} width={110} height={20} rx={6} fill="#6b3a1e" transform="rotate(-35 95 70)" />
      <rect x={20} y={20} width={60} height={90} rx={12} fill="#8a4b24" transform="rotate(-35 50 65)" />
    </g>
    <rect x={110} y={170} width={80} height={22} rx={6} fill="#5a2f17" />
  </svg>
);
