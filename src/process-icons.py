#!/usr/bin/env python3
"""Process custom BOTC token PNGs: transparent bg, good=blue, evil=red."""

from __future__ import annotations

import colorsys
from collections import deque
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Install Pillow: pip3 install Pillow")

ROOT = Path(__file__).resolve().parent.parent
CUSTOM = ROOT / "assets/icons/custom"
SOURCE = Path(
    "/Users/annika.dukek/.cursor/projects/var-folders-hf-4c42vv-574b1jhr-835jcz0m0000gp-T-a9b9e8f5-1b7d-4645-b30a-10679053fc8f/assets"
)

TEAMS = {
    "emilybride": "townsfolk",
    "oskargroom": "townsfolk",
    "priest": "townsfolk",
    "bestman": "townsfolk",
    "maidofhonor": "townsfolk",
    "photographer": "townsfolk",
    "toastmaster": "townsfolk",
    "weirduncle": "outsider",
    "weddingcrasher": "outsider",
    "maliciousorganist": "minion",
    "badcaterer": "minion",
}

H_BLUE = 0.58
H_RED = 0.0
OUTPUT_SIZE = 400
PADDING = 24


def is_good_team(team: str) -> bool:
    return team in ("townsfolk", "outsider")


def is_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 12:
        return True
    if r < 28 and g < 28 and b < 28:
        return True
    if r > 232 and g > 228 and b > 218:
        return True
    return False


def is_paper(r: int, g: int, b: int, a: int) -> bool:
    if a < 20:
        return False
    return r > 185 and g > 175 and b > 150 and abs(r - g) < 40


def remove_background(img: Image.Image) -> Image.Image:
    out = img.convert("RGBA")
    w, h = out.size
    px = out.load()
    seen: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if (x, y) in seen:
            continue
        seen.add((x, y))
        r, g, b, a = px[x, y]
        if not is_background(r, g, b, a):
            continue
        px[x, y] = (r, g, b, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h:
                q.append((nx, ny))

    return out


def trim_and_center(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    cropped = img.crop(bbox)
    cw, ch = cropped.size
    side = max(cw, ch) + PADDING * 2
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    ox = (side - cw) // 2
    oy = (side - ch) // 2
    canvas.paste(cropped, (ox, oy), cropped)
    if side != OUTPUT_SIZE:
        canvas = canvas.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.Resampling.LANCZOS)
    return canvas


def normalize_palette(img: Image.Image, team: str) -> Image.Image:
    """Force icon ink to blue (good) or red (evil)."""
    good = is_good_team(team)
    target_h = H_BLUE if good else H_RED
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
            if not good:
                s = min(1.0, s * 1.05)
            nr, ng, nb = colorsys.hsv_to_rgb(ch, s, v)
            dp[x, y] = (int(nr * 255), int(ng * 255), int(nb * 255), a)

    return out


def make_flip(img: Image.Image, team: str) -> Image.Image:
    """Opposite alignment color for script.json flip variant."""
    flip_team = "minion" if is_good_team(team) else "townsfolk"
    return normalize_palette(img, flip_team)


def process_source(path: Path, team: str) -> Image.Image:
    img = Image.open(path)
    img = remove_background(img)
    img = trim_and_center(img)
    return normalize_palette(img, team)


def main() -> None:
    CUSTOM.mkdir(parents=True, exist_ok=True)

    for old in CUSTOM.glob("*.svg"):
        old.unlink()

    for char_id, team in TEAMS.items():
        src = SOURCE / f"{char_id}_g.png"
        if not src.exists():
            src = CUSTOM / f"{char_id}_g.png"
        if not src.exists():
            src = CUSTOM / f"{char_id}_e.png"
        if not src.exists():
            raise FileNotFoundError(f"Missing source icon: {char_id}")

        primary_suffix = "g" if is_good_team(team) else "e"
        flip_suffix = "e" if is_good_team(team) else "g"

        primary = process_source(src, team)
        flip = make_flip(primary, team)

        primary.save(CUSTOM / f"{char_id}_{primary_suffix}.png", optimize=True)
        flip.save(CUSTOM / f"{char_id}_{flip_suffix}.png", optimize=True)

        color = "blue" if is_good_team(team) else "red"
        print(f"  {char_id} ({color}, {primary_suffix}+flip)")

    print(f"Processed {len(TEAMS)} characters -> {CUSTOM}")


if __name__ == "__main__":
    main()
