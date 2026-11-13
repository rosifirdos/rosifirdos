/**
 * Pixel-arcade README asset generator.
 *
 * Everything below is drawn with hand-built pixel geometry: a 5x7 uppercase
 * bitmap font, a 5x7+x-height lowercase companion, and hand-placed sprites.
 * No web fonts and no external images, so the SVGs render identically inside
 * GitHub's image proxy (camo).
 *
 * Rebuild with:  node tools/generate-assets.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets");

/* ------------------------------------------------------------------ palette */
const C = {
  bg0: "#03050e",
  bg1: "#0a1128",
  bg2: "#0d1738",
  panel: "#070c1c",
  panel2: "#0b1330",
  line: "#1d2b56",
  lineSoft: "#111a38",
  cyan: "#2ee6f6",
  cyanSoft: "#7ff3ff",
  cyanDim: "#0d5f70",
  pink: "#ff4d9d",
  pinkSoft: "#ff9ec6",
  pinkDim: "#6b1e45",
  amber: "#ffcc5c",
  amberDim: "#6d4f18",
  violet: "#a78bfa",
  green: "#4ade80",
  red: "#ff6b6b",
  white: "#e9f1ff",
  muted: "#7d8cb5",
  dim: "#43507a",
  ink: "#02030a",
};

/* ------------------------------------------------------------- bitmap fonts */
// Each string is one glyph row per "|" separated entry, 5 columns wide.
const UPPER = {
  A: ".###.|#...#|#...#|#####|#...#|#...#|#...#",
  B: "####.|#...#|#...#|####.|#...#|#...#|####.",
  C: ".###.|#...#|#....|#....|#....|#...#|.###.",
  D: "####.|#...#|#...#|#...#|#...#|#...#|####.",
  E: "#####|#....|#....|####.|#....|#....|#####",
  F: "#####|#....|#....|####.|#....|#....|#....",
  G: ".###.|#...#|#....|#.###|#...#|#...#|.####",
  H: "#...#|#...#|#...#|#####|#...#|#...#|#...#",
  I: "#####|..#..|..#..|..#..|..#..|..#..|#####",
  J: "..###|...#.|...#.|...#.|...#.|#..#.|.##..",
  K: "#...#|#...#|#..#.|###..|#..#.|#...#|#...#",
  L: "#....|#....|#....|#....|#....|#....|#####",
  M: "#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#",
  N: "#...#|##..#|#.#.#|#.#.#|#..##|#...#|#...#",
  O: ".###.|#...#|#...#|#...#|#...#|#...#|.###.",
  P: "####.|#...#|#...#|####.|#....|#....|#....",
  Q: ".###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#",
  R: "####.|#...#|#...#|####.|#.#..|#..#.|#...#",
  S: ".####|#....|#....|.###.|....#|....#|####.",
  T: "#####|..#..|..#..|..#..|..#..|..#..|..#..",
  U: "#...#|#...#|#...#|#...#|#...#|#...#|.###.",
  V: "#...#|#...#|#...#|#...#|#...#|.#.#.|..#..",
  W: "#...#|#...#|#...#|#.#.#|#.#.#|##.##|#...#",
  X: "#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#",
  Y: "#...#|#...#|.#.#.|..#..|..#..|..#..|..#..",
  Z: "#####|....#|...#.|..#..|.#...|#....|#####",
  0: ".###.|#...#|#..##|#.#.#|##..#|#...#|.###.",
  1: "..#..|.##..|..#..|..#..|..#..|..#..|.###.",
  2: ".###.|#...#|....#|...#.|..#..|.#...|#####",
  3: "####.|....#|....#|.###.|....#|....#|####.",
  4: "...#.|..##.|.#.#.|#..#.|#####|...#.|...#.",
  5: "#####|#....|####.|....#|....#|#...#|.###.",
  6: "..##.|.#...|#....|####.|#...#|#...#|.###.",
  7: "#####|....#|...#.|..#..|.#...|.#...|.#...",
  8: ".###.|#...#|#...#|.###.|#...#|#...#|.###.",
  9: ".###.|#...#|#...#|.####|....#|...#.|.##..",
  ".": ".....|.....|.....|.....|.....|.##..|.##..",
  ",": ".....|.....|.....|.....|.##..|.##..|.#...",
  ":": ".....|.##..|.##..|.....|.##..|.##..|.....",
  ";": ".....|.##..|.##..|.....|.##..|.#...|#....",
  "/": "....#|....#|...#.|..#..|.#...|#....|#....",
  "-": ".....|.....|.....|#####|.....|.....|.....",
  "+": ".....|..#..|..#..|#####|..#..|..#..|.....",
  "=": ".....|.....|#####|.....|#####|.....|.....",
  _: ".....|.....|.....|.....|.....|.....|#####",
  "!": "..#..|..#..|..#..|..#..|..#..|.....|..#..",
  "?": ".###.|#...#|....#|...#.|..#..|.....|..#..",
  "'": "..#..|..#..|.....|.....|.....|.....|.....",
  '"': ".#.#.|.#.#.|.....|.....|.....|.....|.....",
  "(": "...#.|..#..|.#...|.#...|.#...|..#..|...#.",
  ")": ".#...|..#..|...#.|...#.|...#.|..#..|.#...",
  "[": ".###.|.#...|.#...|.#...|.#...|.#...|.###.",
  "]": ".###.|...#.|...#.|...#.|...#.|...#.|.###.",
  "#": ".#.#.|.#.#.|#####|.#.#.|#####|.#.#.|.#.#.",
  "*": ".....|#.#.#|.###.|#.#.#|.....|.....|.....",
  "%": "##..#|##.#.|..#..|.#...|#..##|#..##|.....",
  "@": ".###.|#...#|#.###|#.#.#|#.###|#....|.###.",
  "&": ".##..|#..#.|.##..|#.#.#|#..#.|#..#.|.##.#",
  ">": ".#...|..#..|...#.|....#|...#.|..#..|.#...",
  "<": "...#.|..#..|.#...|#....|.#...|..#..|...#.",
  "|": "..#..|..#..|..#..|..#..|..#..|..#..|..#..",
  "^": "..#..|.#.#.|#...#|.....|.....|.....|.....",
  "~": ".....|.....|.##.#|#..#.|.....|.....|.....",
};

/* Lowercase sits on a 9 row cell: x-height rows 2-6, descender rows 7-8. */
const LOWER = {
  a: ".....|.....|.###.|#...#|#####|#...#|.####|.....|.....",
  b: ".....|#....|#....|####.|#...#|#...#|####.|.....|.....",
  c: ".....|.....|.###.|#....|#....|#....|.###.|.....|.....",
  d: ".....|....#|....#|.####|#...#|#...#|.####|.....|.....",
  e: ".....|.....|.###.|#...#|#####|#....|.###.|.....|.....",
  f: ".....|..##.|.#...|####.|.#...|.#...|.#...|.....|.....",
  g: ".....|.....|.####|#...#|.####|....#|.###.|.....|.....",
  h: ".....|#....|#....|####.|#...#|#...#|#...#|.....|.....",
  i: ".....|..#..|.....|.##..|..#..|..#..|.###.|.....|.....",
  j: ".....|...#.|.....|...#.|...#.|...#.|#..#.|.###.|.....",
  k: ".....|#....|#..#.|#.#..|##...|#.#..|#..#.|.....|.....",
  l: ".....|.##..|..#..|..#..|..#..|..#..|.###.|.....|.....",
  m: ".....|.....|##.##|#.#.#|#.#.#|#.#.#|#.#.#|.....|.....",
  n: ".....|.....|#.##.|##..#|#...#|#...#|#...#|.....|.....",
  o: ".....|.....|.###.|#...#|#...#|#...#|.###.|.....|.....",
  p: ".....|.....|####.|#...#|#...#|####.|#....|#....|.....",
  q: ".....|.....|.####|#...#|#...#|.####|....#|....#|.....",
  r: ".....|.....|#.##.|##...|#....|#....|#....|.....|.....",
  s: ".....|.....|.####|#....|.###.|....#|####.|.....|.....",
  t: ".....|.#...|.#...|####.|.#...|.#...|..##.|.....|.....",
  u: ".....|.....|#...#|#...#|#...#|#...#|.####|.....|.....",
  v: ".....|.....|#...#|#...#|#...#|.#.#.|..#..|.....|.....",
  w: ".....|.....|#...#|#...#|#.#.#|#.#.#|.#.#.|.....|.....",
  x: ".....|.....|#...#|.#.#.|..#..|.#.#.|#...#|.....|.....",
  y: ".....|.....|#...#|#...#|#...#|.####|....#|.###.|.....",
  z: ".....|.....|#####|...#.|..#..|.#...|#####|.....|.....",
  " ": ".....|.....|.....|.....|.....|.....|.....|.....|.....",
};

/* ------------------------------------------------------------ path helpers */
function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function glyph(ch) {
  if (LOWER[ch]) return LOWER[ch].split("|");
  if (UPPER[ch]) return UPPER[ch].split("|");
  if (ch === " ") return LOWER[" "].split("|");
  return UPPER["?"].split("|");
}

function textWidth(str, scale, tracking = 1) {
  if (!str.length) return 0;
  return str.length * (5 + tracking) * scale - tracking * scale;
}

/* Collapse each row's horizontal runs into one rect-ish subpath. */
function runsPath(rows, scale, ox, oy) {
  let d = "";
  for (let ry = 0; ry < rows.length; ry++) {
    const row = rows[ry];
    let cx = 0;
    while (cx < row.length) {
      if (row[cx] === "#") {
        const start = cx;
        while (cx < row.length && row[cx] === "#") cx++;
        d += `M${ox + start * scale} ${oy + ry * scale}h${(cx - start) * scale}v${scale}h${-(cx - start) * scale}z`;
      } else cx++;
    }
  }
  return d;
}

function textPath(str, o = {}) {
  const scale = o.scale ?? 4;
  const tracking = o.tracking ?? 1;
  const width = textWidth(str, scale, tracking);
  let x = Math.round(o.x ?? 0);
  const align = o.align ?? "left";
  if (align === "center") x -= Math.round(width / 2);
  if (align === "right") x -= width;
  const y = Math.round(o.y ?? 0);
  let d = "";
  for (const ch of str) {
    if (ch !== " ") d += runsPath(glyph(ch), scale, x, y);
    x += (5 + tracking) * scale;
  }
  return { d, width };
}

/* Text as pixel-vector paths, with optional 8-bit drop shadow and glow. */
function text(str, o = {}) {
  const { d, width } = textPath(str, o);
  const fill = o.gradient ? `url(#${o.gradient})` : o.color || C.white;
  const filter = o.filter ? ` filter="url(#${o.filter})"` : "";
  let out = "";
  if (o.shadow) {
    const s = textPath(str, { ...o, y: (o.y ?? 0) + o.shadow.dy });
    out += `<path d="${s.d}" fill="${o.shadow.color}" opacity="${o.shadow.opacity ?? 1}"/>`;
  }
  out += `<path d="${d}" fill="${fill}"${filter}${o.opacity ? ` opacity="${o.opacity}"` : ""}/>`;
  return out;
}

/* --------------------------------------------------------------- boxes/FX */
function notchPath(x, y, w, h, n = 8) {
  return `M${x + n} ${y}H${x + w - n}L${x + w} ${y + n}V${y + h - n}L${x + w - n} ${y + h}H${x + n}L${x} ${y + h - n}V${y + n}Z`;
}

function panel(o) {
  const { x, y, w, h } = o;
  const notch = o.notch ?? 10;
  let s = `<path d="${notchPath(x, y, w, h, notch)}" fill="${o.fill ?? C.panel}" stroke="${o.stroke ?? C.line}" stroke-width="${o.strokeWidth ?? 2}"/>`;
  if (o.inner !== false) {
    s += `<path d="${notchPath(x + 6, y + 6, w - 12, h - 12, Math.max(4, notch - 4))}" fill="none" stroke="${o.innerStroke ?? C.lineSoft}" stroke-width="1"/>`;
  }
  if (o.accent) {
    const a = o.accent;
    const len = 10;
    [[x + 2, y + 2, 1, 1], [x + w - 2, y + 2, -1, 1], [x + 2, y + h - 2, 1, -1], [x + w - 2, y + h - 2, -1, -1]].forEach(
      ([cx, cy, sx, sy]) => {
        s += `<path d="M${cx} ${cy + sy * len}V${cy}H${cx + sx * len}" fill="none" stroke="${a}" stroke-width="3"/>`;
      }
    );
  }
  return s;
}

function sprite(rows, map, o = {}) {
  const scale = o.scale ?? 1;
  const x = o.x ?? 0;
  const y = o.y ?? 0;
  const byColor = new Map();
  rows.forEach((row, ry) => {
    let cx = 0;
    while (cx < row.length) {
      const ch = row[cx];
      if (ch === "." || ch === " ") {
        cx++;
        continue;
      }
      const start = cx;
      while (cx < row.length && row[cx] === ch) cx++;
      const key = map[ch] ?? C.white;
      if (!byColor.has(key)) byColor.set(key, "");
      byColor.set(key, byColor.get(key) + `M${x + start * scale} ${y + ry * scale}h${(cx - start) * scale}v${scale}h${-(cx - start) * scale}z`);
    }
  });
  let out = "";
  for (const [color, d] of byColor) out += `<path d="${d}" fill="${color}"/>`;
  return out;
}

/* Segmented XP meter; segments light up in sequence on load. */
function meter(o) {
  const { x, y, w, h, value, color, delay = 0.3, seg = 16, gap = 4 } = o;
  const count = Math.max(1, Math.floor((w + gap) / (seg + gap)));
  const filled = Math.round(count * value);
  let s = "";
  for (let i = 0; i < count; i++) {
    const sx = x + i * (seg + gap);
    const on = i < filled;
    s += `<rect x="${sx}" y="${y}" width="${seg}" height="${h}" fill="${on ? color : C.lineSoft}" opacity="${on ? 1 : 0.75}">`;
    if (on) s += `<animate attributeName="opacity" values="0;1" dur="0.14s" begin="${(delay + i * 0.035).toFixed(2)}s" fill="freeze"/>`;
    s += `</rect>`;
  }
  // top highlight on the filled run
  s += `<rect x="${x}" y="${y}" width="${filled * (seg + gap) - gap}" height="2" fill="${C.white}" opacity="0.35"/>`;
  return s;
}

/* --------------------------------------------------------------- sprites */
const ROBOT = [
  "................",
  ".......aa.......",
  "......a..a......",
  ".......aa.......",
  ".....######.....",
  "....########....",
  "...##########...",
  "...##########...",
  "...#oo####oo#...",
  "...#oo####oo#...",
  "...####mm####...",
  "...####mm####...",
  "...##########...",
  "....########....",
  "..###.####.###..",
  "..##..#..#..##..",
  "..##..####..##..",
  "................",
];
const ROBOT_MAP = { "#": C.cyanDim, a: C.pink, o: C.cyanSoft, m: C.pink };

const HEART = [".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."];

const ICONS = {
  code: {
    rows: [
      "..........",
      "..#######.",
      ".########.",
      ".###..###.",
      ".###..###.",
      ".########.",
      ".#######..",
      ".########.",
      "..######..",
      "..........",
    ],
    map: { "#": "#3aa0f0" },
  },
  jupyter: {
    rows: [
      "..........",
      "...####...",
      "..######..",
      ".###..###.",
      "###....###",
      "###....###",
      ".###..###.",
      "..######..",
      "...####...",
      "..........",
    ],
    map: { "#": "#f37726" },
  },
  colab: {
    rows: [
      "..........",
      "...,,,,...",
      "..,,,,,,..",
      ".,,,..,,,.",
      ",,,....,,,",
      ",,,....,,,",
      ".,,,..,,,.",
      "..,,,,,,..",
      "...,,,,...",
      "..........",
    ],
    map: { ",": "#f9ab00" },
  },
  git: {
    rows: [
      "..........",
      "...##.....",
      "..##.#....",
      "...##.....",
      "...##.....",
      "...##.##..",
      "...####.#.",
      "...##.....",
      "...##.....",
      "..........",
    ],
    map: { "#": "#f05032" },
  },
  mysql: {
    rows: [
      "..........",
      "..######..",
      ".##....##.",
      ".##....##.",
      ".##....##.",
      ".##....##.",
      ".##....##.",
      "..######..",
      "..........",
      "..........",
    ],
    map: { "#": "#2ee6f6" },
  },
  cloud: {
    rows: [
      "..........",
      "....###...",
      "..#######.",
      ".#########",
      "##########",
      "##########",
      "##########",
      ".########.",
      "..........",
      "..........",
    ],
    map: { "#": "#ff9900" },
  },
  chart: {
    rows: [
      "..........",
      "..........",
      ".#.....#..",
      ".#...#.#..",
      ".#.#.#.#..",
      ".#.#.#.#.#",
      ".#.#.#.#.#",
      ".#########",
      "##########",
      "..........",
    ],
    map: { "#": "#4ade80" },
  },
  cube: {
    rows: [
      "..........",
      "..######..",
      ".#......#.",
      "#.#....#.#",
      "#..#..#..#",
      "#...#.#..#",
      "#....#...#",
      "#........#",
      "##########",
      "..........",
    ],
    map: { "#": "#4f9cf7" },
  },
  table: {
    rows: [
      "..........",
      "##########",
      "#.##.##.##",
      "#.##.##.##",
      "##########",
      "#.##.##.##",
      "#.##.##.##",
      "##########",
      "..........",
      "..........",
    ],
    map: { "#": "#e70488" },
  },
  docker: {
    rows: [
      "..........",
      "..#.#.#...",
      "..#.#.#...",
      ".#######..",
      ".#######..",
      "#########.",
      "#########.",
      ".#.#####..",
      "..........",
      "..........",
    ],
    map: { "#": "#2ea6e8" },
  },
};

/* ------------------------------------------------------------ common chrome */
const STAR_STYLE = `
  .tw1 { animation: twinkle 3.2s ease-in-out infinite; }
  .tw2 { animation: twinkle 4.6s ease-in-out infinite -1.4s; }
  .tw3 { animation: twinkle 5.8s ease-in-out infinite -2.9s; }
  .float { animation: float 4.2s ease-in-out infinite; }
  .blink { animation: blink 1.25s steps(1, end) infinite; }
  .blink-slow { animation: blink 2.6s steps(1, end) infinite; }
  .shimmer { animation: shimmer 2.8s ease-in-out infinite; }
  @keyframes twinkle { 0%,100% { opacity: .18 } 50% { opacity: 1 } }
  @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
  @keyframes blink { 0%,55% { opacity: 1 } 56%,100% { opacity: 0 } }
  @keyframes shimmer { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
`;

function starfield(w, h, count, seed) {
  const rand = mulberry32(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * w);
    const y = Math.round(rand() * h);
    const size = rand() > 0.86 ? 3 : rand() > 0.5 ? 2 : 1;
    const cls = ["tw1", "tw2", "tw3"][Math.floor(rand() * 3)];
    const color = rand() > 0.82 ? C.pinkSoft : rand() > 0.45 ? C.cyanSoft : C.white;
    out += `<rect class="${cls}" x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" opacity="0.6"/>`;
  }
  return out;
}

function scanlines(w, h) {
  return `<rect x="0" y="0" width="${w}" height="${h}" fill="url(#scan)" pointer-events="none"/>`;
}

function defsBase(w, h) {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.bg0}"/>
      <stop offset="0.55" stop-color="${C.bg1}"/>
      <stop offset="1" stop-color="${C.bg0}"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.cyanSoft}"/>
      <stop offset="1" stop-color="${C.cyan}"/>
    </linearGradient>
    <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.pinkSoft}"/>
      <stop offset="1" stop-color="${C.pink}"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff0b8"/>
      <stop offset="1" stop-color="${C.amber}"/>
    </linearGradient>
    <linearGradient id="floorGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.pink}" stop-opacity="0.30"/>
      <stop offset="1" stop-color="${C.pink}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.42" r="0.78">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.55"/>
    </radialGradient>
    <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="1" fill="#02030a" opacity="0.20"/>
    </pattern>
    <filter id="glowCyan" x="-30%" y="-60%" width="160%" height="220%">
      <feGaussianBlur stdDeviation="3.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowPink" x="-30%" y="-60%" width="160%" height="220%">
      <feGaussianBlur stdDeviation="3.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow" x="-40%" y="-80%" width="180%" height="260%">
      <feGaussianBlur stdDeviation="7" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;
}

function svgDoc(w, h, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
${defsBase(w, h)}
<style>${STAR_STYLE}</style>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
${body}
<rect width="${w}" height="${h}" fill="url(#vignette)"/>
${scanlines(w, h)}
</svg>
`;
}

/* -------------------------------------------------------------------- hero */
function hero() {
  const W = 900;
  const H = 420;
  const b = [];

  b.push(starfield(W, 300, 54, 20260113));

  // synthwave floor
  const horizon = 322;
  b.push(`<rect x="0" y="${horizon - 10}" width="${W}" height="70" fill="url(#floorGlow)"/>`);
  b.push(`<rect x="0" y="${horizon - 1}" width="${W}" height="2" fill="${C.pink}" opacity="0.55"/>`);
  let floor = "";
  for (let i = 1; i < 9; i++) {
    const y = horizon + Math.round(Math.pow(i, 1.85) * 2.05);
    if (y > H) break;
    floor += `M0 ${y}H${W}`;
  }
  for (let i = -10; i <= 10; i++) {
    floor += `M${450 + i * 34} ${horizon}L${450 + i * 128} ${H}`;
  }
  b.push(`<path d="${floor}" stroke="${C.pink}" stroke-width="1.4" opacity="0.22"/>`);

  // top HUD
  b.push(panel({ x: 18, y: 14, w: 864, h: 34, notch: 8, accent: C.cyan }));
  b.push(text("PLAYER 1", { x: 36, y: 24, scale: 2, color: C.cyan, tracking: 1 }));
  b.push(sprite(HEART, { "#": C.pink }, { x: 762, y: 25, scale: 2 }));
  b.push(text("LV 21", { x: 852, y: 24, scale: 2, color: C.amber, align: "right" }));
  b.push(text("INSERT COIN", { x: 450, y: 24, scale: 2, color: C.dim, align: "center", tracking: 2 }));

  // identity block
  b.push(text("HI, I'M", { x: 58, y: 82, scale: 2, color: C.pink, tracking: 2 }));
  b.push(text("AWAN", { x: 56, y: 108, scale: 13, gradient: "cyanGrad", filter: "glowCyan" }));
  b.push(text("ROSI FIRDAUS", { x: 58, y: 212, scale: 7, gradient: "pinkGrad", filter: "glowPink" }));
  b.push(text("INFORMATICS STUDENT", { x: 58, y: 276, scale: 3, color: C.white, tracking: 1 }));
  b.push(text("ML // DATA // PYTHON", { x: 58, y: 300, scale: 2, color: C.muted, tracking: 2 }));

  // CRT the robot lives in
  const sx = 596;
  const sy = 74;
  const sw = 244;
  const sh = 206;
  b.push(`<rect x="${sx + 6}" y="${sy + 8}" width="${sw}" height="${sh}" fill="${C.cyan}" opacity="0.05" filter="url(#softGlow)"/>`);
  b.push(panel({ x: sx, y: sy, w: sw, h: sh, notch: 12, fill: "#050a17", stroke: C.cyanDim, innerStroke: C.lineSoft, accent: C.cyan }));
  b.push(sprite(ROBOT, ROBOT_MAP, { x: sx + 38, y: sy + 22, scale: 10 }));
  b.push(
    `<g class="blink-slow"><rect x="${sx + 38 + 4 * 10}" y="${sy + 22 + 8 * 10}" width="20" height="20" fill="${C.cyanSoft}"/><rect x="${sx + 38 + 10 * 10}" y="${sy + 22 + 8 * 10}" width="20" height="20" fill="${C.cyanSoft}"/></g>`
  );
  b.push(`<rect x="${sx + 8}" y="${sy + 8}" width="${sw - 16}" height="${sh - 16}" fill="url(#scan)" opacity="0.8"/>`);
  b.push(text("UNIT-01", { x: sx + sw / 2, y: sy + sh + 12, scale: 2, color: C.cyanDim, align: "center", tracking: 2 }));

  // bottom HUD
  b.push(panel({ x: 18, y: 338, w: 864, h: 62, notch: 10, accent: C.pink }));
  b.push(text("EXP TO NEXT LV", { x: 38, y: 352, scale: 2, color: C.muted, tracking: 1 }));
  b.push(meter({ x: 38, y: 372, w: 440, h: 14, value: 0.72, color: C.cyan, seg: 18, gap: 6 }));
  b.push(text("72%", { x: 526, y: 372, scale: 2, color: C.cyan, align: "right" }));
  b.push(`<path d="M552 348V390" stroke="${C.line}" stroke-width="2"/>`);
  b.push(`<g class="blink">${text("PRESS START", { x: 706, y: 350, scale: 3, color: C.white, align: "center" })}</g>`);
  b.push(sprite(HEART, { "#": C.pink }, { x: 664, y: 380, scale: 2 }));
  b.push(sprite(HEART, { "#": C.pink }, { x: 690, y: 380, scale: 2 }));
  b.push(sprite(HEART, { "#": C.pinkDim }, { x: 716, y: 380, scale: 2 }));
  b.push(text("LIVES 03", { x: 860, y: 380, scale: 2, color: C.muted, align: "right" }));

  return svgDoc(W, H, b.join("\n"), "Awan Rosi Firdaus — pixel arcade title screen");
}

/* --------------------------------------------------------------- skills HUD */
function skills() {
  const W = 900;
  const H = 268;
  const b = [starfield(W, H, 26, 771) ];
  b.push(panel({ x: 10, y: 10, w: 880, h: 248, notch: 12, accent: C.cyan }));

  // tab bar
  b.push(`<rect x="26" y="26" width="176" height="30" fill="${C.cyan}" opacity="0.14"/>`);
  b.push(`<rect x="26" y="26" width="176" height="30" fill="none" stroke="${C.cyan}" stroke-width="2"/>`);
  b.push(text("STATS", { x: 114, y: 34, scale: 2, color: C.cyanSoft, align: "center", tracking: 2 }));
  b.push(text("ABILITIES", { x: 256, y: 34, scale: 2, color: C.dim, tracking: 2 }));
  b.push(text("CLASS: DATA MAGE", { x: 864, y: 34, scale: 2, color: C.amber, align: "right", tracking: 1 }));
  b.push(`<path d="M26 66H874" stroke="${C.line}" stroke-width="1"/>`);

  const rows = [
    { label: "PYTHON", value: 0.88, color: C.cyan, tag: "S" },
    { label: "PANDAS / NUMPY", value: 0.82, color: C.cyan, tag: "A" },
    { label: "DATA VIZ", value: 0.78, color: C.violet, tag: "A" },
    { label: "MACHINE LEARNING", value: 0.66, color: C.pink, tag: "B" },
    { label: "JAVASCRIPT", value: 0.6, color: C.amber, tag: "B" },
    { label: "SQL / MYSQL", value: 0.55, color: C.green, tag: "C" },
  ];

  rows.forEach((r, i) => {
    const y = 82 + i * 28;
    b.push(text(r.label, { x: 30, y, scale: 2, color: C.white, tracking: 1 }));
    b.push(meter({ x: 268, y: y - 2, w: 286, h: 12, value: r.value, color: r.color, seg: 16, gap: 5, delay: 0.25 + i * 0.12 }));
    b.push(text(`${Math.round(r.value * 100)}`, { x: 600, y, scale: 2, color: r.color, align: "right", tracking: 1 }));
    b.push(`<rect x="616" y="${y - 4}" width="22" height="20" fill="${r.color}" opacity="0.16"/>`);
    b.push(text(r.tag, { x: 621, y, scale: 2, color: r.color }));
  });

  // right column: passive perks
  b.push(`<path d="M676 78V244" stroke="${C.lineSoft}" stroke-width="1"/>`);
  b.push(text("PASSIVES", { x: 700, y: 82, scale: 2, color: C.pink, tracking: 2 }));
  const perks = ["CURIOUS MIND", "FAST LEARNER", "SELF TAUGHT", "SHIP PROJECTS"];
  perks.forEach((p, i) => {
    const y = 110 + i * 26;
    b.push(`<path d="M700 ${y + 3}h7v7h-7z" fill="${C.pink}"/>`);
    b.push(text(p, { x: 716, y, scale: 2, color: C.muted, tracking: 1 }));
  });
  b.push(text("XP SOURCE", { x: 700, y: 216, scale: 2, color: C.cyan, tracking: 2 }));
  b.push(text("KAGGLE / DOCS / TINKERING", { x: 700, y: 234, scale: 1, color: C.dim, tracking: 1 }));

  return svgDoc(W, H, b.join("\n"), "Skill stats panel");
}

/* ------------------------------------------------------------ tools inventory */
function inventory() {
  const W = 900;
  const H = 320;
  const b = [starfield(W, H, 24, 5150)];
  b.push(panel({ x: 10, y: 10, w: 880, h: 300, notch: 12, accent: C.amber }));

  b.push(text("INVENTORY", { x: 30, y: 26, scale: 3, color: C.amber, tracking: 2 }));
  b.push(text("EQUIPPED TOOLS", { x: 300, y: 30, scale: 2, color: C.dim, tracking: 1 }));
  b.push(text("12 SLOTS", { x: 860, y: 30, scale: 2, color: C.muted, align: "right", tracking: 1 }));
  b.push(`<path d="M28 58H872" stroke="${C.line}" stroke-width="1"/>`);

  const items = [
    ["PYTHON", "code"],
    ["JUPYTER", "jupyter"],
    ["COLAB", "colab"],
    ["GIT", "git"],
    ["GITHUB", "git"],
    ["MYSQL", "mysql"],
    ["AWS", "cloud"],
    ["PANDAS", "table"],
    ["NUMPY", "cube"],
    ["MATPLOTLIB", "chart"],
    ["DOCKER", "docker"],
    ["VS CODE", "code"],
  ];

  const cols = 6;
  const cellW = 140;
  const cellH = 104;
  const startX = 30;
  const startY = 74;

  items.forEach(([name, icon], i) => {
    const cx = startX + (i % cols) * cellW;
    const cy = startY + Math.floor(i / cols) * cellH;
    const delay = (0.12 + i * 0.07).toFixed(2);
    b.push(`<rect x="${cx}" y="${cy}" width="${cellW - 12}" height="${cellH - 14}" fill="${C.panel2}" stroke="${C.lineSoft}" stroke-width="2"/>`);
    b.push(`<path d="M${cx} ${cy}h10v2h-10z" fill="${C.amber}" opacity="0.7"/>`);
    b.push(`<path d="M${cx} ${cy}v10h2v-10z" fill="${C.amber}" opacity="0.7"/>`);
    const ic = ICONS[icon];
    b.push(sprite(ic.rows, ic.map, { x: cx + 34, y: cy + 10, scale: 3 }));
    b.push(text(name, { x: cx + (cellW - 12) / 2 - 1, y: cy + 60, scale: 2, color: C.white, align: "center", tracking: 1 }));
    b.push(`<g class="shimmer" style="animation-delay:${delay}s"><rect x="${cx + 40}" y="${cy + 80}" width="${cellW - 92}" height="3" fill="${C.cyan}" opacity="0.5"/></g>`);
  });

  return svgDoc(W, H, b.join("\n"), "Tools inventory grid");
}

/* --------------------------------------------------------------- quest log */
function quests() {
  const W = 900;
  const H = 250;
  const b = [starfield(W, H, 22, 9931)];
  b.push(panel({ x: 10, y: 10, w: 880, h: 230, notch: 12, accent: C.green }));

  b.push(text("QUEST LOG", { x: 30, y: 26, scale: 3, color: C.green, tracking: 2 }));
  b.push(text("MAIN STORY", { x: 860, y: 30, scale: 2, color: C.dim, align: "right", tracking: 2 }));
  b.push(`<path d="M28 58H872" stroke="${C.line}" stroke-width="1"/>`);

  const quests = [
    { status: "ACTIVE", color: C.amber, title: "BACHELOR DEGREE, INFORMATICS", sub: "IN PROGRESS" },
    { status: "ACTIVE", color: C.amber, title: "MACHINE LEARNING MASTERY", sub: "TRAINING DAILY" },
    { status: "DONE", color: C.green, title: "SHIP SMALL PROJECTS", sub: "REPEATABLE QUEST" },
    { status: "NEW", color: C.cyan, title: "EXPLORE AI AND CREATIVE CODE", sub: "UNLOCKED" },
  ];

  quests.forEach((q, i) => {
    const y = 76 + i * 40;
    b.push(text(`[${q.status}]`, { x: 30, y, scale: 2, color: q.color, tracking: 1 }));
    b.push(text(q.title, { x: 164, y, scale: 2, color: C.white, tracking: 1 }));
    b.push(text(q.sub, { x: 164, y: y + 16, scale: 1, color: C.dim, tracking: 2 }));
    if (i < quests.length - 1) b.push(`<path d="M30 ${y + 28}H500" stroke="${C.lineSoft}" stroke-width="1" stroke-dasharray="3 4"/>`);
  });

  b.push(`<path d="M526 74V220" stroke="${C.lineSoft}" stroke-width="1"/>`);
  b.push(text("STORY SO FAR", { x: 552, y: 80, scale: 2, color: C.pink, tracking: 2 }));
  const lines = [
    "Informatics student",
    "chasing a bachelor's.",
    "Into machine learning",
    "and data analysis.",
    "Always learning about",
    "tech and creativity.",
  ];
  lines.forEach((l, i) => b.push(text(l, { x: 552, y: 108 + i * 20, scale: 2, color: C.muted, tracking: 1 })));

  return svgDoc(W, H, b.join("\n"), "Quest log describing background");
}

/* --------------------------------------------------------------- farewell */
function farewell() {
  const W = 900;
  const H = 146;
  const b = [starfield(W, H, 20, 8675309)];
  b.push(panel({ x: 10, y: 10, w: 880, h: 126, notch: 12, accent: C.amber }));

  b.push(text("THANKS FOR PLAYING", { x: 450, y: 28, scale: 3, gradient: "amberGrad", align: "center", tracking: 3, filter: "softGlow" }));
  b.push(text("INSERT COIN TO CONNECT  //  SEE YOU IN THE NEXT COMMIT", { x: 450, y: 58, scale: 2, color: C.dim, align: "center", tracking: 1 }));

  // score footer
  b.push(`<path d="M30 80H870" stroke="${C.lineSoft}" stroke-width="1"/>`);
  b.push(text("SCORE", { x: 30, y: 90, scale: 2, color: C.muted, tracking: 2 }));
  b.push(text("0003400", { x: 104, y: 90, scale: 2, color: C.amber, tracking: 1 }));
  b.push(text("WORLD", { x: 244, y: 90, scale: 2, color: C.muted, tracking: 2 }));
  b.push(text("INFORMATICS-KINGDOM", { x: 320, y: 90, scale: 2, color: C.cyan, tracking: 1 }));
  b.push(text("STATUS", { x: 610, y: 90, scale: 2, color: C.muted, tracking: 2 }));
  b.push(`<g class="blink">${text("OPEN TO COLLAB", { x: 688, y: 90, scale: 2, color: C.green, tracking: 1 })}</g>`);
  b.push(text("* * * * * * * *           * * * * * * * *", { x: 450, y: 116, scale: 1, color: C.dim, align: "center", tracking: 2 }));

  return svgDoc(W, H, b.join("\n"), "Thanks for playing footer");
}

/* -------------------------------------------------------------------- write */
mkdirSync(OUT, { recursive: true });
const files = {
  "hero.svg": hero(),
  "skills.svg": skills(),
  "inventory.svg": inventory(),
  "quests.svg": quests(),
  "farewell.svg": farewell(),
};
for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT, name), content, "utf8");
  console.log(`wrote assets/${name} (${(content.length / 1024).toFixed(1)} kB)`);
}