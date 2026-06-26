# Memory Museum — Pachala Memories

A single-page photo-album website — **"Pachala Memories — 50 Frames of Tradition & Love."**
A dreamy, 3D "fairyland" memory album for a Pachala (Telugu pre-wedding / turmeric)
function: family portraits, rituals, decorations, and blessings, presented as a
luxury magazine-style album.

🔗 **Live site:** https://karthikbangari.github.io/memory-museum/

## What it is

The entire app is **one static HTML file** — no build step, no backend, no package
manager. `index.html` loads React from a CDN and renders a 5-chapter album with a
parallax "fairy sky," chapter sections, a magazine-style gallery, and a lightbox.

| File | Purpose |
|------|---------|
| `index.html` | The whole app — HTML, Tailwind config, CSS, and the in-browser React app. |
| `photos/` | Web-ready JPGs (longest side 1600px, ~26 MB total) + the page backgrounds. |
| `PHOTO_MAP.txt` | Reference: which `photo-NN.jpg` came from which original photo. |
| `AGENTS.md` | Detailed working guide to the code structure inside `index.html`. |
| `.github/workflows/pages.yml` | GitHub Pages deploy on every push to `main`. |

## Running it locally

No install, no build. Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

Dependencies load at runtime via CDN (Tailwind, React 18 + ReactDOM, framer-motion,
lucide-react). Photos are served **same-origin** from `photos/`.

## Editing photos

1. Drop the file in `photos/` (keep it web-sized — longest side ~1600px).
2. Add its filename to the `FILES` array in `index.html` (10 per chapter), with
   matching `TITLES` / `CAPTIONS` entries.
3. Bump `ASSET_V` in `index.html` so browsers re-fetch changed images.
4. Commit and push to `main` — GitHub Pages redeploys automatically.

## Performance

The page is tuned to load fast on phones:

- Photos capped at 1600px and re-compressed (~47 MB → ~26 MB).
- Full-screen backgrounds are compact JPGs instead of 2 MB PNGs (5.8 MB → 0.9 MB).
- Assets are cacheable, so repeat visits are near-instant; the `?v=ASSET_V` query
  forces a refresh only when images actually change.

## Deployment

`.github/workflows/pages.yml` uploads the repo root and deploys to GitHub Pages on
every push to `main`.
