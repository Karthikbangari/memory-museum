# Memory Museum — Photos

Web-ready, de-duplicated photos for the single-page album in `index.html`.

- **Format:** JPG, longest side **1600px**, quality ~72 (mobile-optimized).
- **Total:** ~26 MB.
- **Backgrounds:** `bg-sky.jpg`, `bg-hero.jpg`, `welcome.jpg` (compact JPGs; were 2 MB PNGs).
- **Served same-origin** from `photos/` via GitHub Pages — not a CDN — so updates are instant.
  Cache-busted with a `?v=ASSET_V` query in `index.html` (bump `ASSET_V` after replacing images).

See `PHOTO_MAP.txt` for which `photo-NN.jpg` maps to which original download.

## Performance notes

The page is tuned for fast loading on phones:

- Photos are capped at 1600px and re-compressed (~47 MB → ~26 MB).
- The three full-screen backgrounds are JPG instead of PNG (5.8 MB → 0.9 MB).
- Assets are cacheable, so repeat visits are near-instant; the `?v=` query forces a
  refresh only when images actually change.
