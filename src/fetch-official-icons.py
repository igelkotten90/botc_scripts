#!/usr/bin/env python3
"""Download official BOTC icons and normalize: good=blue (_g), evil=red (_e)."""

from __future__ import annotations

import colorsys
import io
import urllib.request
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Install Pillow: pip3 install Pillow")

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets/icons/official"

CDN = "https://release.botc.app/resources/characters"

OFFICIAL = {
    "virgin": ("tb", "townsfolk"),
    "chef": ("tb", "townsfolk"),
    "grandmother": ("bmr", "townsfolk"),
    "flowergirl": ("snv", "townsfolk"),
    "cannibal": ("carousel", "townsfolk"),
    "gossip": ("bmr", "townsfolk"),
    "drunk": ("tb", "outsider"),
    "klutz": ("snv", "outsider"),
    "scarletwoman": ("tb", "minion"),
    "godfather": ("bmr", "minion"),
    "fanggu": ("snv", "demon"),
    "lleech": ("carousel", "demon"),
    "ojo": ("carousel", "demon"),
    "imp": ("tb", "demon"),
}

H_BLUE = 0.58
H_RED = 0.0


def is_good_team(team: str) -> bool:
    return team in ("townsfolk", "outsider")


def is_paper(r: int, g: int, b: int, a: int) -> bool:
    if a < 20:
        return False
    return r > 185 and g > 175 and b > 150 and abs(r - g) < 40


def recolor_to_hue(img: Image.Image, target_h: float, boost_red: bool = False) -> Image.Image:
    src = img.convert("RGBA")
    out = Image.new("RGBA", src.size)
    sp = src.load()
    dp = out.load()
    w, h = src.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = sp[x, y]
            if a < 20 or is_paper(r, g, b, a):
                dp[x, y] = (r, g, b, a)
                continue
            ch, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if s < 0.06:
                dp[x, y] = (r, g, b, a)
                continue
            ch = target_h
            if boost_red:
                s = min(1.0, s * 1.05)
            nr, ng, nb = colorsys.hsv_to_rgb(ch, s, v)
            dp[x, y] = (int(nr * 255), int(ng * 255), int(nb * 255), a)

    return out


def download_icon(edition: str, char_id: str, suffix: str) -> Image.Image:
    url = f"{CDN}/{edition}/{char_id}_{suffix}.webp"
    with urllib.request.urlopen(url, timeout=30) as resp:
        data = resp.read()
    return Image.open(io.BytesIO(data))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for char_id, (edition, team) in OFFICIAL.items():
        suffix = "g" if is_good_team(team) else "e"
        raw = download_icon(edition, char_id, suffix)

        blue = recolor_to_hue(raw, H_BLUE)
        red = recolor_to_hue(raw, H_RED, boost_red=True)

        blue.save(OUT / f"{char_id}_g.png", optimize=True)
        red.save(OUT / f"{char_id}_e.png", optimize=True)

        display = f"{char_id}_g.png" if is_good_team(team) else f"{char_id}_e.png"
        color = "blue" if is_good_team(team) else "red"
        print(f"  {char_id} ({team}, {color}, display={display})")

    print(f"Cached {len(OFFICIAL)} official icons -> {OUT}")


if __name__ == "__main__":
    main()
