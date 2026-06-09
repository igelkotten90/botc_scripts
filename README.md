# The Wedding — Blood on the Clocktower Script Sheet

Print-ready character sheet and night order for the custom **The Wedding** script (25 characters).

## Quick start

1. Open [`index.html`](index.html) in Chrome or Firefox.
2. Click **Print / Save PDF** (or press Cmd+P / Ctrl+P).
3. Use these settings:
   - **Paper:** A4
   - **Margins:** None
   - **Background graphics:** On
   - **Headers and footers:** Off

Expected output: ~3–4 pages (character sheet + first night + other nights).

## Regenerate

After editing character data in `src/characters.mjs` (and night order in `src/night-order.mjs` if needed):

```bash
node src/build.mjs              # index.html + data/script.json
```

If you changed custom token art:

```bash
node src/generate-icons.mjs   # process PNG token art + evil flips
node src/build.mjs              # index.html + data/script.json
```

Custom token art lives in `assets/icons/custom/` (transparent PNGs). Official icons are cached in `assets/icons/official/` with normalized colors: **blue** for Townsfolk/Outsiders, **red** for Minions/Demons.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Printable character sheet + night orders (generated) |
| `data/script.json` | BOTC-compatible script JSON (generated) |
| `src/characters.mjs` | Character roster, abilities, and night metadata |
| `src/night-order.mjs` | First/other night wake order and ST labels |
| `src/build.mjs` | Builds `index.html` and `data/script.json` |
| `assets/icons/custom/` | Homebrew token icons (11 roles × good/evil) |

## Importing into the official Script Tool

`data/script.json` uses the standard schema. Custom character icons use relative paths (`assets/icons/custom/...`). For import at [script.bloodontheclocktower.com](https://script.bloodontheclocktower.com/), you may need to host icon files online or paste full JSON with absolute URLs.

## Attribution

Unofficial fan content using materials from **Blood on the Clocktower** by Steven Medway and The Pandemonium Institute, under their [Community Created Content](https://release.botc.app/resources/community/) policy.
