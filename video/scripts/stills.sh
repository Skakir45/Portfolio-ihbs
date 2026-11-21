#!/usr/bin/env bash
# Render preview stills of SheruIHBSAd50 at given seconds and tile them into a contact sheet.
# Usage: scripts/stills.sh out/sheet.png 1.5 4 6.5 ...
set -e
OUT=$1; shift
TMP=$(mktemp -d)
i=0
for t in "$@"; do
  fr=$(python3 -c "print(round($t*30))")
  npx remotion still SheruIHBSAd50 "$TMP/$(printf %02d $i).png" --frame=$fr --scale=0.3 \
    --browser-executable=/opt/pw-browsers/chromium --log=error >/dev/null
  i=$((i+1))
done
ffmpeg -loglevel error -y -pattern_type glob -i "$TMP/*.png" -filter_complex "tile=${#}x1" "$OUT" 2>/dev/null \
  || ffmpeg -loglevel error -y $(for f in "$TMP"/*.png; do echo -i $f; done) -filter_complex "hstack=inputs=$i" "$OUT"
rm -rf "$TMP"
echo "$OUT"
