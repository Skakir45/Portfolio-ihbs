import "@fontsource/baloo-chettan-2/malayalam-600.css";
import "@fontsource/baloo-chettan-2/malayalam-800.css";
import "@fontsource/baloo-chettan-2/latin-600.css";
import "@fontsource/baloo-chettan-2/latin-800.css";
import { useEffect, useState } from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, continueRender, delayRender, interpolate,
  spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Gavel, Kuttan, SheruBhai } from "./Characters";

/* ---------- script ---------- all times in seconds, video is 1080x1920 @30fps, 120s */
export const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

type Line = { at: number; dur: number; who: "sheru" | "kuttan" | "narrator"; ml: string; en: string };

const STRUGGLE: Line[] = [
  { at: 9, dur: 3.8, who: "kuttan", ml: "ട്രേഡ് ലൈസൻസ് വേണം...", en: "I need a trade license..." },
  { at: 13, dur: 4.2, who: "kuttan", ml: "വിസ ഫയൽ റിജക്റ്റഡ്!", en: "Visa file rejected!" },
  { at: 17.5, dur: 3.8, who: "kuttan", ml: "ഈ അറ്റസ്റ്റേഷൻ എവിടെ കൊടുക്കും?", en: "Where do I even get this attested?" },
  { at: 21.5, dur: 4.3, who: "kuttan", ml: "മൂന്ന് മാസമായി ഓഫീസുകൾ കയറിയിറങ്ങുന്നു!", en: "Three months of running office to office!" },
];
const AUCTION: Line[] = [
  { at: 29, dur: 4.3, who: "narrator", ml: "ദുബായിൽ ആര് ഏറ്റവും വേഗത്തിൽ ബിസിനസ് തുടങ്ങും?", en: "Who can start a business in Dubai the fastest?" },
  { at: 33.5, dur: 3.8, who: "kuttan", ml: "ഞാൻ! വെറും 90 ദിവസം കൊണ്ട്!", en: "Me! In just 90 days!" },
  { at: 37.5, dur: 4.3, who: "narrator", ml: "അപ്പോഴാണ്...", en: "And then..." },
];
const ENTRANCE: Line[] = [
  { at: 48, dur: 5.8, who: "sheru", ml: "90 ദിവസമോ? അതൊക്കെ പഴയ കഥ.", en: "90 days? That's an old story." },
];
const BIDDING: Line[] = [
  { at: 54, dur: 3.4, who: "kuttan", ml: "ഞാൻ 5 ഓഫീസ് കയറിയിറങ്ങും!", en: "I'll visit 5 offices!" },
  { at: 57.5, dur: 4.4, who: "sheru", ml: "ഞാൻ ഒരു ഫോൺ കോൾ ചെയ്യും.", en: "I'll make one phone call." },
  { at: 62, dur: 3.4, who: "kuttan", ml: "ഞാൻ 10 ഫോമുകൾ ഫിൽ ചെയ്യും!", en: "I'll fill 10 forms!" },
  { at: 65.5, dur: 4.4, who: "sheru", ml: "എന്റെ പേപ്പർ വർക്ക് IHBS നോക്കും.", en: "IHBS handles my paperwork." },
  { at: 70, dur: 3.4, who: "kuttan", ml: "ഞാൻ 3 മാസം കാത്തിരിക്കും!", en: "I'll wait 3 months!" },
  { at: 73.5, dur: 3.4, who: "sheru", ml: "IHBS ഉള്ളപ്പോൾ എന്തിന് കാത്തിരിക്കണം?", en: "Why wait when you have IHBS?" },
  { at: 77, dur: 2.9, who: "kuttan", ml: "ഭായ്... ആ നമ്പർ ഒന്ന് തരാമോ?", en: "Bhai... can I get that number?" },
];
const SERVICES_LINES: Line[] = [
  { at: 82.5, dur: 2.4, who: "sheru", ml: "എന്റെ രഹസ്യം കേൾക്കണോ?", en: "Want to know my secret?" },
  { at: 100, dur: 3.8, who: "sheru", ml: "എല്ലാം ഒരു കുടക്കീഴിൽ!", en: "Everything under one roof!" },
];
const SERVICES = [
  { ml: "ട്രേഡ് ലൈസൻസ്", en: "Trade License", icon: "license" },
  { ml: "വിസ സേവനങ്ങൾ", en: "Visa Services", icon: "visa" },
  { ml: "ഡോക്യുമെന്റ് ക്ലിയറിങ്", en: "Document Clearing", icon: "doc" },
  { ml: "PRO സേവനങ്ങൾ", en: "PRO Services", icon: "pro" },
] as const;

/* ---------- look ---------- */
const GOLD = "#f2b632";
const NAVY = "#0b1b33";
const FONT = '"Baloo Chettan 2", "Noto Sans Malayalam", sans-serif';

const useSpringAt = (atSec: number, damping = 14) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - s(atSec), fps, config: { damping } });
};

const Bubble: React.FC<{ line: Line; offset: number }> = ({ line, offset }) => {
  const frame = useCurrentFrame() + offset;
  const { fps } = useVideoConfig();
  const start = s(line.at);
  const end = s(line.at + line.dur);
  if (frame < start || frame > end) return null;
  const pop = spring({ frame: frame - start, fps, config: { damping: 12, mass: 0.6 } });
  const out = interpolate(frame, [end - 6, end], [1, 0], { extrapolateLeft: "clamp" });
  const isSheru = line.who === "sheru";
  const isNarr = line.who === "narrator";
  const bg = isSheru ? GOLD : isNarr ? "#000000cc" : "#ffffff";
  const fg = isNarr ? "#ffffff" : "#111";
  return (
    <div
      style={{
        position: "absolute", left: 60, right: 60, top: 470,
        display: "flex", justifyContent: isNarr ? "center" : isSheru ? "flex-end" : "flex-start",
        transform: `scale(${pop})`, opacity: out,
        transformOrigin: isSheru ? "85% 100%" : isNarr ? "50% 50%" : "15% 100%",
      }}
    >
      <div style={{ position: "relative", maxWidth: 860, background: bg, color: fg, borderRadius: 40,
        padding: "34px 46px", fontFamily: FONT, boxShadow: "0 18px 40px #0007",
        border: isSheru ? "6px solid #111" : isNarr ? `4px solid ${GOLD}` : "6px solid #111" }}>
        {!isNarr && (
          <div style={{ fontSize: 34, fontWeight: 800, color: isSheru ? "#5a2c00" : "#c2410c", marginBottom: 4 }}>
            {isSheru ? "ഷേരു ഭായ്" : "കുട്ടൻ"}
          </div>
        )}
        <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.25 }}>{line.ml}</div>
        <div style={{ fontSize: 34, fontWeight: 600, opacity: 0.7, marginTop: 8 }}>{line.en}</div>
        {!isNarr && (
          <div style={{ position: "absolute", bottom: -40, [isSheru ? "right" : "left"]: 90, width: 0, height: 0,
            borderLeft: "30px solid transparent", borderRight: "30px solid transparent", borderTop: `44px solid #111` }} />
        )}
      </div>
    </div>
  );
};

const Bubbles: React.FC<{ lines: Line[]; offsetSec: number }> = ({ lines, offsetSec }) => (
  <>{lines.map((l) => <Bubble key={l.at} line={l} offset={s(offsetSec)} />)}</>
);

const isTalking = (lines: Line[], who: Line["who"], frame: number, offsetSec: number) => {
  const g = frame + s(offsetSec);
  return lines.some((l) => l.who === who && g >= s(l.at) && g <= s(l.at + l.dur - 0.6));
};

const Caption: React.FC<{ children: React.ReactNode; top: number; size?: number; color?: string; at?: number }> = ({
  children, top, size = 80, color = "white", at = 0,
}) => {
  const p = useSpringAt(at, 200);
  return (
    <div style={{ position: "absolute", top, left: 40, right: 40, textAlign: "center", fontFamily: FONT,
      fontWeight: 800, fontSize: size, color, lineHeight: 1.2, textShadow: "0 6px 24px #000c",
      opacity: p, transform: `translateY(${(1 - p) * 50}px)` }}>{children}</div>
  );
};

const Floor: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 380, background: color }} />
);

/* ---------- scenes (each Sequence-local; offsetSec = scene start) ---------- */

const HookLine: React.FC<{ at: number; size: number; color?: string; sub: string; children: React.ReactNode }> = ({ at, size, color = "white", sub, children }) => {
  const p = useSpringAt(at, 200);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 50}px)`, textShadow: "0 6px 24px #000c" }}>
      <div style={{ fontSize: size, fontWeight: 800, color, lineHeight: 1.25 }}>{children}</div>
      <div style={{ fontSize: 44, fontWeight: 600, color: "#dbe4f0", marginTop: 14 }}>{sub}</div>
    </div>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, s(8)], [1.25, 1.05]);
  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <Img src={staticFile("dubai-skyline.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg,#0b1b3355,#0b1b33ee 75%)" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 70, padding: "0 60px", textAlign: "center", fontFamily: FONT }}>
        <HookLine at={0} size={110} sub="Want to start a business in Dubai?">ദുബായിൽ ബിസിനസ് തുടങ്ങണോ?</HookLine>
        <HookLine at={3} size={124} color={GOLD} sub="A Sheru Bhai story">ഒരു ഷേരു ഭായ് കഥ</HookLine>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Struggle: React.FC = () => {
  const frame = useCurrentFrame();
  const day = Math.min(90, 1 + Math.floor(interpolate(frame, [0, s(17)], [0, 89], { extrapolateRight: "clamp" })));
  const stamp = useSpringAt(5.4, 10);
  const stampOn = frame >= s(5) && frame < s(9.5);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(#6b7280,#4b5563)" }}>
      {/* office wall: token display + queue numbers */}
      <div style={{ position: "absolute", top: 120, left: 80, right: 80, height: 180, background: "#111", borderRadius: 20,
        border: "6px solid #333", display: "flex", alignItems: "center", justifyContent: "space-around",
        fontFamily: "monospace", fontSize: 70, color: "#ef4444", fontWeight: 700 }}>
        <span>TOKEN 247</span><span style={{ color: "#facc15" }}>WAIT...</span>
      </div>
      <div style={{ position: "absolute", top: 340, right: 80, fontFamily: FONT, fontWeight: 800, fontSize: 56,
        color: "white", background: "#b91c1c", padding: "6px 30px", borderRadius: 16 }}>ദിവസം {day}</div>
      <Caption top={340} size={56} color="#fde68a" at={0}><span style={{ marginRight: 300 }}>ഇത് കുട്ടൻ.</span></Caption>
      <Floor color="#374151" />
      <div style={{ position: "absolute", bottom: 60, left: 190 }}>
        <Kuttan size={700} talking={isTalking(STRUGGLE, "kuttan", frame, 8)} mood={stampOn ? "shock" : "sad"} />
      </div>
      {stampOn && (
        <div style={{ position: "absolute", top: 1130, left: 0, right: 0, textAlign: "center" }}>
          <span style={{ display: "inline-block", fontFamily: "Arial Black, sans-serif", fontSize: 150, color: "#dc2626",
            border: "14px solid #dc2626", padding: "0 40px", borderRadius: 20, transform: `rotate(-14deg) scale(${3 - 2 * stamp})`,
            opacity: stamp, background: "#ffffffcc" }}>REJECTED</span>
        </div>
      )}
      <Bubbles lines={STRUGGLE} offsetSec={8} />
    </AbsoluteFill>
  );
};

const AuctionHall: React.FC<{ dim?: number }> = ({ dim = 0 }) => (
  <>
    <AbsoluteFill style={{ background: "repeating-linear-gradient(90deg,#7f1d1d 0 60px,#991b1b 60px 120px)" }} />
    <AbsoluteFill style={{ background: "linear-gradient(#0000,#000a)" }} />
    <Floor color="#3b1d0f" />
    <AbsoluteFill style={{ background: `rgba(0,0,0,${dim})` }} />
  </>
);

const Auction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hit = (t: number) => Math.max(0, 1 - Math.abs(frame - s(t)) / 6);
  const gavelAngle = -40 * Math.max(hit(1), hit(1.4));
  const dim = interpolate(frame, [s(11.5), s(15.5)], [0, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const banner = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill>
      <AuctionHall dim={dim} />
      <div style={{ position: "absolute", top: 130, left: 60, right: 60, textAlign: "center", fontFamily: FONT, fontWeight: 800,
        fontSize: 92, color: "#111", background: GOLD, borderRadius: 30, padding: "20px 0", border: "8px solid #111",
        transform: `scale(${banner})`, opacity: 1 - dim }}>
        ബിസിനസ് സെറ്റപ്പ് ലേലം
        <div style={{ fontSize: 38, fontWeight: 600 }}>BUSINESS SETUP AUCTION</div>
      </div>
      <div style={{ position: "absolute", top: 1040, right: 60, opacity: 1 - dim }}>
        <Gavel size={300} angle={gavelAngle} />
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 60, opacity: 1 - dim * 0.7 }}>
        <Kuttan size={560} talking={isTalking(AUCTION, "kuttan", frame, 26)} mood="sad" />
      </div>
      <Bubbles lines={AUCTION} offsetSec={26} />
    </AbsoluteFill>
  );
};

const Rays: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity, background: `repeating-conic-gradient(from ${frame * 0.6}deg at 50% 70%, #f2b63255 0deg 8deg, #0000 8deg 20deg)` }} />
  );
};

const Entrance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flash = interpolate(frame, [0, 10], [1, 0], { extrapolateRight: "clamp" });
  const shake = frame < 30 ? Math.sin(frame * 3) * (30 - frame) * 0.8 : 0;
  const rise = spring({ frame: frame - 6, fps, config: { damping: 18, mass: 1.4 } });
  const title = spring({ frame: frame - s(1.2), fps, config: { damping: 9 } });
  return (
    <AbsoluteFill style={{ transform: `translate(${shake}px, ${shake * 0.5}px)` }}>
      <AuctionHall dim={0.75} />
      <Rays opacity={rise} />
      <div style={{ position: "absolute", bottom: -40, left: 0, right: 0, display: "flex", justifyContent: "center",
        transform: `translateY(${(1 - rise) * 900}px)` }}>
        <SheruBhai size={820} talking={isTalking(ENTRANCE, "sheru", frame, 42)} smirk />
      </div>
      {frame < s(6) && (
        <div style={{ position: "absolute", top: 260, left: 0, right: 0, textAlign: "center", fontFamily: FONT, fontWeight: 800,
          fontSize: 150, color: GOLD, textShadow: "0 0 40px #f2b632, 0 8px 0 #000", transform: `scale(${title})` }}>
          ഷേരു ഭായ് എത്തി!
          <div style={{ fontSize: 50, color: "white", textShadow: "0 4px 12px #000" }}>The boss has arrived</div>
        </div>
      )}
      <Bubbles lines={ENTRANCE} offsetSec={42} />
      <AbsoluteFill style={{ background: "white", opacity: flash }} />
    </AbsoluteFill>
  );
};

const Bidding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = frame + s(54);
  const sold = g >= s(80);
  const soldPop = spring({ frame: g - s(80), fps, config: { damping: 8 } });
  const sheruTalk = isTalking(BIDDING, "sheru", frame, 54);
  const punch = BIDDING.filter((l) => l.who === "sheru").some((l) => g >= s(l.at) && g < s(l.at) + 8);
  const zoom = punch ? 1.04 : 1;
  const hit = (t: number) => Math.max(0, 1 - Math.abs(g - s(t)) / 6);
  return (
    <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
      <AuctionHall dim={0.35} />
      <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center", fontFamily: FONT, fontWeight: 800,
        fontSize: 70, color: GOLD, textShadow: "0 6px 16px #000" }}>
        ലേലം വിളി തുടങ്ങി!
        <div style={{ fontSize: 36, color: "white" }}>The bidding war begins</div>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: 10 }}>
        <Kuttan size={460} talking={isTalking(BIDDING, "kuttan", frame, 54)} mood={sold ? "shock" : "sad"} />
      </div>
      <div style={{ position: "absolute", bottom: -30, right: -10 }}>
        <SheruBhai size={560} talking={sheruTalk} smirk={!sheruTalk} />
      </div>
      <div style={{ position: "absolute", top: 1000, left: 400 }}>
        <Gavel size={240} angle={-40 * Math.max(hit(80), hit(80.4))} />
      </div>
      <Bubbles lines={BIDDING} offsetSec={54} />
      {sold && (
        <div style={{ position: "absolute", top: 420, left: 0, right: 0, textAlign: "center", transform: `scale(${soldPop}) rotate(-6deg)` }}>
          <div style={{ display: "inline-block", fontFamily: FONT, fontWeight: 800, fontSize: 130, color: "#111", background: GOLD,
            border: "10px solid #111", borderRadius: 30, padding: "10px 50px", boxShadow: "0 20px 60px #000" }}>
            വിറ്റുപോയി!
            <div style={{ fontSize: 56 }}>SOLD to Sheru Bhai!</div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Icon: React.FC<{ kind: (typeof SERVICES)[number]["icon"] }> = ({ kind }) => (
  <svg viewBox="0 0 100 100" width={130} height={130}>
    <circle cx={50} cy={50} r={48} fill={NAVY} />
    {kind === "license" && (<><rect x={24} y={22} width={52} height={60} rx={6} fill="#fff" /><path d="M34 40h32M34 52h32M34 64h18" stroke={NAVY} strokeWidth={6} /><circle cx={66} cy={68} r={10} fill={GOLD} /></>)}
    {kind === "visa" && (<><rect x={28} y={20} width={44} height={62} rx={6} fill={GOLD} /><circle cx={50} cy={44} r={11} fill="none" stroke={NAVY} strokeWidth={5} /><path d="M36 68h28" stroke={NAVY} strokeWidth={6} /></>)}
    {kind === "doc" && (<><path d="M28 18h32l14 14v50H28z" fill="#fff" /><path d="M38 56l9 9 17-20" stroke="#16a34a" strokeWidth={8} fill="none" strokeLinecap="round" /></>)}
    {kind === "pro" && (<><circle cx={36} cy={40} r={11} fill={GOLD} /><circle cx={64} cy={40} r={11} fill="#fff" /><path d="M18 76q18-26 36 0M46 76q18-26 36 0" fill="none" stroke="#fff" strokeWidth={7} /></>)}
  </svg>
);

const Services: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 30%, #1e3a6b, ${NAVY})` }}>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", fontFamily: FONT, fontWeight: 800,
        fontSize: 84, color: "white" }}>
        ഷേരു ഭായ്‌യുടെ രഹസ്യം
        <div style={{ color: GOLD, fontSize: 130, lineHeight: 1 }}>IHBS</div>
      </div>
      {frame < s(18) && <Bubbles lines={SERVICES_LINES.slice(0, 1)} offsetSec={82} />}
      <div style={{ position: "absolute", top: 760, left: 70, right: 70, display: "flex", flexDirection: "column", gap: 34 }}>
        {SERVICES.map((sv, i) => {
          const p = spring({ frame: frame - s(3 + i * 4), fps, config: { damping: 14 } });
          return (
            <div key={sv.en} style={{ display: "flex", alignItems: "center", gap: 36, background: "#ffffff", borderRadius: 32,
              padding: "22px 36px", border: `6px solid ${GOLD}`, opacity: p, transform: `translateX(${(1 - p) * (i % 2 ? 600 : -600)}px)` }}>
              <Icon kind={sv.icon} />
              <div style={{ fontFamily: FONT }}>
                <div style={{ fontSize: 66, fontWeight: 800, color: NAVY, lineHeight: 1.1 }}>{sv.ml}</div>
                <div style={{ fontSize: 38, fontWeight: 600, color: "#6b7280" }}>{sv.en}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", bottom: -260, right: -120, opacity: 0.95 }}>
        <SheruBhai size={420} talking={isTalking(SERVICES_LINES, "sheru", frame, 82)} smirk />
      </div>
      {frame >= s(18) && <Bubbles lines={SERVICES_LINES.slice(1)} offsetSec={82} />}
    </AbsoluteFill>
  );
};

const KUTTAN_END: Line[] = [
  { at: 104.5, dur: 3.3, who: "kuttan", ml: "ലൈസൻസ് റെഡി! താങ്ക്യൂ ഭായ്!", en: "License ready! Thank you, Bhai!" },
];

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = frame + s(104);
  const card = spring({ frame: frame - s(4), fps, config: { damping: 14 } });
  const punchT = [115.3, 115.8, 116.8, 117.3];
  const punchScale = punchT.reduce((m, t) => Math.max(m, Math.max(0, 1 - Math.abs(g - s(t)) / 5)), 0);
  const tad = spring({ frame: g - s(115.3), fps, config: { damping: 8 } });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 40%, #1e3a6b, ${NAVY})` }}>
      <Rays opacity={0.6} />
      {g >= s(115.3) ? null : frame < s(3.8) ? (
        <>
          <div style={{ position: "absolute", bottom: 40, left: 20 }}><Kuttan size={480} talking={isTalking(KUTTAN_END, "kuttan", frame, 104)} mood="happy" files={false} /></div>
          <div style={{ position: "absolute", bottom: -30, right: 0 }}><SheruBhai size={520} smirk /></div>
          <Bubbles lines={KUTTAN_END} offsetSec={104} />
        </>
      ) : (
        <div style={{ position: "absolute", top: 150, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center",
          gap: 26, opacity: card, transform: `translateY(${(1 - card) * 80}px)`, fontFamily: FONT, textAlign: "center" }}>
          <div style={{ background: "white", borderRadius: 40, padding: 30 }}>
            <Img src={staticFile("ihbs_logo.png")} style={{ width: 300 }} />
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, color: "white", lineHeight: 1.2 }}>ഇനി ഓടി നടക്കണ്ട.<br />IHBS-നെ വിളിക്കൂ!</div>
          <div style={{ fontSize: 40, color: "#dbe4f0" }}>No more running around. Call IHBS!</div>
          <div style={{ fontSize: 58, fontWeight: 800, color: GOLD }}>We Register, You Prosper</div>
          <div style={{ fontSize: 70, fontWeight: 800, color: "#111", background: GOLD, borderRadius: 24, padding: "8px 40px", marginTop: 10 }}>
            +971 56 179 6442
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, color: "white" }}>ihbs.ae</div>
        </div>
      )}
      {g >= s(115.3) && (
        <>
          <AbsoluteFill style={{ background: "#000c" }} />
          <div style={{ position: "absolute", bottom: -40, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <SheruBhai size={600} smirk />
          </div>
          <div style={{ position: "absolute", top: 380, left: 0, right: 0, textAlign: "center", fontFamily: FONT, fontWeight: 800,
            fontSize: 170, color: GOLD, textShadow: "0 0 50px #f2b632, 0 10px 0 #000", transform: `scale(${tad * (1 + punchScale * 0.12)})` }}>
            ടഡ്ബൻ<br />ടഡ്ബൻ!
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};

/** Optional voiceover: drop public/sheru-voiceover.mp3 (120s, same timeline) and set hasVoiceover. */
export const sheruDefaults = { hasVoiceover: false };

export const SheruPromo: React.FC<typeof sheruDefaults> = ({ hasVoiceover }) => {
  const [handle] = useState(() => delayRender("Loading Malayalam font"));
  useEffect(() => {
    Promise.all([
      document.fonts.load(`800 60px "Baloo Chettan 2"`, "മലയാളം"),
      document.fonts.load(`600 60px "Baloo Chettan 2"`, "മലയാളം"),
      document.fonts.load(`800 60px "Baloo Chettan 2"`, "IHBS"),
    ]).then(() => continueRender(handle));
  }, [handle]);
  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <Audio src={staticFile("sheru-music.mp3")} volume={hasVoiceover ? 0.35 : 0.9} />
      {hasVoiceover && <Audio src={staticFile("sheru-voiceover.mp3")} />}
      <Sequence durationInFrames={s(8)}><Hook /></Sequence>
      <Sequence from={s(8)} durationInFrames={s(18)}><Struggle /></Sequence>
      <Sequence from={s(26)} durationInFrames={s(16)}><Auction /></Sequence>
      <Sequence from={s(42)} durationInFrames={s(12)}><Entrance /></Sequence>
      <Sequence from={s(54)} durationInFrames={s(28)}><Bidding /></Sequence>
      <Sequence from={s(82)} durationInFrames={s(22)}><Services /></Sequence>
      <Sequence from={s(104)} durationInFrames={s(16)}><Cta /></Sequence>
    </AbsoluteFill>
  );
};
