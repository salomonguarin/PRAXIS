// PRAXIS — Etapa 2. Composiciones del logotipo (todas en vectores; el texto va convertido a trazados).
const S = require('../etapa1/symbols');
const T = require('../etapa1/type');
const WM = require('./wordmark');

const DESC = 'FÁBRICA DE APRENDIZAJE';
const DESC_FONT = 'lexend-exa-300.ttf';
const f = S.f;

// Opciones de peso. s = grosor del trazo de las letras, en % de la altura de mayusculas.
const TRAZO = (100 / 7) * Math.cos(Math.atan(5 / 7)); // grosor perpendicular del trazo del simbolo = 11,63
const WEIGHTS = {
  A: { key: 'A', name: 'Ligera', s: 8.5, gaps: [50, 44, 40, 42, 50], note: 'La más cercana a la referencia.' },
  B: { key: 'B', name: 'Intermedia', s: 10, gaps: [48, 42, 38, 40, 48], note: 'Punto medio entre ligereza y presencia.' },
  C: { key: 'C', name: 'Trazo', s: TRAZO, gaps: [46, 40, 36, 38, 46], note: 'Las letras tienen el grosor exacto del trazo del símbolo.' },
};
const REC = 'C';

const cache = {};
function wm(k = REC) { return cache[k] || (cache[k] = WM.wordmark(WEIGHTS[k])); }

// Linea de refraccion: prolonga el borde comun del trazo del simbolo. En coordenadas del simbolo: x = 100 - m - (5/7) y
const M = 100 / 7;
const refrLine = (x0, y1, y2) => [[x0 + 100 - M - (5 / 7) * y1, y1], [x0 + 100 - M - (5 / 7) * y2, y2]];

// --- Wordmark solo ---
function wordmarkOnly(k = REC) {
  const w = wm(k);
  return { w: w.w, h: 100, inner: `<path d="${w.d}"/>` };
}

// --- Principal (apilada): wordmark y descriptor justificado al mismo ancho ---
function stacked(k = REC) {
  const w = wm(k), cap = 16, gap = 38;
  const d = T.justified(DESC_FONT, DESC, cap, w.w);
  const y = 100 + gap;
  return { w: w.w, h: y + cap, inner: `<path d="${w.d}"/><path transform="translate(0 ${y})" d="${d.d}"/>`, descY: y };
}

// --- Horizontal: wordmark | descriptor en dos lineas ---
function horizontal(k = REC) {
  const w = wm(k), cap = 19, g = 46, rw = 2.4;
  const l1 = T.textPath(DESC_FONT, 'FÁBRICA DE', { cap, track: cap * 0.42 });
  const l2 = T.textPath(DESC_FONT, 'APRENDIZAJE', { cap, track: cap * 0.42 });
  const rx = w.w + g, tx = rx + rw + g;
  const W = tx + Math.max(l1.w, l2.w);
  return { w: W, h: 100, inner: `<path d="${w.d}"/><rect x="${f(rx)}" y="0" width="${rw}" height="100"/><path transform="translate(${f(tx)} ${f(31 - cap)})" d="${l1.d}"/><path transform="translate(${f(tx)} ${f(81 - cap)})" d="${l2.d}"/>` };
}

// --- Isotipo ---
function symbol(reduced = false) {
  return { w: 100, h: 100, inner: S.toPolygons(S.refraccion(7, reduced ? 0 : 0.25, 1)) };
}

// --- Area de la arquitectura: wordmark / NOMBRE DEL AREA ---
function area(name, k = REC) {
  const w = wm(k), cap = 30, gap = 44;
  const t = T.textPath('lexend-exa-400.ttf', name, { cap, track: cap * 0.34 });
  const y = 100 + gap;
  return { w: Math.max(w.w, t.w), h: y + cap, inner: `<path d="${w.d}"/><path transform="translate(0 ${y})" d="${t.d}"/>` };
}

// SVG en linea (para el documento)
const inline = (L, { cls = 'lock', pad = 0, style = '' } = {}) =>
  `<svg class="${cls}" style="${style}" viewBox="${-pad} ${-pad} ${f(L.w + 2 * pad)} ${f(L.h + 2 * pad)}" fill="currentColor">${L.inner}</svg>`;

// Archivo SVG independiente
function file(L, { fill = '#111111', title = 'PRAXIS', pad = 0 } = {}) {
  const W = L.w + 2 * pad, H = L.h + 2 * pad;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${f(W)} ${f(H)}" width="${f(W * 4)}" height="${f(H * 4)}" role="img" aria-label="${title}">
  <title>${title}</title>
  <g fill="${fill}">${L.inner}</g>
</svg>
`;
}

module.exports = { WEIGHTS, REC, TRAZO, wm, wordmarkOnly, stacked, horizontal, symbol, area, inline, file, refrLine, M };
