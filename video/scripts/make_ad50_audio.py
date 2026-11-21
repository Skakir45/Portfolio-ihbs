"""Synthesize music + SFX stems for SheruIHBSAd50 (50 s). Pure numpy => royalty-free.

Every cue time below is GLOBAL seconds and matches src/ad50/script.ts / scenes.
Usage: python3 scripts/make_ad50_audio.py public/ad50
Writes music.wav and sfx.wav (convert to mp3 with ffmpeg; see README).
"""
import os
import sys
import wave

import numpy as np

SR = 44100
DUR = 50.0
N = int(SR * DUR)
rng = np.random.default_rng(42)


def T(d):
    return np.arange(int(SR * d)) / SR


def note(m):
    return 440 * 2 ** ((m - 69) / 12)


class Track:
    def __init__(self):
        self.x = np.zeros(N)

    def add(self, sig, at, gain=1.0):
        i = int(at * SR)
        if i >= N or i + len(sig) <= 0:
            return
        j = min(N, i + len(sig))
        self.x[i:j] += sig[: j - i] * gain


def lp(x, k=8):
    return np.convolve(x, np.ones(k) / k, mode="same")


# ---------- instruments ----------
def kick(heavy=False):
    t = T(0.5 if heavy else 0.3)
    fr = 48 + (170 if heavy else 120) * np.exp(-t * 32)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * (6 if heavy else 10))


def snare():
    t = T(0.22)
    return (rng.standard_normal(len(t)) * 0.55 + np.sin(2 * np.pi * 200 * t) * 0.45) * np.exp(-t * 20)


def clap():
    t = T(0.2)
    return rng.standard_normal(len(t)) * (np.exp(-t * 28) + 0.5 * (t > 0.012) * np.exp(-np.maximum(0, t - 0.012) * 30)) * 0.6


def hat(open_=False):
    t = T(0.16 if open_ else 0.045)
    return np.diff(rng.standard_normal(len(t)), prepend=0) * np.exp(-t * (22 if open_ else 85)) * 0.22


def bass(m, d):
    t = T(d)
    s = np.sin(2 * np.pi * note(m) * t) + 0.25 * np.tanh(3 * np.sin(2 * np.pi * note(m) * t))
    return s * np.minimum(1, t / 0.01) * np.exp(-t * 1.6)


def pluck(m, d=0.22):
    t = T(d)
    fq = note(m)
    s = 0.5 * np.sin(2 * np.pi * fq * t) + 0.3 * np.sin(2 * np.pi * 2 * fq * t) + 0.15 * np.sign(np.sin(2 * np.pi * fq * t))
    return s * np.minimum(1, t / 0.003) * np.exp(-t * 9)


def pizz(m):
    t = T(0.25)
    return np.sin(2 * np.pi * note(m) * t) * np.exp(-t * 16)


def pad(ms, d, bright=0.3):
    t = T(d)
    s = sum(np.sin(2 * np.pi * note(m) * t) + bright * np.sin(2 * np.pi * note(m) * 2.003 * t) for m in ms) / len(ms)
    return s * np.minimum(1, t / 0.6) * np.minimum(1, (d - t) / 0.6)


def brass(ms, d=0.8):
    t = T(d)
    s = sum(np.tanh(2.6 * np.sin(2 * np.pi * note(m) * t + 0.3 * np.sin(2 * np.pi * 5 * t))) for m in ms) / len(ms)
    return s * np.minimum(1, t / 0.02) * np.exp(-t * 2.5)


def boom(d=2.0):
    t = T(d)
    fr = 32 + 90 * np.exp(-t * 4)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 1.6) + rng.standard_normal(len(t)) * np.exp(-t * 7) * 0.3


def riser(d):
    t = T(d)
    return lp(rng.standard_normal(len(t)), 6) * (t / d) ** 2 * 0.6


def grid(start, end, bpm=120):
    step = 60 / bpm / 4
    i = 0
    b = start
    while b < end - 1e-6:
        yield i, b
        i += 1
        b += step


# ---------- SFX ----------
def engine(d):
    t = T(d)
    fr = 55 + 70 * (t / d) ** 0.6
    ph = 2 * np.pi * np.cumsum(fr) / SR
    s = np.sign(np.sin(ph)) * 0.4 + np.sin(ph * 2) * 0.3
    return lp(s, 20) * np.minimum(1, t / 0.2) * np.minimum(1, (d - t) / 0.2)


def screech(d=0.7):
    t = T(d)
    fr = 2400 - 900 * t / d
    s = np.sin(2 * np.pi * np.cumsum(fr) / SR) * 0.3 + lp(rng.standard_normal(len(t)), 3) * 0.4
    return s * np.minimum(1, t / 0.03) * np.exp(-t * 2.5)


def horn():
    out = np.zeros(int(SR * 0.75))
    for k, (fq, at, d) in enumerate([(392, 0.0, 0.18), (523, 0.24, 0.45)]):
        t = T(d)
        s = np.tanh(3 * (np.sin(2 * np.pi * fq * t) + 0.6 * np.sin(2 * np.pi * fq * 1.26 * t))) * np.minimum(1, t / 0.01) * np.minimum(1, (d - t) / 0.03)
        i = int(at * SR)
        out[i : i + len(s)] += s * 0.5
    return out


def boing(f0=180, f1=520, d=0.5):
    t = T(d)
    fr = f0 + (f1 - f0) * (1 - np.exp(-t * 8)) + 40 * np.sin(2 * np.pi * 14 * t) * np.exp(-t * 4)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 5)


def click():
    t = T(0.04)
    return rng.standard_normal(len(t)) * np.exp(-t * 160) * 0.8


def kaching():
    t = T(1.0)
    bell = sum(np.sin(2 * np.pi * fq * t) * np.exp(-t * dk) for fq, dk in [(2093, 4), (2637, 5), (3136, 6), (4186, 8)]) / 3
    drawer = np.zeros(len(t))
    drawer[: int(0.08 * SR)] = rng.standard_normal(int(0.08 * SR)) * np.exp(-T(0.08) * 40) * 0.7
    return bell * (t > 0.05) + drawer


def flutter(d):
    t = T(d)
    n = lp(rng.standard_normal(len(t)), 4)
    am = 0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 22 * t + 3 * np.sin(2 * np.pi * 3 * t)))
    return n * am * 0.35 * np.minimum(1, t / 0.1) * np.minimum(1, (d - t) / 0.3)


def scratch():
    t = T(0.45)
    fr = 900 * np.abs(np.sin(2 * np.pi * 3.2 * t)) + 120
    return lp(np.sin(2 * np.pi * np.cumsum(fr) / SR) * 0.5 + rng.standard_normal(len(t)) * 0.4, 5) * np.exp(-t * 3)


def whoosh(d=0.45):
    t = T(d)
    return lp(rng.standard_normal(len(t)), 10) * np.sin(np.pi * t / d) ** 2 * 0.9


def ding():
    t = T(1.2)
    return (np.sin(2 * np.pi * 1568 * t) + 0.4 * np.sin(2 * np.pi * 3136 * t)) * np.exp(-t * 3.5) * 0.6


def slide_whistle(d=1.0):
    t = T(d)
    fr = 1800 * np.exp(-t * 2.2) + 300
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * 0.5 * np.minimum(1, t / 0.03) * np.minimum(1, (d - t) / 0.05)


def clatter():
    out = np.zeros(int(SR * 0.6))
    for at in [0.0, 0.12, 0.2, 0.26]:
        t = T(0.08)
        s = (np.sin(2 * np.pi * 3400 * t) + rng.standard_normal(len(t)) * 0.5) * np.exp(-t * 60)
        i = int(at * SR)
        out[i : i + len(s)] += s * (0.7 - at)
    return out


def pop():
    t = T(0.12)
    fr = 600 + 900 * np.exp(-t * 40)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 30)


def sparkle(d=1.2):
    out = np.zeros(int(SR * d))
    for k in range(10):
        at = k * d / 12
        t = T(0.25)
        s = np.sin(2 * np.pi * note(84 + (k * 5) % 12) * t) * np.exp(-t * 14)
        i = int(at * SR)
        out[i : i + len(s)] += s * 0.35
    return out


def thud():
    t = T(0.5)
    fr = 40 + 120 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 8) + rng.standard_normal(len(t)) * np.exp(-t * 30) * 0.5


music = Track()
sfx = Track()

# ================= MUSIC =================
# S1 0-8: cinematic entrance (D minor) — boom, brass, trap beat from 3.0
music.add(pad([50, 57, 62], 3.2, 0.5), 0, 0.35)
music.add(riser(2.8), 0.2, 0.45)
music.add(boom(), 3.0, 0.9)
music.add(brass([50, 57, 62, 65], 1.2), 3.0, 0.55)
for i, b in grid(3.0, 8.0, 120):
    s = i % 16
    if s in (0, 10):
        music.add(kick(True), b, 0.65)
    if s == 8:
        music.add(clap(), b, 0.45)
    if i % 2 == 0:
        music.add(hat(), b, 0.5)
    if s == 0:
        music.add(bass([38, 41][(i // 16) % 2], 1.8), b, 0.4)
    if s in (0, 3, 6):
        music.add(brass([62, 65], 0.25), b, 0.12)

# S2 8-17: show-off swing groove (F major-ish, cheeky)
prog = [[53, 57, 60], [58, 62, 65], [55, 58, 62], [60, 64, 67]]
for i, b in grid(8.0, 17.0, 120):
    s = i % 16
    bar = (i // 16) % 4
    swing = 0.03 if i % 2 else 0
    if s in (0, 8):
        music.add(kick(), b, 0.6)
    if s in (4, 12):
        music.add(clap(), b, 0.4)
    if i % 2 == 0:
        music.add(hat(), b + swing, 0.45)
    if s == 0:
        music.add(bass(prog[bar][0] - 12, 1.9), b, 0.4)
        music.add(pad([m + 12 for m in prog[bar]], 2.0), b, 0.12)
    if s in (2, 6, 10, 14):
        music.add(pluck(prog[bar][(s // 4) % 3] + 12), b + swing, 0.16)
music.add(brass([65, 69, 72], 0.6), 16.5, 0.25)

# S3 17-27: record-scratch stop, then sneaky pizzicato; tension rise to glasses drop
for i, b in grid(17.5, 24.6, 120):
    s = i % 16
    line = [57, 60, 64, 60, 62, 60, 57, 55]
    if i % 2 == 0:
        music.add(pizz(line[(i // 2) % 8] - 12 + (12 if b > 22.0 else 0)), b, 0.35)
    if s == 0:
        music.add(kick(), b, 0.35)
    if i % 4 == 2:
        music.add(hat(), b, 0.35)
music.add(riser(2.0), 22.6, 0.4)
music.add(boom(1.6), 24.7, 0.6)
music.add(pad([45, 52, 57, 60], 2.3, 0.1), 24.7, 0.25)

# S4 27-38: premium uplifting corporate (D major)
chords = [[50, 54, 57], [57, 61, 64], [59, 62, 66], [55, 59, 62]]
for i, b in grid(27.0, 38.0, 120):
    s = i % 16
    bar = (i // 16) % 4
    if s % 4 == 0:
        music.add(kick(), b, 0.55)
    if s in (4, 12):
        music.add(clap(), b, 0.32)
    if i % 2 == 1:
        music.add(hat(), b, 0.42)
    if s == 0:
        music.add(pad([m + 12 for m in chords[bar]], 2.05, 0.4), b, 0.18)
        music.add(bass(chords[bar][0] - 12, 1.9), b, 0.38)
    if s in (0, 3, 6, 8, 11, 14):
        music.add(pluck(chords[bar][s % 3] + 24, 0.18), b, 0.08)

# S5 38-50: celebration chant groove then brand stinger
for i, b in grid(38.0, 42.3, 120):
    s = i % 16
    if s % 4 == 0:
        music.add(kick(True), b, 0.6)
    if s in (4, 12):
        music.add(clap(), b, 0.45)
    if i % 2 == 0:
        music.add(hat(), b, 0.5)
    if s in (0, 6, 12):
        music.add(brass([62, 66, 69], 0.3), b, 0.18)
    if s == 0:
        music.add(bass(38, 1.8), b, 0.45)
music.add(riser(0.8), 41.6, 0.5)
music.add(boom(2.5), 42.4, 0.6)
music.add(brass([50, 57, 62, 66, 69], 2.0), 42.4, 0.45)
music.add(pad([62, 66, 69, 74], 7.5, 0.6), 42.6, 0.3)
for k, m in enumerate([74, 78, 81, 86]):
    music.add(pluck(m, 0.6), 43.6 + k * 0.09, 0.18)  # IHBS letters
music.add(brass([62, 69, 74], 1.6), 48.0, 0.35)

# ================= SFX =================
sfx.add(engine(2.6), 0.4, 0.55)
sfx.add(screech(), 2.6, 0.45)
sfx.add(horn(), 3.05, 0.55)
sfx.add(boing(200, 600, 0.45), 3.6, 0.45)
sfx.add(thud(), 4.4, 0.5)
sfx.add(whoosh(0.4), 7.85, 0.6)                    # wipe
sfx.add(thud(), 8.45, 0.7)                         # suitcase drop
sfx.add(click(), 8.85, 0.8); sfx.add(click(), 8.95, 0.8)
sfx.add(sparkle(1.0), 9.0, 0.6)
sfx.add(kaching(), 9.1, 0.6)
sfx.add(flutter(6.2), 9.3, 0.6)
sfx.add(kaching(), 11.0, 0.45)
sfx.add(kaching(), 12.7, 0.45)
sfx.add(boing(300, 900, 0.4), 13.0, 0.35)
sfx.add(whoosh(0.4), 16.85, 0.6)
sfx.add(scratch(), 17.0, 0.7)
sfx.add(pop(), 23.0, 0.6); sfx.add(ding(), 23.0, 0.5)   # IHBS badge
sfx.add(slide_whistle(1.0), 24.7, 0.55)
sfx.add(boing(140, 420, 0.6), 24.75, 0.4)
sfx.add(clatter(), 25.7, 0.6)
sfx.add(whoosh(0.4), 26.85, 0.6)
for at in (28.0, 29.6, 31.2):
    sfx.add(whoosh(0.35), at - 0.1, 0.5); sfx.add(pop(), at + 0.2, 0.5)
sfx.add(sparkle(1.4), 34.2, 0.55)
sfx.add(whoosh(0.4), 37.85, 0.6)
sfx.add(thud(), 38.55, 0.85)                       # suitcase slam
sfx.add(boing(500, 200, 0.3), 39.0, 0.3)          # glasses land on face
sfx.add(whoosh(0.6), 42.3, 0.7)                    # iris
sfx.add(sparkle(1.2), 43.0, 0.5)
sfx.add(ding(), 46.0, 0.35)                        # WhatsApp pill


def write(path, x, peak=0.9):
    x = np.tanh(x * 1.1)
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fade = int(SR * 0.6)
    x[-fade:] *= np.linspace(1, 0, fade)
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())
    print("wrote", path)


outdir = sys.argv[1]
os.makedirs(outdir, exist_ok=True)
write(os.path.join(outdir, "music.wav"), music.x, 0.8)
write(os.path.join(outdir, "sfx.wav"), sfx.x, 0.85)
