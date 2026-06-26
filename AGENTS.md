# AGENTS.md — Shared Guide for Claude & Codex

> One common working doc for **Claude** and **Codex**. Claude writes/updates it; **Codex reviews and corrects** it. Keep it accurate to the actual code — if something here disagrees with `index.html`, the code wins and this file should be fixed.

Repo: <https://github.com/Karthikbangari/memory-museum> · Local: `/Users/karthikbangari/memory-museum`
Local `main` is in sync with `origin/main` (verified: identical commits, clean tree).

---

## 1. What this project is

A **single-page photo-album website** — "Pachala Memories — 50 Frames of Tradition & Love." A dreamy, 3D "fairyland" memory album for a Pachala (Telugu pre-wedding/turmeric) function: family portraits, rituals, decorations, and blessings, presented as a luxury magazine-style album.

It is **static** — no build step, no backend, no package manager. The entire app is one HTML file that loads React from a CDN and transpiles JSX in the browser with Babel Standalone.

## 2. File map

| File | Purpose |
|------|---------|
| `index.html` | **The whole app** (~780 lines): HTML head, Tailwind config, CSS, and a single in-browser React app. |
| `photos/` | 73 web-ready JPGs (longest side 1920px). Named `hero.jpg`, `ammamma.jpg`, `family.jpg`, `wa-01..13.jpg`, `photo-02..67.jpg`. |
| `IMAGES.js` | **Legacy / not loaded by `index.html`.** An older photo→chapter map kept for reference. The live mapping is the `FILES` array inside `index.html`. |
| `PHOTO_MAP.txt` | Reference: which `photo-NN.jpg` came from which original `DSC#####.jpg`. |
| `README.md` | Short note about the photo set + jsDelivr CDN usage. |
| `.github/workflows/pages.yml` | GitHub Pages deploy on push to `main`. |
| `.gitignore` | Ignores `.DS_Store`. |

> ⚠️ `IMAGES.js` and `index.html`'s `FILES` array are **two different mappings** and they disagree (e.g. `IMAGES.js` puts `ammamma.jpg` at slot 13; `FILES` puts it at slot 11). The page only uses `FILES`. Treat `IMAGES.js` as stale.

## 3. How it runs

- **No install, no build.** Open `index.html` in a browser, or serve the folder:
  ```sh
  python3 -m http.server 8000   # then visit http://localhost:8000
  ```
- Dependencies are loaded at runtime via CDN:
  - **Tailwind** via `cdn.tailwindcss.com` (config inline in `<head>`).
  - **React 18 + ReactDOM** and **framer-motion** + **lucide-react** via an `importmap` pointing at `esm.sh`.
  - **Babel Standalone** (`@babel/standalone`) transpiles the `<script type="text/babel" data-type="module">` block in-browser.
- **Photos load from jsDelivr**, not the local `photos/` folder:
  `https://cdn.jsdelivr.net/gh/Karthikbangari/memory-museum@main/photos/<file>`
  So images only appear once the files exist on the `main` branch on GitHub. Local edits to `photos/` won't show until pushed.

## 4. Deployment

`.github/workflows/pages.yml` uploads the repo root as a Pages artifact and deploys on every push to `main` (or manual `workflow_dispatch`). No secrets needed. Since photos are served from jsDelivr (also off `main`), pushing to `main` updates both the site and the image source.

## 5. Code structure inside `index.html`

Order of things in the `<script type="text/babel">` block:

1. **Imports** (line ~103): React hooks, `createRoot`, `motion`, `lucide-react` icons.
2. **Data constants** (~113–203):
   - `PHOTO_BASE`, `U(f)` — jsDelivr URL helper.
   - `FILES` — **the live 50-photo list**, grouped 10 per chapter.
   - `CHAPTERS` — 5 chapters: `Welcome & Blessings`, `Family Portraits`, `Traditional Moments`, `Decorations & Details`, `Forever Memories`.
   - `TITLES`, `CAPTIONS` — per-frame title + caption text.
   - `FILTERS`, `FOCI`, `ORI` — photo filter class, object-position, orientation cycling.
   - `PHOTOS` — `FILES.map(...)` → array of `{id, file, url, title, caption, ...}` used everywhere.
2b. **3D parallax sky system** (added after the data block): `TiltProvider` / `useTilt` (shared mouse + gyroscope tilt via framer-motion `useMotionValue`/`useSpring`), `FairySky` (fixed full-page parallax layers — god-rays, clouds, bokeh, sparkles — driven by tilt + scroll), `ScrollProgress` (top gold scroll bar), `MotionEnable` (iOS 13+ "Enable 3D Tilt" permission button). `App` is wrapped in `<TiltProvider>` and mounts `<FairySky/>` (fixed, `z-index:-10`) behind translucent `.fairy` sections so the sky shows through for real depth. All motion uses transform/opacity; `prefers-reduced-motion` is respected.
3. **Atmosphere components** (~221–311): `SoftClouds`, `FloatingPetals`, `MangoLeaves`, `LightRays`, `Sparkles2`, `PalaceSilhouette`, plus an SVG 5-petal `Jasmine` bloom.
4. **UI primitives** (~313–349): `Frame`, `Reveal`, `Kicker`, `Heading`, `Jasmine`.
5. **Sections** (~351–746): `Nav`, `HeroLanding`, `AlbumOpening3D`, `OpeningCover`, `StudioIntro`, `EditorialStory`, `ChapterIndex`, `FeatureStrip`, `ChapterSection`, `MagazinePages`, `PhotoGallery`, `PhotoModal`, `FinalEnding`.
6. **`App`** (~748) composes the page top-to-bottom and owns the lightbox `modal` state + scroll refs.
7. `createRoot(...).render(<App />)`.

## 6. Conventions / gotchas for editors

- **Edit `index.html` only** for app changes — everything lives there.
- To **add/swap a photo**: drop the file in `photos/`, add its filename to `FILES` (keep 10-per-chapter grouping), add matching `TITLES`/`CAPTIONS` entries, **commit & push to `main`** (jsDelivr serves from `main`).
- **Theme colors & fonts** are defined in the inline `tailwind.config` (`bg`, `cloud`, `ivory`, `pgreen`, `leaf`, `gold`, `blush`, `ink`, …; fonts `play`, `cormorant`, `lora`, `inter`, `script`).
- Studio label constant: `STUDIO = "Stories by Studio K"`.
- jsDelivr caches per commit; a hard refresh or a few minutes may be needed after pushing new images.
- There is no test suite and no linter configured.

## 7. Open items / things Codex should verify

- [x] ✅ Verified: `FILES` has exactly **50** entries and **all 50** filenames exist in `photos/`.
- [ ] Decide whether to **delete `IMAGES.js`** (stale, unused) or reconcile it with `FILES`.
- [ ] `PHOTO_MAP.txt` lists `photo-02..67`, but `photos/` is missing some numbers (e.g. `photo-04`, `-07`, `-10`, `-11`, `-61`, `-62`, `-64`, `-66`). These gaps are harmless — no live `FILES` entry points at a missing file (verified above) — but `PHOTO_MAP.txt` overstates what's present.
- [ ] Confirm the lucide-react / framer-motion CDN versions in the `importmap` still resolve.

---

## Review log (Codex → corrections)

> Codex: append findings/corrections below. Mark each as ✅ fixed, ✏️ needs change, or ❓ question.

- _(empty — awaiting Codex review)_
