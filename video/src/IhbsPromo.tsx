import {
  AbsoluteFill, Img, Sequence, interpolate, spring, staticFile,
  useCurrentFrame, useVideoConfig,
} from "remotion";

export const promoSchemaDefaults = {
  headline: "We Register, You Prosper",
  services: ["Trade License", "Visa Services", "Document Clearing", "PRO Services"],
  cta: "Start your UAE business today",
};
type Props = typeof promoSchemaDefaults;

const GOLD = "#d4a64a";
const NAVY = "#0b1b33";
const font = "Inter, Helvetica, Arial, sans-serif";

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; size: number; color?: string; weight?: number }> =
  ({ children, delay = 0, size, color = "white", weight = 700 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
    return (
      <div style={{ fontFamily: font, fontSize: size, fontWeight: weight, color, textAlign: "center",
        opacity: s, transform: `translateY(${(1 - s) * 40}px)` }}>{children}</div>
    );
  };

const Intro: React.FC<Props> = ({ headline }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const logo = spring({ frame, fps, config: { damping: 12 } });
  const zoom = interpolate(frame, [0, 120], [1.15, 1]);
  return (
    <AbsoluteFill>
      <Img src={staticFile("dubai-skyline.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${NAVY}cc, ${NAVY}f2)` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40, padding: 80 }}>
        <Img src={staticFile("ihbs_logo.png")} style={{ width: width * 0.22, transform: `scale(${logo})` }} />
        <FadeUp delay={20} size={width * 0.05}>{headline}</FadeUp>
        <FadeUp delay={35} size={width * 0.022} color={GOLD} weight={500}>PRO Services in the UAE</FadeUp>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Services: React.FC<Props> = ({ services }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const vertical = height > width;
  return (
    <AbsoluteFill style={{ background: NAVY, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <FadeUp size={width * 0.04}>What we do</FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: vertical ? "1fr" : "1fr 1fr", gap: 32, marginTop: 60, width: "100%", maxWidth: 1500 }}>
        {services.map((s, i) => {
          const p = spring({ frame: frame - 15 - i * 10, fps, config: { damping: 200 } });
          return (
            <div key={s} style={{ fontFamily: font, fontSize: width * (vertical ? 0.06 : 0.028), fontWeight: 600, color: "white",
              border: `3px solid ${GOLD}`, borderRadius: 24, padding: "36px 44px", opacity: p,
              transform: `translateX(${(1 - p) * (i % 2 ? 80 : -80)}px)` }}>
              <span style={{ color: GOLD, marginRight: 20 }}>✓</span>{s}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC<Props> = ({ cta }) => {
  const { width } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle, #16335e, ${NAVY})`, justifyContent: "center", alignItems: "center", gap: 40, padding: 80 }}>
      <Img src={staticFile("ihbs_logo.png")} style={{ width: width * 0.16 }} />
      <FadeUp delay={5} size={width * 0.045}>{cta}</FadeUp>
      <FadeUp delay={20} size={width * 0.025} color={GOLD} weight={500}>Contact IHBS</FadeUp>
    </AbsoluteFill>
  );
};

export const IhbsPromo: React.FC<Props> = (props) => (
  <AbsoluteFill style={{ background: NAVY }}>
    <Sequence durationInFrames={120}><Intro {...props} /></Sequence>
    <Sequence from={120} durationInFrames={150}><Services {...props} /></Sequence>
    <Sequence from={270}><Outro {...props} /></Sequence>
  </AbsoluteFill>
);
