"""Synthesize the 120s background score for the Sheru Bhai x IHBS video.

Pure numpy, no samples, so it is royalty-free. Section times match src/sheru/timeline.ts.
Usage: python3 scripts/make_music.py public/sheru-music.wav
"""
import sys
import wave

import numpy as np

SR = 44100
DUR = 120.0
N = int(SR * DUR)
out = np.zeros(N)
rng = np.random.default_rng(7)


def t_(d):
    return np.arange(int(SR * d)) / SR


def place(sig, at, gain=1.0):
    i = int(at * SR)
    if i >= N:
        return
    j = min(N, i + len(sig))
    out[i:j] += sig[: j - i] * gain


def env(d, a=0.005, r=None):
    t = t_(d)
    e = np.minimum(1, t / a)
    if r is None:
        r = d
    return e * np.exp(-t / (r / 4))


def note(f):
    return 440 * 2 ** ((f - 69) / 12)


def kick(heavy=False):
    d = 0.6 if heavy else 0.35
    t = t_(d)
    f = 45 + (160 if heavy else 120) * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * (5 if heavy else 9))


def snare():
    t = t_(0.25)
    return (rng.standard_normal(len(t)) * 0.6 + np.sin(2 * np.pi * 190 * t) * 0.5) * np.exp(-t * 18)


def clap():
    t = t_(0.2)
    n = rng.standard_normal(len(t))
    e = np.exp(-t * 25) + 0.6 * np.exp(-np.maximum(0, t - 0.012) * 30) * (t > 0.012)
    return n * e * 0.6


def hat(open_=False):
    t = t_(0.18 if open_ else 0.05)
    n = rng.standard_normal(len(t))
    n = np.diff(n, prepend=0)  # crude high-pass
    return n * np.exp(-t * (20 if open_ else 80)) * 0.25


def bass808(m, d):
    t = t_(d)
    f = note(m)
    s = np.sin(2 * np.pi * f * t) + 0.3 * np.tanh(3 * np.sin(2 * np.pi * f * t))
    return s * np.minimum(1, t / 0.01) * np.exp(-t * 1.2)


def pluck(m, d=0.3):
    t = t_(d)
    f = note(m)
    s = np.sign(np.sin(2 * np.pi * f * t)) * 0.4 + np.sin(2 * np.pi * 2 * f * t) * 0.3
    return s * env(d, 0.002, d * 0.8)


def pad(ms, d):
    t = t_(d)
    s = sum(np.sin(2 * np.pi * note(m) * t) + 0.5 * np.sin(2 * np.pi * note(m) * 1.003 * t) for m in ms)
    a = np.minimum(1, t / 1.0) * np.minimum(1, (d - t) / 1.0)
    return s * a / len(ms)


def brass_hit(ms, d=0.9):
    t = t_(d)
    s = sum(np.tanh(2.5 * np.sin(2 * np.pi * note(m) * t)) for m in ms) / len(ms)
    return s * np.minimum(1, t / 0.01) * np.exp(-t * 3)


def boom():
    t = t_(2.5)
    f = 30 + 80 * np.exp(-t * 4)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.5)
    n = rng.standard_normal(len(t)) * np.exp(-t * 6) * 0.3
    return s + n


def riser(d):
    t = t_(d)
    n = rng.standard_normal(len(t))
    n = np.convolve(n, np.ones(8) / 8, mode="same")
    return n * (t / d) ** 2 * 0.5


def gavel():
    t = t_(0.3)
    return (np.sin(2 * np.pi * 900 * t) * 0.5 + rng.standard_normal(len(t)) * 0.5) * np.exp(-t * 40)


def beats(start, end, bpm):
    step = 60 / bpm
    b = start
    i = 0
    while b < end:
        yield i, b
        b += step / 4
        i += 1


# 0-8s intro: pad + riser
place(pad([57, 60, 64], 8.5), 0, 0.25)
place(riser(4), 4, 0.5)

# 8-26s struggle: bouncy comedic pluck groove, 120bpm, A minor
mel = [69, 72, 76, 72, 74, 72, 69, 67]
for i, b in beats(8, 26, 120):
    if i % 4 == 0:
        place(kick(), b, 0.6)
    if i % 8 == 4:
        place(snare(), b, 0.3)
    if i % 2 == 0:
        place(hat(), b, 0.5)
    if i % 2 == 0:
        place(pluck(mel[(i // 2) % len(mel)] - 12, 0.2), b, 0.18)
    if i % 16 == 0:
        place(bass808(45 if (i // 16) % 2 == 0 else 43, 0.9), b, 0.35)

# 26-42s auction tension: ticking + drone
place(pad([45, 52, 57], 16), 26, 0.3)
for i, b in beats(26, 42, 100):
    if i % 4 == 0:
        place(hat(), b, 0.9)
    if i % 16 == 0:
        place(kick(), b, 0.4)
place(gavel(), 27.0, 0.7)
place(gavel(), 27.4, 0.7)
place(riser(5), 37, 0.7)

# 42s boss entrance: boom, then heavy trap beat 140bpm half-time (D minor)
place(boom(), 42, 0.9)
place(brass_hit([50, 53, 57, 62], 1.5), 42, 0.5)
trap_bass = [38, 38, 41, 36]
for i, b in beats(44, 82, 140):
    bar = (i // 16) % 4
    s = i % 16
    if s in (0, 10):
        place(kick(heavy=True), b, 0.7)
    if s == 8:
        place(clap(), b, 0.5)
        place(snare(), b, 0.3)
    if i % 2 == 0 or (s in (13, 15) and bar % 2):
        place(hat(), b, 0.6)
    if s == 0:
        place(bass808(trap_bass[bar], 1.6), b, 0.45)
    if s in (0, 6, 12) :
        place(pluck([74, 77, 81, 77][bar], 0.25), b, 0.08)

# stingers on Sheru's punchlines (times from timeline.ts)
for at in [57.5, 65.5, 73.5]:
    place(brass_hit([50, 57, 62]), at, 0.45)
place(gavel(), 80.0, 0.9)
place(gavel(), 80.4, 0.9)
place(brass_hit([50, 54, 57, 62], 1.5), 80.8, 0.5)

# 82-120s services + CTA: uplifting major groove 120bpm (D major)
chords = [[50, 54, 57], [47, 50, 54], [43, 47, 50], [45, 49, 52]]
for i, b in beats(82, 115, 120):
    bar = (i // 16) % 4
    s = i % 16
    if s % 4 == 0:
        place(kick(), b, 0.55)
    if s in (4, 12):
        place(clap(), b, 0.35)
    if i % 2 == 1:
        place(hat(), b, 0.5)
    if s == 0:
        place(pad([m + 12 for m in chords[bar]], 2.1), b, 0.2)
        place(bass808(chords[bar][0] - 12, 1.8), b, 0.35)
    if s in (0, 3, 6, 10, 12):
        place(pluck(chords[bar][s % 3] + 24, 0.18), b, 0.07)

# 115-120: catchphrase hits ("tadban tadban")
place(riser(1.5), 113.5, 0.5)
for at in [115.3, 115.8, 116.8, 117.3]:
    place(kick(heavy=True), at, 0.8)
    place(brass_hit([50, 57, 62, 66], 0.7), at, 0.5)
place(pad([62, 66, 69], 2.5), 117.5, 0.25)

# master: soft-clip, normalize, fade out
out = np.tanh(out * 1.2)
out /= np.max(np.abs(out)) + 1e-9
fade = int(SR * 1.5)
out[-fade:] *= np.linspace(1, 0, fade)
pcm = (out * 0.85 * 32767).astype(np.int16)

with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", sys.argv[1])
