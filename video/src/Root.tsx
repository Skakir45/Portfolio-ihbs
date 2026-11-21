import { Composition } from "remotion";
import { IhbsPromo, promoSchemaDefaults } from "./IhbsPromo";
import { FPS, SheruPromo, sheruDefaults } from "./sheru/SheruPromo";
import { SheruAd, adDefaults } from "./ad50/SheruAd";
import { DURATION_SEC } from "./ad50/theme";

export const RemotionRoot = () => (
  <>
    {/* 16:9 for YouTube / website */}
    <Composition id="IhbsPromo" component={IhbsPromo} durationInFrames={360}
      fps={30} width={1920} height={1080} defaultProps={promoSchemaDefaults} />
    {/* 9:16 for Reels / TikTok / Shorts */}
    <Composition id="IhbsPromoVertical" component={IhbsPromo} durationInFrames={360}
      fps={30} width={1080} height={1920} defaultProps={promoSchemaDefaults} />
    {/* 2-minute Malayalam "Sheru Bhai" marketing reel, 9:16 */}
    <Composition id="SheruBhaiIHBS" component={SheruPromo} durationInFrames={120 * FPS}
      fps={FPS} width={1080} height={1920} defaultProps={sheruDefaults} />
    {/* 50-second Malayalam comedy ad: Sheru Bhai x IHBS consultant, 9:16 */}
    <Composition id="SheruIHBSAd50" component={SheruAd} durationInFrames={DURATION_SEC * FPS}
      fps={FPS} width={1080} height={1920} defaultProps={adDefaults} />
  </>
);
