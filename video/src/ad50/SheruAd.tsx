import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, staticFile } from "remotion";
import { Scene1, Scene2, Scene3, Scene4, Scene5 } from "./scenes/Scenes";
import { LINES, SCENES } from "./script";
import { f, NAVY } from "./theme";
import { GoldWipe, Subtitles } from "./ui/UI";

export const adDefaults = {
  /** Set true after adding public/ad50/voiceover.mp3 (one 50s file on the script timeline). */
  hasVoiceover: false,
  showSubtitles: true,
};

const SCENE_COMPONENTS = [Scene1, Scene2, Scene3, Scene4, Scene5];
const WIPE = 16;

export const SheruAd: React.FC<typeof adDefaults> = ({ hasVoiceover, showSubtitles }) => {
  const [handle] = useState(() => delayRender("Loading Malayalam fonts"));
  useEffect(() => {
    Promise.all(
      [
        '800 52px "Noto Sans Malayalam"',
        '600 28px "Noto Sans Malayalam"',
        '800 100px "Baloo Chettan 2"',
      ].map((font) => document.fonts.load(font, "മലയാളം IHBS")),
    ).then(() => continueRender(handle));
  }, [handle]);

  // Duck music under dialogue when a real voiceover is present.
  const musicVolume = (frame: number) => {
    if (!hasVoiceover) return 0.85;
    const sec = frame / 30;
    const speaking = LINES.some((l) => sec >= l.at - 0.2 && sec <= l.end + 0.2);
    return speaking ? 0.28 : 0.7;
  };

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <Audio src={staticFile("ad50/music.mp3")} volume={musicVolume} />
      <Audio src={staticFile("ad50/sfx.mp3")} volume={0.9} />
      {hasVoiceover && <Audio src={staticFile("ad50/voiceover.mp3")} />}
      {SCENES.map((s, i) => {
        const C = SCENE_COMPONENTS[i];
        return (
          <Sequence key={s.n} from={f(s.from)} durationInFrames={f(s.to - s.from)} name={`Scene ${s.n} — ${s.name}`}>
            <C />
          </Sequence>
        );
      })}
      {showSubtitles && <Subtitles hideAfterSec={42.3} />}
      {SCENES.slice(1, 5).map((s) => (
        <Sequence key={`w${s.n}`} from={f(s.from) - WIPE / 2} durationInFrames={WIPE} name={`Wipe → ${s.n}`}>
          <GoldWipe durationFrames={WIPE} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
