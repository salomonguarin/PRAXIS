// Conversion de texto a trazados vectoriales (sin dependencia de fuentes instaladas).
const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');

const FONTS = path.join(__dirname, '..', 'fonts');
const cache = {};
function load(file) {
  if (!cache[file]) {
    const buf = fs.readFileSync(path.join(FONTS, file));
    cache[file] = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  }
  return cache[file];
}

// Devuelve { d, w, h } con la altura de mayusculas normalizada a `cap` y el borde izquierdo en x = 0.
function textPath(file, str, { cap = 100, track = 0 } = {}) {
  const font = load(file);
  const upm = font.unitsPerEm;
  const capH = (font.tables.os2 && font.tables.os2.sCapHeight) || 700;
  const size = cap * upm / capH, sc = size / upm;
  let x = 0, prev = null, first = true, xmax = 0;
  const parts = [];
  for (const ch of str) {
    const g = font.charToGlyph(ch);
    if (prev) x += font.getKerningValue(prev, g) * sc;
    // Los limites se leen del trazado (no de getMetrics, que altera el contorno en algunas fuentes).
    if (first) { const b0 = g.getPath(0, cap, size).getBoundingBox(); x = -b0.x1; first = false; }
    if (ch !== ' ') {
      const p = g.getPath(x, cap, size);
      parts.push(p.toPathData(2));
      xmax = p.getBoundingBox().x2;
    }
    x += g.advanceWidth * sc + track;
    prev = g;
  }
  return { d: parts.join(''), w: xmax, h: cap };
}

// Ajusta el tracking para que el texto ocupe exactamente `width`.
function justified(file, str, cap, width) {
  const base = textPath(file, str, { cap, track: 0 });
  const n = [...str].length - 1;
  const track = (width - base.w) / n;
  return textPath(file, str, { cap, track });
}

module.exports = { textPath, justified, load };
