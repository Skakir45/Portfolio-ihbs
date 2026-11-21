# IHBS Video (Remotion)

Code-based video: React components → MP4. Edit `src/IhbsPromo.tsx`, preview live, render.

## On your laptop
```bash
cd video
npm install
npm run studio            # live preview editor at http://localhost:3000
npm run render            # 1920x1080 → out/ihbs-promo.mp4
npm run render:vertical   # 1080x1920 (Reels/TikTok/Shorts)
```
Needs Node 18+. Remotion downloads its own headless Chrome on first render.

## Change the text without touching code
```bash
npx remotion render IhbsPromo out/custom.mp4 --props='{"headline":"Your Headline","services":["A","B","C","D"],"cta":"Call us"}'
```

## Structure
- `src/Root.tsx` – compositions (size, fps, length)
- `src/IhbsPromo.tsx` – scenes: Intro (0–4s), Services (4–9s), Outro (9–12s)
- `public/` – images used via `staticFile()`; drop music here and add `<Audio src={staticFile("music.mp3")} />`
