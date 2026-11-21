import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { GOLD, NAVY } from "../theme";

/** Layered parallax Dubai skyline at golden hour. panX shifts layers at different depths. */
export const DubaiBackdrop: React.FC<{ panX?: number; dim?: number }> = ({ panX = 0, dim = 0 }) => {
  const frame = useCurrentFrame();
  const towers = (seed: string, n: number, minH: number, maxH: number, color: string, wBase: number) =>
    Array.from({ length: n }, (_, i) => {
      const w = wBase + random(`${seed}w${i}`) * wBase;
      const h = minH + random(`${seed}h${i}`) * (maxH - minH);
      const x = (i / n) * 1600 - 260 + random(`${seed}x${i}`) * 40;
      return <rect key={i} x={x} y={1300 - h} width={w} height={h + 40} fill={color} rx={random(`${seed}r${i}`) > 0.6 ? w / 2.4 : 4} />;
    });
  const lit = Array.from({ length: 70 }, (_, i) => (
    <rect key={i} x={-200 + random(`lx${i}`) * 1500} y={900 + random(`ly${i}`) * 380} width={8} height={12}
      fill="#FFE39A" opacity={0.35 + 0.5 * Math.abs(Math.sin(frame / 20 + i))} />
  ));
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0B2448" />
            <stop offset="0.45" stopColor="#36507E" />
            <stop offset="0.68" stopColor="#E7A456" />
            <stop offset="0.78" stopColor="#F6CF7E" />
          </linearGradient>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b2f3a" />
            <stop offset="1" stopColor="#14161c" />
          </linearGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#sky)" />
        <circle cx={760 - panX * 0.05} cy={1060} r={150} fill="#FFE2A0" opacity={0.85} />
        {/* far layer */}
        <g transform={`translate(${-panX * 0.15} 0)`} opacity={0.55}>{towers("far", 18, 180, 420, "#46557A", 50)}</g>
        {/* Burj-style spire + sail hotel silhouettes */}
        <g transform={`translate(${-panX * 0.25} 0)`}>
          <path d="M520 1300 L540 760 L548 520 L552 300 L556 520 L566 760 L590 1300 Z" fill="#2B3A5E" />
          <path d="M500 1300 L530 980 L575 980 L606 1300 Z" fill="#2B3A5E" />
          <path d="M860 1300 Q860 960 960 900 Q930 1080 980 1300 Z" fill="#2B3A5E" />
          <rect x={845} y={1080} width={8} height={220} fill="#2B3A5E" />
        </g>
        {/* mid layer */}
        <g transform={`translate(${-panX * 0.4} 0)`}>{towers("mid", 14, 140, 340, "#1E2B47", 70)}{lit}</g>
        {/* palms */}
        <g transform={`translate(${-panX * 0.7} 0)`}>
          {[60, 980, 1240].map((x, i) => (
            <g key={x} transform={`translate(${x} 1320) rotate(${Math.sin(frame / 25 + i) * 2})`}>
              <path d="M0 0 Q8 -120 -4 -240" stroke="#3a2a18" strokeWidth={16} fill="none" />
              {[0, 50, 100, 150, 200, 250, 300].map((a) => (
                <path key={a} d="M-4 -240 q60 -30 110 20" stroke="#1f5a3a" strokeWidth={14} fill="none" strokeLinecap="round" transform={`rotate(${a} -4 -240)`} />
              ))}
            </g>
          ))}
        </g>
        {/* road */}
        <rect x={0} y={1300} width={1080} height={620} fill="url(#road)" />
        <rect x={0} y={1296} width={1080} height={10} fill={GOLD} opacity={0.6} />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={((i * 220 - panX * 1.0) % 1760 + 1760) % 1760 - 300} y={1560} width={120} height={12} rx={6} fill="#ffffff55" />
        ))}
      </svg>
      {dim > 0 && <AbsoluteFill style={{ background: `rgba(8,27,51,${dim})` }} />}
    </AbsoluteFill>
  );
};

/** Premium navy studio with gold lines and soft skyline window — for the services scene. */
export const PremiumStudio: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 35%, #163563 0%, ${NAVY} 70%)` }}>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-200 + i * 180 + ((frame * 0.6) % 180)} y1={0} x2={-600 + i * 180 + ((frame * 0.6) % 180)} y2={1920}
            stroke={GOLD} strokeOpacity={0.07} strokeWidth={3} />
        ))}
        <rect x={0} y={1330} width={1080} height={590} fill="#06152a" />
        <rect x={0} y={1326} width={1080} height={6} fill={GOLD} opacity={0.55} />
      </svg>
    </AbsoluteFill>
  );
};

/** Comic radial speed lines for surprise beats. */
export const SpeedLines: React.FC<{ cx: number; cy: number; opacity: number }> = ({ cx, cy, opacity }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}>
        {Array.from({ length: 48 }, (_, i) => {
          const a = (i / 48) * Math.PI * 2 + (frame % 2) * 0.03;
          const r0 = 380 + random(`sl${i}${Math.floor(frame / 2)}`) * 120;
          return (
            <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * 1600} y2={cy + Math.sin(a) * 1600}
              stroke="#fff" strokeWidth={4 + (i % 3) * 3} strokeOpacity={0.55} />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
