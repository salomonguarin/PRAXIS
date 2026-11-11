// PRAXIS — Etapa 1. Geometria parametrica de las tres rutas del simbolo X.
// Todas las figuras se construyen sobre un cuadrado de 100 x 100 unidades.
// Cada funcion devuelve una lista de poligonos (lista de puntos [x, y]).

const R2 = Math.SQRT2;
const f = n => +n.toFixed(3);

// Rotacion de 90 grados (k veces) alrededor del centro del cuadrado.
const rot = (p, k) => { let [x, y] = p; for (let i = 0; i < k; i++) [x, y] = [100 - y, x]; return [x, y]; };
// Coordenadas diagonales: u = distancia a la diagonal "\", v = distancia a la diagonal "/".
const uv = (u, v) => [50 + (u + v) / R2, 50 + (v - u) / R2];

// RUTA 01 — UMBRAL. La X es el vacio entre cuatro planos triangulares.
// c = ancho del canal, medido perpendicular a la diagonal (L/10 por defecto).
function umbral(c = 10) {
  const d = (c / 2) * R2;
  const t = [[d, 0], [100 - d, 0], [50, 50 - d]];
  return [0, 1, 2, 3].map(k => t.map(p => rot(p, k)));
}

// RUTA 02 — REFRACCION. Un plano de 2 modulos y un trazo de 1 modulo que sale desplazado.
// N   = numero de modulos por lado (m = 100 / N).
// gap = separacion horizontal entre trazo y plano, en modulos.
// s   = desplazamiento del trazo: 0 = alineado (X regular), 1 = desplazado un modulo.
function refraccion(N = 7, gap = 0.25, s = 1) {
  const m = 100 / N, W = 2 * m, t = m, gx = gap * m;
  const k = (100 - W) / 100; // pendiente dx/dy del plano
  const plane = [[0, 0], [W, 0], [100, 100], [100 - W, 100]];
  const off = s * (W - t) / 2;
  const a = 100 - W / 2 - t / 2 + off;      // borde izquierdo del brazo superior en y = 0
  const b = W / 2 - t / 2 - off;            // borde izquierdo del brazo inferior en y = 100
  const yR = x0 => (x0 - W - gx) / (2 * k); // encuentro con el borde derecho del plano
  const yL = x0 => (x0 + 100 * k + gx) / (2 * k); // encuentro con el borde izquierdo del plano
  const up = [[a, 0], [a + t, 0], [a + t - k * yR(a + t), yR(a + t)], [a - k * yR(a), yR(a)]];
  const lo = [[b, 100], [b + t, 100], [b + t + k * (100 - yL(b + t)), yL(b + t)], [b + k * (100 - yL(b)), yL(b)]];
  return [plane, up, lo];
}

// RUTA 03 — ENSAMBLE. Cuatro chevrones identicos convergen en el centro.
// b = espesor de la banda, c = canal entre piezas (b = 2c por defecto).
function ensamble(b = 9, c = 4.5) {
  const E = 50 * R2, h = c / 2;
  const top = [uv(h, -h), uv(E - h, -h), uv(E - h - b, -(h + b)), uv(h + b, -(h + b)), uv(h + b, h + b - E), uv(h, h - E)];
  return [0, 1, 2, 3].map(k => top.map(p => rot(p, k)));
}

// Exploraciones descartadas (se muestran solo como registro del proceso).
function molinete(w = 14) {
  const E = 50 * R2;
  const arm = [uv(0, 0), uv(E, 0), uv(E - w, -w), uv(0, -w)];
  return [0, 1, 2, 3].map(k => arm.map(p => rot(p, k)));
}
function rombo(W = 24) {
  const ul = [[0, 0], [W, 0], [50, 50 - (W / 2) / ((50 - W / 2) / 50) * 1], [50 - W / 2, 50]];
  const k = (100 - W) / 100;
  const tip = 50 - W / (2 * k);
  const base = [[0, 0], [W, 0], [50, tip], [50 - W / 2, 50]];
  const mk = (p, sx, sy) => [sx ? 100 - p[0] : p[0], sy ? 100 - p[1] : p[1]];
  return [[0, 0], [1, 0], [0, 1], [1, 1]].map(([sx, sy]) => base.map(p => mk(p, sx, sy)));
}
function contraste(W = 30, t = 4) {
  return [
    [[0, 0], [W, 0], [100, 100], [100 - W, 100]],
    [[100 - t, 0], [100, 0], [t, 100], [0, 100]],
  ];
}
function quincunx(g = 4) {
  const s = (100 - 2 * g) / 3, out = [];
  [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]].forEach(([i, j]) => {
    const x = i * (s + g), y = j * (s + g);
    out.push([[x, y], [x + s, y], [x + s, y + s], [x, y + s]]);
  });
  return out;
}

const toPolygons = polys => polys.map(p => `<polygon points="${p.map(q => `${f(q[0])},${f(q[1])}`).join(' ')}"/>`).join('');
const toPath = polys => polys.map(p => 'M' + p.map(q => `${f(q[0])} ${f(q[1])}`).join('L') + 'Z').join('');

// Archivo SVG independiente (para entrega).
function svgFile(polys, { fill = '#111111', bg = null, pad = 0, title = 'PRAXIS' } = {}) {
  const s = 100 + pad * 2;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${s} ${s}" width="1000" height="1000" role="img" aria-label="${title}">
  <title>${title}</title>
${bg ? `  <rect x="${-pad}" y="${-pad}" width="${s}" height="${s}" fill="${bg}"/>\n` : ''}  <path fill="${fill}" d="${toPath(polys)}"/>
</svg>
`;
}

module.exports = { umbral, refraccion, ensamble, molinete, rombo, contraste, quincunx, toPolygons, toPath, svgFile, rot, uv, f };
