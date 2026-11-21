import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Consultant, CONSULTANT_POSES as CP } from "../characters/Consultant";
import { lerpPose } from "../characters/Limb";
import { SheruBhai, SHERU_POSES as SP } from "../characters/SheruBhai";
import { DubaiBackdrop, PremiumStudio, SpeedLines } from "../env/Backdrops";
import { GoldenCar, MoneyBurst, Sparkle, Suitcase, Sunglasses } from "../props/Props";
import { isTalking } from "../script";
import { DISPLAY_FONT, f, GOLD, GOLD_LIGHT, keys, NAVY, SUB_FONT, tween, WHITE } from "../theme";
import { Camera, PopText, ServiceCard } from "../ui/UI";

const FEET = 1300;
/** Character height in px for a given width (viewBox 400x820, feet at 810). */
const feetTop = (width: number, feet = FEET) => feet - width * 2.05 * (810 / 820);

const Place: React.FC<{ x: number; width: number; feet?: number; z?: number; children: React.ReactNode }> = ({ x, width, feet = FEET, z, children }) => (
  <div style={{ position: "absolute", left: x, top: feetTop(width, feet), zIndex: z }}>{children}</div>
);

/** Smooth 0..1 pose blend that starts at `at` (scene-local seconds). */
const blend = (frame: number, at: number, dur = 0.35) => tween(frame, [at, at + dur], [0, 1], Easing.inOut(Easing.quad));

/* ============ SCENE 1 — THE ARRIVAL (global 0–8) ============ */
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = frame / fps; // scene starts at global 0
  const carX = tween(frame, [0.4, 3.0], [1250, 400], Easing.out(Easing.cubic));
  const carSettle = spring({ frame: frame - f(3.0), fps, config: { damping: 6, stiffness: 180 } });
  const carRock = frame > f(3.0) ? (1 - carSettle) * -4 : tween(frame, [0.4, 3.0], [2, 0]);
  const camScale = keys(frame, [[0, 1.0], [3.0, 1.14], [5.5, 1.1], [8, 1.06]]);
  const camX = keys(frame, [[0, 0], [3.0, -60], [8, -20]]);

  // Sheru hop out of car: 3.6 -> 4.4
  const hop = tween(frame, [3.6, 4.4], [0, 1], Easing.inOut(Easing.quad));
  const inCar = frame < f(3.6);
  const sheruW = 300 + hop * 50;
  const startX = carX + 250;
  const startTop = 1300 - 272 - 330;
  const endX = 470;
  const endTop = feetTop(350);
  const hopX = startX + (endX - startX) * hop;
  const hopTop = startTop + (endTop - startTop) * hop - Math.sin(hop * Math.PI) * 220;

  const consX = tween(frame, [0, 2.8], [-420, 30], Easing.out(Easing.quad));
  const consWalking = frame < f(2.8);
  const consPose = lerpPose(lerpPose(CP.idle, CP.wave, blend(frame, 3.2)), CP.idle, blend(frame, 5.3));
  const wavePose = { ...consPose, r2: consPose.r2 + (frame > f(3.2) && frame < f(5.4) ? Math.sin(frame / 3) * 18 : 0) };
  const sheruPose = lerpPose(lerpPose(SP.idle, SP.raiseRight, blend(frame, 5.6)), SP.hipsBoss, blend(frame, 7.4));

  const dust = frame > f(2.8) && frame < f(4.0);
  const titleIn = spring({ frame: frame - f(0.3), fps, config: { damping: 200 } });
  const titleOut = tween(frame, [2.6, 3.1], [1, 0]);

  return (
    <AbsoluteFill>
      <Camera scale={camScale} x={camX} oy={1150}>
        <DubaiBackdrop panX={carX * 0.3} />
        <Place x={consX} width={330}>
          <Consultant width={330} walk={consWalking ? frame / 4 : undefined} pose={wavePose} openHand={frame > f(3.2) && frame < f(5.4)}
            talking={isTalking("consultant", g)} expr={frame > f(3.0) ? "smile" : "smile"} headTilt={frame > f(5.6) ? 4 : 0} />
        </Place>
        {/* car with Sheru inside */}
        <div style={{ position: "absolute", left: carX, top: 1300 - 272 + 20, transform: `rotate(${carRock}deg)`, transformOrigin: "50% 100%" }}>
          <GoldenCar width={680} wheelSpin={-carX * 0.9}>
            {inCar && (
              <div style={{ position: "absolute", left: 250, top: -330 }}>
                <SheruBhai width={300} expr="boss" headTilt={Math.sin(frame / 8) * 3} />
              </div>
            )}
          </GoldenCar>
        </div>
        {dust && [0, 1, 2, 3, 4].map((i) => {
          const t = (frame - f(2.8)) / 36;
          return <div key={i} style={{ position: "absolute", left: carX + 620 + i * 30 + t * 120, top: 1270 - t * 60 - i * 8, width: 60 + t * 80, height: 60 + t * 80,
            borderRadius: "50%", background: "#d9c7a0", opacity: 0.55 * (1 - t), transform: "translate(-50%,-50%)" }} />;
        })}
        {!inCar && (
          <div style={{ position: "absolute", left: hopX, top: hopTop }}>
            <SheruBhai width={sheruW} talking={isTalking("sheru", g)} pose={hop < 1 ? SP.bothUp : sheruPose} expr={hop < 1 ? "grin" : "boss"}
              headTilt={frame > f(5.6) && frame < f(7.8) ? -5 : 0} />
          </div>
        )}
      </Camera>
      {/* location title */}
      <div style={{ position: "absolute", top: 230, left: 0, right: 0, textAlign: "center", opacity: titleIn * titleOut,
        transform: `translateY(${(1 - titleIn) * 40}px)` }}>
        <div style={{ fontFamily: SUB_FONT, fontWeight: 800, fontSize: 40, letterSpacing: 18, color: WHITE }}>DUBAI</div>
        <div style={{ fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: 110, color: GOLD, textShadow: "0 8px 30px #000a" }}>ദുബായ്</div>
      </div>
    </AbsoluteFill>
  );
};

/* ============ SCENE 2 — THE CRAZY OFFER (global 8–17) ============ */
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = 8 + frame / fps;
  const drop = spring({ frame: frame - 2, fps, config: { damping: 9, stiffness: 140 } });
  const open = tween(frame, [1.0, 1.5], [0, 1], Easing.out(Easing.back(1.6)));
  const glow = tween(frame, [1.0, 1.6], [0, 1]);
  const camScale = keys(frame, [[0, 1.12], [9, 1.24]]);
  const shake = frame > f(1.0) && frame < f(1.5) ? 10 : 0;
  const beat = Math.max(0, Math.sin((frame - f(1.4)) / 5));
  const sheruPose = lerpPose(SP.hug, SP.count, blend(frame, 0.7));
  const countPose = { ...sheruPose, r1: sheruPose.r1 + (frame > f(1.4) ? beat * 12 : 0) };
  const consShock = frame > f(1.3);
  const rays = tween(frame, [1.0, 1.8], [0, 1]);

  return (
    <AbsoluteFill>
      <Camera scale={camScale} oy={1100} shake={shake}>
        <DubaiBackdrop panX={340} dim={0.35} />
        <AbsoluteFill style={{ opacity: rays * 0.9, background: `repeating-conic-gradient(from ${frame * 0.8}deg at 50% 60%, rgba(243,215,122,0.28) 0deg 7deg, transparent 7deg 18deg)` }} />
        <Place x={-30} width={330}>
          <Consultant width={330} pose={lerpPose(CP.idle, CP.shock, blend(frame, 1.3))} expr={consShock ? "shock" : "smile"} talking={isTalking("consultant", g)} />
        </Place>
        <Place x={560} width={370}>
          <SheruBhai width={370} pose={countPose} expr="grin" talking={isTalking("sheru", g)} headTilt={Math.sin(frame / 10) * 4} />
        </Place>
        <div style={{ position: "absolute", left: 300, top: 1300 - 290 + (1 - drop) * -900, zIndex: 3 }}>
          <Suitcase width={460} open={open} glow={glow} />
        </div>
        <MoneyBurst ox={530} oy={1120} startSec={1.3} endSec={7.6} count={48} />
      </Camera>
      <PopText atSec={1.5} untilSec={3.0} top={210} size={110} rot={-4} font={DISPLAY_FONT}>1 മില്യൺ!</PopText>
      <PopText atSec={3.0} untilSec={4.7} top={210} size={120} rot={3} font={DISPLAY_FONT}>2 ട്രില്യൺ!!</PopText>
      <PopText atSec={4.7} untilSec={8.4} top={190} size={100} rot={-3} font={DISPLAY_FONT} color={GOLD_LIGHT}>ഗുപ്ചുപ് ഹുപ് ഹുപ്<br />ഡോളർ!!!</PopText>
    </AbsoluteFill>
  );
};

/* ============ SCENE 3 — THE TWIST (global 17–27) ============ */
const GLASSES_FALL = 7.7; // scene-local, = global 24.7

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = 17 + frame / fps;
  const sheruX = 620;
  const sheruW = 360;
  const sheruTop = feetTop(sheruW);
  const headX = sheruX + sheruW / 2;
  const headY = sheruTop + 200 * (sheruW / 400);
  const zoom = tween(frame, [7.5, 7.95], [1, 1.75], Easing.out(Easing.cubic));
  const fallen = frame >= f(GLASSES_FALL);

  // Consultant poses
  let cPose = CP.idle;
  cPose = lerpPose(cPose, CP.handsUp, blend(frame, 0.3));
  cPose = lerpPose(cPose, CP.stop, blend(frame, 1.6));
  cPose = lerpPose(cPose, CP.idle, blend(frame, 3.0));
  cPose = lerpPose(cPose, CP.pointUp, blend(frame, 5.2));
  const cExpr = frame < f(3.0) ? "laugh" : frame > f(5.2) ? "proud" : "smile";

  // Sheru poses
  let sPose = SP.idle;
  sPose = lerpPose(sPose, SP.shrug, blend(frame, 3.2));
  sPose = lerpPose(sPose, SP.idle, blend(frame, 5.0));
  sPose = lerpPose(sPose, SP.shock, blend(frame, GLASSES_FALL, 0.2));
  const sExpr = fallen ? "shock" : frame > f(3.1) && frame < f(5.2) ? "confused" : "boss";

  // Sunglasses physics (screen space, before camera zoom is applied they live inside the camera)
  const t = Math.max(0, frame - f(GLASSES_FALL));
  const gy0 = headY - 15;
  const groundY = FEET - 10;
  let gy = gy0 - 14 * t + 0.6 * t * t;
  let bounceT = 0;
  const tHit = (14 + Math.sqrt(14 * 14 + 4 * 0.3 * (groundY - gy0))) / (2 * 0.3);
  if (t > tHit) {
    bounceT = t - tHit;
    gy = groundY - Math.max(0, 9 * bounceT - 0.6 * bounceT * bounceT);
  }
  const gx = headX + t * 4.5;
  const grot = Math.min(t, tHit) * 16 + (t > tHit ? 720 : 0) * 0;

  const badge = spring({ frame: frame - f(6.0), fps, config: { damping: 10 } });
  const scratchFreeze = frame < 6 ? 1 + (6 - frame) * 0.01 : 1;

  return (
    <AbsoluteFill>
      <Camera scale={zoom * scratchFreeze} ox={headX} oy={headY} shake={frame > f(GLASSES_FALL) && frame < f(GLASSES_FALL + 0.6) ? 12 : 0}>
        <DubaiBackdrop panX={180} dim={0.15} />
        {fallen && <SpeedLines cx={headX} cy={headY} opacity={tween(frame, [GLASSES_FALL, GLASSES_FALL + 0.2], [0, 1])} />}
        <Place x={40} width={350}>
          <Consultant width={350} pose={cPose} expr={cExpr} talking={isTalking("consultant", g)} openHand={frame > f(1.6) && frame < f(3.0)} />
        </Place>
        <div style={{ position: "absolute", left: 400, top: 1300 - 180 }}>
          <Suitcase width={280} open={1} glow={0.4} />
        </div>
        <Place x={sheruX} width={sheruW}>
          <SheruBhai width={sheruW} pose={sPose} expr={sExpr} glasses={!fallen} talking={isTalking("sheru", g)}
            headTilt={sExpr === "confused" ? 9 : 0} />
        </Place>
        {fallen && (
          <div style={{ position: "absolute", left: gx, top: gy, transform: `translate(-50%,-50%) rotate(${grot}deg)` }}>
            <Sunglasses width={200} />
          </div>
        )}
        {/* IHBS badge reveal */}
        {frame > f(6.0) && (
          <div style={{ position: "absolute", left: 215, top: 430, transform: `translate(-50%,-50%) scale(${badge})` }}>
            <div style={{ width: 230, height: 230, borderRadius: "50%", background: WHITE, border: `10px solid ${GOLD}`, boxShadow: "0 0 60px rgba(212,175,55,0.8)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("ihbs_logo.png")} style={{ width: 190 }} />
            </div>
            <Sparkle x={0} y={10} size={50} delay={0} />
            <Sparkle x={220} y={30} size={40} delay={13} />
            <Sparkle x={200} y={210} size={46} delay={26} />
          </div>
        )}
      </Camera>
    </AbsoluteFill>
  );
};

/* ============ SCENE 4 — IHBS SERVICES (global 27–38) ============ */
export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = 27 + frame / fps;
  const head = spring({ frame: frame - 4, fps, config: { damping: 200 } });
  const allGlow = Math.max(0, 1 - Math.abs(frame - f(5.6)) / 12);
  const cPose = lerpPose(CP.idle, CP.present, blend(frame, 0.6));
  const sPose = lerpPose(SP.idle, SP.hug, blend(frame, 6.8));
  return (
    <AbsoluteFill>
      <Camera scale={keys(frame, [[0, 1.0], [11, 1.04]])}>
        <PremiumStudio />
        <div style={{ position: "absolute", top: 95, left: 0, right: 0, textAlign: "center", opacity: head, transform: `translateY(${(1 - head) * -30}px)` }}>
          <div style={{ fontFamily: SUB_FONT, fontWeight: 800, fontSize: 30, letterSpacing: 12, color: GOLD }}>OUR SERVICES</div>
          <div style={{ fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: 76, color: WHITE, lineHeight: 1.3 }}>IHBS സേവനങ്ങൾ</div>
        </div>
        <div style={{ position: "absolute", top: 290, left: 60, right: 60, display: "flex", flexDirection: "column", gap: 28,
          filter: allGlow > 0 ? `drop-shadow(0 0 ${allGlow * 30}px rgba(212,175,55,0.9))` : undefined }}>
          <ServiceCard atSec={1.0} en="TRADE LICENSE" ml="ട്രേഡ് ലൈസൻസ്" icon="license" fromLeft />
          <ServiceCard atSec={2.6} en="VISA SERVICES" ml="വിസ സർവീസസ്" icon="visa" fromLeft={false} />
          <ServiceCard atSec={4.2} en="DOCUMENT CLEARING" ml="ഡോക്യുമെന്റ് ക്ലിയറിംഗ്" icon="doc" fromLeft />
        </div>
        <Place x={10} width={230} feet={1330}>
          <Consultant width={230} pose={cPose} expr={frame > f(6.4) ? "proud" : "smile"} talking={isTalking("consultant", g)} openHand />
        </Place>
        <div style={{ position: "absolute", left: 690, top: 1330 - 130 }}>
          <Suitcase width={210} open={1} glow={0.6 + 0.3 * Math.sin(frame / 8)} />
        </div>
        <Place x={790} width={250} feet={1330}>
          <SheruBhai width={250} pose={sPose} glasses={false} expr={frame > f(6.8) ? "relieved" : "grin"} talking={isTalking("sheru", g)}
            headTilt={frame > f(7) ? -8 + Math.sin(frame / 6) * 3 : 0} />
        </Place>
        {frame > f(7.2) && [0, 1, 2, 3].map((i) => <Sparkle key={i} x={760 + i * 70} y={1100 - (i % 2) * 60} size={44} delay={i * 9} />)}
      </Camera>
    </AbsoluteFill>
  );
};

/* ============ SCENE 5 — THE ENDING + BRAND (global 38–50) ============ */
const IRIS = 4.3; // local

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = 38 + frame / fps;
  const close = tween(frame, [0.15, 0.55], [1, 0], Easing.in(Easing.quad));
  const slamShake = frame > f(0.55) && frame < f(0.9) ? 14 : 0;
  const glassesOn = frame >= f(1.0);
  const glassesDrop = tween(frame, [0.65, 1.0], [-700, 0], Easing.in(Easing.quad));
  const dancing = frame > f(1.0) && frame < f(IRIS);
  const bounce = dancing ? Math.abs(Math.sin((frame - f(1.0)) / 4.8)) * 26 : 0;
  const dancePose = Math.floor((frame - f(1.0)) / 15) % 2 === 0 ? SP.bothUp : SP.thumbsUp;
  const sPose = dancing ? lerpPose(SP.idle, dancePose, Math.min(1, ((frame - f(1.0)) % 15) / 6)) : SP.idle;
  const iris = tween(frame, [IRIS, IRIS + 0.6], [0, 1500], Easing.in(Easing.cubic));
  const sheruW = 400;
  const sheruX = 420;
  const top = feetTop(sheruW);

  return (
    <AbsoluteFill>
      {frame < f(IRIS + 0.7) && (
        <Camera scale={keys(frame, [[0, 1.08], [IRIS, 1.0]])} shake={slamShake}>
          <DubaiBackdrop panX={60} />
          <Place x={-10} width={320}>
            <Consultant width={320} pose={lerpPose(CP.idle, CP.thumbsUp, blend(frame, 1.2))} thumb={frame > f(1.4)} expr="laugh"
              talking={isTalking("consultant", g)} />
          </Place>
          <Place x={sheruX} width={sheruW}>
            <SheruBhai width={sheruW} pose={sPose} bounce={bounce} glasses={glassesOn} expr="grin" thumb={dancing}
              talking={isTalking("sheru", g)} headTilt={dancing ? Math.sin(frame / 5) * 6 : 0} />
          </Place>
          {!glassesOn && frame > f(0.65) && (
            <div style={{ position: "absolute", left: sheruX + sheruW / 2, top: top + 190 * (sheruW / 400) + glassesDrop, transform: "translate(-50%,-50%)" }}>
              <Sunglasses width={190} />
            </div>
          )}
          <div style={{ position: "absolute", left: 180, top: 1300 - 230, zIndex: 3 }}>
            <Suitcase width={360} open={close} glow={close} />
          </div>
          {frame > f(0.55) && frame < f(1.2) && [0, 1, 2, 3].map((i) => {
            const t = (frame - f(0.55)) / 20;
            return <div key={i} style={{ position: "absolute", left: 360 + (i - 1.5) * 140 * (1 + t), top: 1290 - t * 40, width: 70 + t * 70, height: 50 + t * 50,
              borderRadius: "50%", background: "#e8dcc0", opacity: 0.6 * (1 - t), transform: "translate(-50%,-50%)" }} />;
          })}
        </Camera>
      )}
      <PopText atSec={1.0} untilSec={IRIS} top={200} size={104} rot={-3} font={DISPLAY_FONT}>IHBS സൂപ്പർ ഭായ്!</PopText>
      {/* iris into brand */}
      {frame > f(IRIS) && (
        <div style={{ position: "absolute", left: 540, top: 760, width: iris * 2, height: iris * 2, borderRadius: "50%", background: NAVY,
          transform: "translate(-50%,-50%)", border: `${Math.min(30, iris / 20)}px solid ${GOLD}` }} />
      )}
      {frame > f(IRIS + 0.45) && <Brand startSec={IRIS + 0.45} />}
    </AbsoluteFill>
  );
};

const Brand: React.FC<{ startSec: number }> = ({ startSec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = (s: number, damping = 14) => spring({ frame: frame - f(startSec + s), fps, config: { damping } });
  const logo = at(0.2, 11);
  const ringRot = frame * 0.8;
  const letters = "IHBS".split("");
  const line = interpolate(frame, [f(startSec + 1.9), f(startSec + 2.5)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sweep = interpolate(frame, [f(startSec + 5.2), f(startSec + 6.0)], [-40, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 1 + Math.max(0, Math.sin((frame - f(startSec + 3.4)) / 6)) * 0.03;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 32%, #15345f 0%, ${NAVY} 62%)`, alignItems: "center" }}>
      {Array.from({ length: 26 }, (_, i) => {
        const x = (i * 97) % 1080;
        const y = 1920 - (((frame * (1 + (i % 4) * 0.4)) + i * 140) % 2100);
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 6 + (i % 3) * 3, height: 6 + (i % 3) * 3, borderRadius: "50%", background: GOLD, opacity: 0.35 }} />;
      })}
      {/* logo badge with rotating gold ring */}
      <div style={{ position: "absolute", top: 230, width: 360, height: 360, transform: `scale(${logo})` }}>
        <svg viewBox="0 0 360 360" width={360} height={360} style={{ position: "absolute", inset: 0, transform: `rotate(${ringRot}deg)` }}>
          <circle cx={180} cy={180} r={170} fill="none" stroke={GOLD} strokeWidth={6} strokeDasharray="40 18" />
        </svg>
        <div style={{ position: "absolute", inset: 28, borderRadius: "50%", background: WHITE, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 70px rgba(212,175,55,0.55)" }}>
          <Img src={staticFile("ihbs_logo.png")} style={{ width: 260 }} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 640, display: "flex", gap: 10, overflow: "hidden", padding: "0 20px" }}>
        {letters.map((c, i) => {
          const p = at(0.9 + i * 0.09, 12);
          return (
            <span key={i} style={{ fontFamily: SUB_FONT, fontWeight: 800, fontSize: 200, lineHeight: 1.05, display: "inline-block",
              background: `linear-gradient(100deg, ${GOLD} 0%, ${GOLD_LIGHT} ${sweep - 10}%, #fffbe6 ${sweep}%, ${GOLD_LIGHT} ${sweep + 10}%, ${GOLD} 100%)`,
              WebkitBackgroundClip: "text", color: "transparent", opacity: p, transform: `translateY(${(1 - p) * 120}px)` }}>{c}</span>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 870, fontFamily: SUB_FONT, fontWeight: 600, fontSize: 38, color: WHITE, opacity: at(1.5, 200),
        letterSpacing: 4 + (1 - at(1.5, 200)) * 20, textAlign: "center", width: 1000 }}>
        INSIGHT HUB BUSINESS SERVICES
      </div>
      <div style={{ position: "absolute", top: 950, width: 560 * line, height: 4, background: GOLD, borderRadius: 2 }} />
      <div style={{ position: "absolute", top: 990, fontFamily: SUB_FONT, fontWeight: 800, fontSize: 52, color: GOLD, letterSpacing: 3,
        opacity: at(2.4, 200), transform: `translateY(${(1 - at(2.4, 200)) * 30}px)` }}>
        WE REGISTER, YOU PROSPER.
      </div>
      <div style={{ position: "absolute", top: 1150, display: "flex", alignItems: "center", gap: 22, background: WHITE, borderRadius: 999,
        padding: "20px 44px", boxShadow: "0 14px 40px #0008", opacity: at(3.2), transform: `scale(${at(3.2) * pulse})` }}>
        <svg viewBox="0 0 32 32" width={64} height={64}>
          <circle cx={16} cy={16} r={16} fill="#25D366" />
          <path d="M9 23l1.2-3.6A7.5 7.5 0 1 1 13 22z" fill="none" stroke="#fff" strokeWidth={2} />
          <path d="M13 12.5c.3 2.6 2.6 5 5.2 5.4l1.1-1.2 1.7.9c-.3 1.2-1.4 1.8-2.6 1.6-3.4-.6-6.1-3.3-6.6-6.7-.2-1.2.5-2.2 1.6-2.5l.9 1.7z" fill="#fff" />
        </svg>
        <div>
          <div style={{ fontFamily: SUB_FONT, fontWeight: 600, fontSize: 28, color: "#5b6b80", lineHeight: 1.1 }}>WhatsApp</div>
          <div style={{ fontFamily: SUB_FONT, fontWeight: 800, fontSize: 58, color: NAVY, lineHeight: 1.15 }}>+971 56 179 6442</div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 1345, fontFamily: SUB_FONT, fontWeight: 800, fontSize: 46, color: WHITE, opacity: at(3.9, 200), lineHeight: 1.5 }}>
        ഇന്ന് തന്നെ WhatsApp ചെയ്യൂ!
      </div>
      <div style={{ position: "absolute", top: 1430, fontFamily: SUB_FONT, fontWeight: 600, fontSize: 40, color: GOLD_LIGHT, opacity: at(4.3, 200), letterSpacing: 2 }}>
        ihbs.ae
      </div>
    </AbsoluteFill>
  );
};
