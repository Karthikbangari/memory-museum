/* ---------- REAL PHOTOS (paste above buildMemories) ---------- */
const PHOTO_BASE =
  "https://cdn.jsdelivr.net/gh/Karthikbangari/memory-museum@main/photos";

const img = (file) => (file ? `${PHOTO_BASE}/${file}` : null);

const IMAGES = {
  // Chapter 1 — The Beginning (1–10)   [1 = hero / first pic]
  1:  img("hero.jpg"),
  2:  img("wa-01.jpg"),
  3:  img("wa-02.jpg"),
  4:  img("wa-03.jpg"),
  5:  img("wa-04.jpg"),
  6:  img("wa-05.jpg"),
  7:  img("wa-06.jpg"),
  8:  img("wa-07.jpg"),
  9:  img("wa-08.jpg"),
  10: img("wa-09.jpg"),

  // Chapter 2 — People Who Matter (11–20)
  11: img("wa-10.jpg"),     // Amma
  12: img("wa-11.jpg"),     // Nana
  13: img("ammamma.jpg"),   // Ammamma
  14: img("wa-12.jpg"),     // Tatha
  15: img("wa-13.jpg"),     // Mama
  16: img("photo-01.jpg"),  // Atta
  17: img("photo-02.jpg"),  // Sibling
  18: img("photo-03.jpg"),  // Best Friend
  19: img("family.jpg"),    // The Whole Family
  20: img("photo-05.jpg"),  // Someone Special

  // Chapter 3 — Places & Adventures (21–30)
  21: img("photo-06.jpg"),
  22: img("photo-08.jpg"),
  23: img("photo-09.jpg"),
  24: img("photo-12.jpg"),
  25: img("photo-13.jpg"),
  26: img("photo-14.jpg"),
  27: img("photo-15.jpg"),
  28: img("photo-16.jpg"),
  29: img("photo-17.jpg"),
  30: img("photo-18.jpg"),

  // Chapter 4 — Turning Points (31–40)
  31: img("photo-19.jpg"),
  32: img("photo-20.jpg"),
  33: img("photo-21.jpg"),
  34: img("photo-22.jpg"),
  35: img("photo-23.jpg"),
  36: img("photo-24.jpg"),
  37: img("photo-25.jpg"),
  38: img("photo-26.jpg"),
  39: img("photo-27.jpg"),
  40: img("photo-28.jpg"),

  // Chapter 5 — The Road Ahead (41–50)
  41: img("photo-29.jpg"),
  42: img("photo-30.jpg"),
  43: img("photo-31.jpg"),
  44: img("photo-32.jpg"),
  45: img("photo-33.jpg"),
  46: img("photo-34.jpg"),
  47: img("photo-35.jpg"),
  48: img("photo-36.jpg"),
  49: img("photo-37.jpg"),
  50: img("photo-38.jpg"),
};
