/**
 * Two-segment limb drawn pointing DOWN from its origin.
 * a1 = upper rotation, a2 = lower rotation relative to upper (degrees, SVG clockwise).
 * mirror = -1 flips it so the same angles mean "outward" for the right-side limb.
 */
export const Limb: React.FC<{
  x: number; y: number; a1: number; a2: number; mirror?: 1 | -1;
  upper: number; lower: number; width: number; color: string; cuff?: string;
  end: React.ReactNode;
}> = ({ x, y, a1, a2, mirror = 1, upper, lower, width, color, cuff, end }) => (
  <g transform={`translate(${x} ${y}) scale(${mirror} 1) rotate(${a1})`}>
    <line x1={0} y1={0} x2={0} y2={upper} stroke={color} strokeWidth={width} strokeLinecap="round" />
    <g transform={`translate(0 ${upper}) rotate(${a2})`}>
      <line x1={0} y1={0} x2={0} y2={lower} stroke={color} strokeWidth={width * 0.92} strokeLinecap="round" />
      {cuff && <line x1={0} y1={lower - 6} x2={0} y2={lower + 2} stroke={cuff} strokeWidth={width * 0.95} />}
      <g transform={`translate(0 ${lower + 4})`}>{end}</g>
    </g>
  </g>
);

export type ArmPose = { l1: number; l2: number; r1: number; r2: number };

export const lerpPose = (a: ArmPose, b: ArmPose, t: number): ArmPose => ({
  l1: a.l1 + (b.l1 - a.l1) * t,
  l2: a.l2 + (b.l2 - a.l2) * t,
  r1: a.r1 + (b.r1 - a.r1) * t,
  r2: a.r2 + (b.r2 - a.r2) * t,
});
