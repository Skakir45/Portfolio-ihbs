import { Composition } from "remotion";
import { IhbsPromo, promoSchemaDefaults } from "./IhbsPromo";

export const RemotionRoot = () => (
  <>
    {/* 16:9 for YouTube / website */}
    <Composition id="IhbsPromo" component={IhbsPromo} durationInFrames={360}
      fps={30} width={1920} height={1080} defaultProps={promoSchemaDefaults} />
    {/* 9:16 for Reels / TikTok / Shorts */}
    <Composition id="IhbsPromoVertical" component={IhbsPromo} durationInFrames={360}
      fps={30} width={1080} height={1920} defaultProps={promoSchemaDefaults} />
  </>
);
