// PRAXIS — Etapa 2. Wordmark dibujado a medida.
// Altura de mayusculas H = 100 unidades; linea base en y = 100 (eje y hacia abajo).
// Cada letra se construye con primitivas geometricas (rectangulos, semicirculos y
// paralelogramos) que se unen con operaciones booleanas para obtener contornos limpios.
// La X no se dibuja: es el simbolo aprobado (ruta 02 · Refraccion) a la altura de mayusculas.

const paper = require('paper/dist/paper-core.js');
const S = require('../etapa1/symbols');
paper.setup(new paper.Size(4000, 4000));

const K = 5 / 7; // pendiente (dx/dy) de las diagonales del simbolo

const rect = (x, y, w, h) => new paper.Path.Rectangle({ point: [x, y], size: [w, h], insert: false });
const circle = (cx, cy, r) => new paper.Path.Circle({ center: [cx, cy], radius: r, insert: false });
const poly = pts => new paper.Path({ segments: pts, closed: true, insert: false });
const union = items => items.reduce((a, b) => a.unite(b, { insert: false }));

// Cuenco con lado derecho semicircular (P, R). Alto bh, ancho total W, trazo s.
function bowl(W, bh, s, gap) {
  const Ro = bh / 2, Ri = Ro - s, cx = W - Ro, cy = bh / 2;
  const outer = union([rect(0, 0, cx, bh), circle(cx, cy, Ro)]);
  const inner = union([rect(s, s, cx - s, bh - 2 * s), circle(cx, cy, Ri)]);
  let b = outer.subtract(inner, { insert: false });
  if (gap > 0) b = b.subtract(rect(s, bh - s - 1, gap, s + 2), { insert: false });
  return b;
}

// Parametros por defecto; se pueden sobrescribir por opcion.
function letters(o) {
  const { s, W = 80, WA = 100, WS = 80, gap = 0 } = o;
  const bh = (100 + s) / 2; // los cuencos de P, R y S comparten altura

  const P = union([rect(0, 0, s, 100), bowl(W, bh, s, gap)]);

  // R: el cuenco de P y una pierna con la misma inclinacion del simbolo.
  const h = s * Math.sqrt(1 + K * K);       // ancho horizontal de un trazo inclinado
  const yTop = bh - s;                      // la pierna nace en la barra inferior del cuenco
  const dx = K * (100 - yTop);
  const xEnd = W; // la pierna termina en el borde derecho de la letra
  const leg = poly([[xEnd - h - dx, yTop], [xEnd - dx, yTop], [xEnd, 100], [xEnd - h, 100]]);
  const R = union([rect(0, 0, s, 100), bowl(W, bh, s, gap), leg]);

  // A: sin travesano (lambda). Apice plano de ancho igual al trazo horizontal.
  const kA = (WA / 2) / 100;
  const hA = s * Math.sqrt(1 + kA * kA);
  const legL = poly([[0, 100], [hA, 100], [WA / 2 + hA / 2, 0], [WA / 2 - hA / 2, 0]]);
  const legR = poly([[WA, 100], [WA - hA, 100], [WA / 2 - hA / 2, 0], [WA / 2 + hA / 2, 0]]);
  const A = union([legL, legR]);

  const I = rect(0, 0, s, 100);

  // S: dos semicirculos enlazados por tres barras horizontales.
  const hu = (100 + s) / 2, Ro = hu / 2, Ri = Ro - s;
  const halfL = circle(Ro, Ro, Ro).subtract(circle(Ro, Ro, Ri), { insert: false }).intersect(rect(-1, -1, Ro + 1, hu + 2), { insert: false });
  const cx2 = WS - Ro, cy2 = 100 - Ro;
  const halfR = circle(cx2, cy2, Ro).subtract(circle(cx2, cy2, Ri), { insert: false }).intersect(rect(cx2, cy2 - Ro - 1, Ro + 1, hu + 2), { insert: false });
  const Sg = union([halfL, halfR, rect(Ro, 0, WS - Ro, s), rect(Ro, hu - s, cx2 - Ro, s), rect(0, 100 - s, cx2, s)]);

  const X = union(S.refraccion(7, 0.25, 1).map(p => poly(p)));

  return { P, R, A, X, I, S: Sg, widths: { P: W, R: W, A: WA, X: 100, I: s, S: WS } };
}

// Compone la palabra. gaps = espacios entre letras (P-R, R-A, A-X, X-I, I-S) en unidades.
function wordmark(o) {
  const L = letters(o);
  const order = ['P', 'R', 'A', 'X', 'I', 'S'];
  const gaps = o.gaps;
  let x = 0;
  const parts = [], boxes = {};
  order.forEach((c, i) => {
    const g = L[c].clone({ insert: false });
    g.translate(new paper.Point(x, 0));
    parts.push({ c, d: g.pathData });
    boxes[c] = [x, x + L.widths[c]];
    x += L.widths[c] + (i < gaps.length ? gaps[i] : 0);
  });
  return { parts, w: x, h: 100, boxes, d: parts.map(p => p.d).join(''), dNoX: parts.filter(p => p.c !== 'X').map(p => p.d).join(''), dX: parts.find(p => p.c === 'X').d };
}

module.exports = { letters, wordmark, K };
