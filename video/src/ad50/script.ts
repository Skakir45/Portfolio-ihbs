/**
 * Master timeline. All times are GLOBAL seconds (0-50).
 * Subtitles, lip-sync, audio stems and the voiceover guide all read from here.
 */
export type Speaker = "sheru" | "consultant";

export type Line = {
  id: string;
  scene: number;
  at: number;
  end: number;
  who: Speaker;
  ml: string;
  en: string;
  direction: string; // voice direction for the VO artist
};

export const SCENES = [
  { n: 1, name: "The Arrival", from: 0, to: 8 },
  { n: 2, name: "The Crazy Offer", from: 8, to: 17 },
  { n: 3, name: "The Twist", from: 17, to: 27 },
  { n: 4, name: "IHBS Services", from: 27, to: 38 },
  { n: 5, name: "The Ending", from: 38, to: 50 },
] as const;

export const LINES: Line[] = [
  {
    id: "c1", scene: 1, at: 3.3, end: 5.4, who: "consultant",
    ml: "ഷേരു ഭായ്! ദുബായിലേക്ക് എന്താ പരിപാടി?",
    en: "Sheru Bhai! What brings you to Dubai?",
    direction: "Warm, surprised, friendly. Slight rise on 'പരിപാടി?'",
  },
  {
    id: "s1", scene: 1, at: 5.6, end: 7.8, who: "sheru",
    ml: "എനിക്ക് ദുബായിൽ ഒരു ബിസിനസ് തുടങ്ങണം!",
    en: "I want to start a business in Dubai!",
    direction: "Deep, slow, over-confident boss voice. Pause after 'എനിക്ക്'.",
  },
  {
    id: "s2", scene: 2, at: 9.4, end: 15.6, who: "sheru",
    ml: "ഒരു മില്യൺ... രണ്ട് ട്രില്യൺ... ഗുപ്ചുപ് ഹുപ് ഹുപ് ഡോളർ തരാം!",
    en: "One million... two trillion... gupchup hup hup dollars, I'll give!",
    direction: "Escalating, showing off. Beat after each number. 'ഗുപ്ചുപ് ഹുപ് ഹുപ്' fast and silly.",
  },
  {
    id: "c2", scene: 3, at: 17.4, end: 19.9, who: "consultant",
    ml: "അയ്യോ ഷേരു ഭായ്! ഇത്രയും പൈസയൊന്നും വേണ്ട!",
    en: "Ayyo Sheru Bhai! You don't need this much money!",
    direction: "Laughing panic, hands up. Stretch 'അയ്യോ'.",
  },
  {
    id: "s3", scene: 3, at: 20.2, end: 21.9, who: "sheru",
    ml: "പിന്നെ എത്ര വേണം?",
    en: "Then how much do I need?",
    direction: "Confused, eyebrows up, slower.",
  },
  {
    id: "c3", scene: 3, at: 22.2, end: 24.6, who: "consultant",
    ml: "ബിസിനസ് സെറ്റപ്പിന് IHBS ഉണ്ടല്ലോ!",
    en: "For business setup, there's IHBS!",
    direction: "Proud reveal, punch 'IHBS' (say ഐ-എച്ച്-ബി-എസ്).",
  },
  {
    id: "c4", scene: 4, at: 27.8, end: 33.4, who: "consultant",
    ml: "ട്രേഡ് ലൈസൻസ്, വിസ സർവീസസ്, ഡോക്യുമെന്റ് ക്ലിയറിംഗ്... എല്ലാത്തിനും IHBS!",
    en: "Trade license, visa services, document clearing... IHBS for everything!",
    direction: "Clear, confident, list rhythm matching each card pop (28.0 / 29.6 / 31.2).",
  },
  {
    id: "s4", scene: 4, at: 34.0, end: 37.4, who: "sheru",
    ml: "അപ്പോ എന്റെ ട്രില്യൺ ഡോളർ സേഫ്!",
    en: "So my trillion dollars are safe!",
    direction: "Relieved, happy sigh, hugging suitcase.",
  },
  {
    id: "s5", scene: 5, at: 39.0, end: 42.0, who: "sheru",
    ml: "ഗുപ്ചുപ് ഹുപ് ഹുപ്! IHBS സൂപ്പർ ഭായ്!",
    en: "Gupchup hup hup! IHBS is super, bhai!",
    direction: "Celebration chant, rhythmic, on the beat.",
  },
];

export const SPEAKER_LABEL: Record<Speaker, { ml: string; en: string }> = {
  sheru: { ml: "ഷേരു ഭായ്", en: "Sheru Bhai" },
  consultant: { ml: "IHBS കൺസൾട്ടന്റ്", en: "IHBS Consultant" },
};

export const isTalking = (who: Speaker, globalSec: number) =>
  LINES.some((l) => l.who === who && globalSec >= l.at && globalSec <= l.end - 0.15);
