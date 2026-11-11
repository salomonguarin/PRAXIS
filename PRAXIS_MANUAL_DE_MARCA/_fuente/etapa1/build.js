// PRAXIS — Etapa 1 · Direccion creativa.
// Genera: HTML editable, PDF A4, simbolos SVG y PNG de las tres rutas.
// Uso: node etapa1/build.js   (desde la carpeta _fuente)

const fs = require('fs');
const path = require('path');
const S = require('./symbols');
const T = require('./type');
const { ROUTES, CRITERIA, DISCARDED } = require('./content');

const OUT = path.join(__dirname, '..', '..', '01_Etapa_1_Direccion_Creativa');
const INK = '#111111', GRAPHITE = '#3A3A3C', MINERAL = '#8C8E90', MIST = '#E6E6E3', BONE = '#F3F3F0';
const TOTAL = 15;

const POLYS = { umbral: S.umbral(10), refraccion: S.refraccion(7, 0.25, 1), ensamble: S.ensamble(9, 4.5) };
const M = 100 / 7;

const sym = (key, { cls = '', vb = '0 0 100 100', style = '' } = {}) =>
  `<svg class="sym ${cls}" style="${style}" viewBox="${vb}" fill="currentColor">${S.toPolygons(POLYS[key])}</svg>`;
const raw = (polys, { cls = '', vb = '0 0 100 100', style = '' } = {}) =>
  `<svg class="sym ${cls}" style="${style}" viewBox="${vb}" fill="currentColor">${S.toPolygons(polys)}</svg>`;

// ---------- Composiciones simbolo + nombre (texto convertido a trazados) ----------
function lockH(r) {
  const gap = 30, cap = 60, dcap = 10.5;
  const wm = T.textPath(r.font.file, 'PRAXIS', { cap, track: cap * r.font.track });
  const ds = T.justified(r.font.desc, 'FÁBRICA DE APRENDIZAJE', dcap, wm.w);
  const x0 = 100 + gap, W = x0 + wm.w;
  return { w: W, h: 104, svg: `<svg class="lock" viewBox="0 0 ${S.f(W)} 104" fill="currentColor">${S.toPolygons(POLYS[r.key])}<path transform="translate(${x0} 0)" d="${wm.d}"/><path transform="translate(${x0} ${100 - dcap})" d="${ds.d}"/></svg>` };
}
function lockV(r) {
  const cap = 27, dcap = 6.2;
  const wm = T.textPath(r.font.file, 'PRAXIS', { cap, track: cap * r.font.track });
  const ds = T.justified(r.font.desc, 'FÁBRICA DE APRENDIZAJE', dcap, wm.w);
  const W = Math.max(100, wm.w), sx = (W - 100) / 2, wx = (W - wm.w) / 2;
  const y1 = 100 + 26, y2 = y1 + cap + 13, H = y2 + dcap + 2.4;
  return { w: W, h: H, svg: `<svg class="lock" viewBox="0 0 ${S.f(W)} ${S.f(H)}" fill="currentColor"><g transform="translate(${S.f(sx)} 0)">${S.toPolygons(POLYS[r.key])}</g><path transform="translate(${S.f(wx)} ${y1})" d="${wm.d}"/><path transform="translate(${S.f(wx)} ${y2})" d="${ds.d}"/></svg>` };
}
function lockI(r) {
  const cap = 100, track = cap * r.font.track, side = track + 13;
  const a = T.textPath(r.font.file, 'PRA', { cap, track });
  const b = T.textPath(r.font.file, 'IS', { cap, track });
  const x1 = a.w + side, x2 = x1 + 100 + side, W = x2 + b.w;
  return { w: W, h: 100, svg: `<svg class="lock" viewBox="0 0 ${S.f(W)} 100" fill="currentColor"><path d="${a.d}"/><g transform="translate(${S.f(x1)} 0)">${S.toPolygons(POLYS[r.key])}</g><path transform="translate(${S.f(x2)} 0)" d="${b.d}"/></svg>` };
}

// ---------- Diagramas de construccion ----------
const ln = (x1, y1, x2, y2, extra = '') => `<line x1="${S.f(x1)}" y1="${S.f(y1)}" x2="${S.f(x2)}" y2="${S.f(y2)}" ${extra}/>`;
const tx = (x, y, s, anchor = 'middle') => `<text x="${S.f(x)}" y="${S.f(y)}" text-anchor="${anchor}">${s}</text>`;
const dimH = (x1, x2, y, label) => `${ln(x1, y, x2, y)}${ln(x1, y - 1.4, x1, y + 1.4)}${ln(x2, y - 1.4, x2, y + 1.4)}${tx((x1 + x2) / 2, y < 50 ? y - 2.2 : y + 4.6, label)}`;
const dimV = (y1, y2, x, label) => `${ln(x, y1, x, y2)}${ln(x - 1.4, y1, x + 1.4, y1)}${ln(x - 1.4, y2, x + 1.4, y2)}<text x="${x - 2.4}" y="${(y1 + y2) / 2}" text-anchor="middle" transform="rotate(-90 ${x - 2.4} ${(y1 + y2) / 2})">${label}</text>`;
function grid(n) {
  let g = '';
  for (let i = 0; i <= n; i++) { const p = i * 100 / n; g += ln(p, 0, p, 100) + ln(0, p, 100, p); }
  return `<g stroke="#BDBDB9" stroke-width=".18">${g}</g>`;
}
function diagram(key) {
  const base = `<g fill="#D2D2CE">${S.toPolygons(POLYS[key])}</g><g fill="none" stroke="${INK}" stroke-width=".3">${S.toPolygons(POLYS[key])}</g>`;
  let over = '';
  if (key === 'umbral') {
    over = `${grid(10)}${base}
      <g stroke="${INK}" stroke-width=".28" stroke-dasharray="1.4 1.2">${ln(-7, -7, 107, 107)}${ln(107, -7, -7, 107)}</g>
      <g stroke="${INK}" stroke-width=".28">${dimH(0, 100, -8, 'L')}${ln(71.5, 21.5, 78.5, 28.5)}${ln(70.6, 22.4, 72.4, 20.6)}${ln(77.6, 29.4, 79.4, 27.6)}${ln(78.5, 28.5, 86, 36)}</g>
      ${tx(87, 40, 'canal = L/10', 'start')}`;
    // el rotulo se ubica sobre el triangulo derecho: usar fondo claro
    over = over.replace(tx(87, 40, 'canal = L/10', 'start'), `<rect x="70" y="46.6" width="27" height="6.4" fill="#fff"/>${tx(83.5, 51.2, 'canal = L/10')}<g stroke="${INK}" stroke-width=".28">${ln(80, 46.6, 76, 30)}</g>`);
  }
  if (key === 'refraccion') {
    const k = (100 - 2 * M) / 100;
    over = `${grid(7)}${base}
      <g stroke="${INK}" stroke-width=".3" stroke-dasharray="1.4 1.2">${ln(100 - M + k * 8, -8, M - k * 8, 108)}</g>
      <g stroke="${INK}" stroke-width=".28">${dimH(0, 2 * M, -8, '2m')}${dimH(100 - M, 100, -8, 'm')}${dimH(0, M, 108, 'm')}${dimH(100 - 2 * M, 100, 108, '2m')}${dimV(0, 100, -8, '7m')}${ln(76, 44, 62.2, 33.6)}</g>
      ${tx(74, 48, 'borde común', 'start')}`;
  }
  if (key === 'ensamble') {
    const p = (u, v) => S.uv(u, v);
    const a = p(11.25, -40), b = p(-11.25, -40);
    const t = u => { const q = p(u, -40), q1 = p(u, -41.6), q2 = p(u, -38.4); return ln(q1[0], q1[1], q2[0], q2[1]); };
    const lab = (u, s) => { const q = p(u, -47); return tx(q[0], q[1] + 1, s); };
    over = `${grid(10)}${base}
      <g stroke="${INK}" stroke-width=".28" stroke-dasharray="1.4 1.2">${ln(-7, -7, 107, 107)}${ln(107, -7, -7, 107)}</g>
      <g stroke="#fff" stroke-width="1.6">${ln(a[0], a[1], b[0], b[1])}</g>
      <g stroke="${INK}" stroke-width=".28">${dimH(0, 100, -8, 'L')}${ln(a[0], a[1], b[0], b[1])}${t(11.25)}${t(2.25)}${t(-2.25)}${t(-11.25)}</g>
      <g class="halo">${lab(6.75, 'b')}${lab(0, 'c')}${lab(-6.75, 'b')}</g>
      ${tx(108, 52, 'b = 2c', 'start')}`.replace(tx(108, 52, 'b = 2c', 'start'), tx(50, 112.6, 'b = 2c · piezas idénticas rotadas 90°'));
  }
  return `<svg class="diagram" viewBox="-16 -16 132 132">${over}</svg>`;
}

// ---------- Recursos derivados ----------
function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function pattern(key) {
  if (key === 'umbral') {
    const r = rng(7), tones = [INK, INK, GRAPHITE, MINERAL, '#C9C9C5'];
    let g = '';
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) {
      const tris = POLYS.umbral.filter(() => r() > 0.34);
      g += `<g transform="translate(${i * 25 + 2.5} ${j * 25 + 2.5}) scale(.2)" fill="${tones[Math.floor(r() * tones.length)]}">${S.toPolygons(tris)}</g>`;
    }
    return `<svg viewBox="0 0 177.5 102.5" preserveAspectRatio="xMidYMid slice">${g}</svg>`;
  }
  if (key === 'refraccion') {
    let g = '';
    [0, 0.25, 0.5, 0.75, 1].forEach((s, i) => {
      g += `<g transform="translate(${5 + i * 34.5} 22) scale(.3)" fill="${INK}">${S.toPolygons(S.refraccion(7, i === 0 ? 0 : 0.25 * Math.min(1, s * 2), s))}</g>`;
    });
    g += `<g stroke="${MINERAL}" stroke-width=".35">${ln(5, 66, 173, 66)}${[0, 1, 2, 3, 4].map(i => ln(20 + i * 34.5, 64.6, 20 + i * 34.5, 67.4)).join('')}</g>`;
    g += `<g font-family="IBM Plex Mono" font-size="3.1" fill="${GRAPHITE}" letter-spacing=".3">${['0', '¼ m', '½ m', '¾ m', '1 m'].map((t, i) => `<text x="${20 + i * 34.5}" y="74" text-anchor="middle">${t}</text>`).join('')}</g>`;
    return `<svg viewBox="0 0 178 103">${g}</svg>`;
  }
  // ensamble: el chevron como flecha
  const chev = POLYS.ensamble[3]; // pieza izquierda: apunta a la derecha
  let g = '';
  const tones = ['#C9C9C5', MINERAL, GRAPHITE, INK, INK, INK];
  for (let i = 0; i < 6; i++) g += `<g transform="translate(${8 + i * 21} 14) scale(.34)" fill="${tones[i]}">${S.toPolygons([chev])}</g>`;
  for (let i = 0; i < 12; i++) g += `<g transform="translate(${8 + i * 10.5} 58) scale(.17)" fill="${i % 4 === 3 ? INK : '#C9C9C5'}">${S.toPolygons([chev])}</g>`;
  g += `<g transform="translate(140 52) scale(.3)" fill="${INK}">${S.toPolygons(POLYS.ensamble)}</g>`;
  g += `<g font-family="IBM Plex Mono" font-size="3.1" fill="${GRAPHITE}" letter-spacing=".3"><text x="8" y="92">MÓDULO · FLECHA · SECUENCIA</text></g>`;
  return `<svg viewBox="0 0 178 103">${g}</svg>`;
}

// ---------- Piezas de pagina ----------
const hd = (n, dark) => `<div class="hd"><span>PRAXIS — Manual de marca</span><span>Etapa 1 · Dirección creativa</span><span>${String(n).padStart(2, '0')} / ${TOTAL}</span></div>`;
const ft = (l, r = 'Documento de trabajo · v0.1') => `<div class="ft"><span>${l}</span><span>${r}</span></div>`;
const page = (n, cls, inner, foot) => `<section class="page ${cls}">${hd(n)}${inner}${ft(foot)}</section>`;
const li = a => a.map(x => `<li>${x}</li>`).join('');

function cover() {
  return `<section class="page dark cover">
    <div class="hd"><span>PRAXIS — Fábrica de Aprendizaje</span><span>Manual de marca</span><span>Etapa 1 de 3</span></div>
    <div class="cv-title"><div class="mono">Dirección creativa</div><h1>Tres rutas<br>para el símbolo X</h1>
    <p>Exploración conceptual, fundamentos y recomendación. Documento para aprobación: el logotipo no se define hasta que una ruta sea elegida.</p></div>
    <div class="cv-syms">${ROUTES.map(r => `<div><div class="cv-box">${sym(r.key)}</div><div class="mono"><b>${r.n}</b> ${r.name}</div><div class="cv-claim">${r.claim}</div></div>`).join('')}</div>
    <div class="ft"><span>Noviembre de 2026</span><span>Documento de trabajo · v0.1</span></div>
  </section>`;
}

function pStart() {
  return page(2, '', `<div class="body">
    <div class="mono k">Punto de partida</div>
    <h2>Lo que el símbolo<br>debe resolver</h2>
    <div class="two">
      <blockquote class="quote">El conocimiento adquiere valor cuando se convierte en acción.<cite>Documento maestro · concepto central</cite></blockquote>
      <p class="lead">Los documentos base fijan la estrategia. Esta etapa no la reinterpreta: la traduce a forma. Antes de dibujar se separó lo decidido de lo abierto, y se identificaron las tensiones que el símbolo tiene que sostener.</p>
    </div>
    <div class="three rule-top">
      <div><div class="mono">Decisiones que se respetan</div><ul class="list">${li(['PRAXIS es la marca principal. Arquitectura Branded House.', 'La X es protagonista del símbolo. La P no se usa como isotipo.', 'Geometría abstracta y arquitectura visual; ninguna ilustración literal.', 'Identidad monocromática: negro carbón, blanco, gris mineral y gris grafito.', 'Sin degradados, efectos metálicos ni colores por área.', 'Tipografía geométrica, fuerte en mayúsculas.', 'Un solo símbolo para todas las áreas y formatos.'])}</ul></div>
      <div><div class="mono">El símbolo debe transmitir</div><ul class="list big">${li(['Adaptación', 'Inteligencia', 'Interacción', 'Movimiento controlado', 'Transformación', 'Conexión entre sistemas'])}</ul><p class="small">Y debe ser sencillo, contundente, reconocible y reproducible.</p></div>
      <div><div class="mono">Queda excluido</div><ul class="list strike">${li(['La letra P como isotipo', 'Dibujos de animales', 'Engranajes y tuercas', 'Rompecabezas evidentes', 'Escudos y emblemas militares', 'Bombillas, cerebros, personas aprendiendo', 'Iconografía educativa convencional', 'Clichés visuales orientales'])}</ul></div>
    </div>
    <div class="rule-top"><div class="mono">Tres tensiones de diseño · lectura del estudio</div>
      <div class="three tens">
        <div><div class="num">1</div><h4>Autoridad y cercanía</h4><p>Debe convocar a la alta dirección y, al mismo tiempo, ser clara para quien trabaja directamente en la operación.</p></div>
        <div><div class="num">2</div><h4>Disciplina y adaptación</h4><p>Método y precisión —Roma, Toyota, el dojo— junto a movimiento e inteligencia adaptativa —Metis, el camaleón—.</p></div>
        <div><div class="num">3</div><h4>Abstracción y reconocimiento</h4><p>Una X con construcción propia que siga leyéndose como X sin el apoyo del nombre.</p></div>
      </div>
    </div>
    <div class="band"><div><div class="mono">Concepto rector</div><div class="band-t">Inteligencia estratégica en movimiento.</div></div><div class="band-r mono">Audacia y transformación<br>Innovación y futuro<br>Elegancia intelectual</div></div>
  </div>`, 'Punto de partida');
}

function pOverview() {
  const disc = { molinete: S.molinete(14), rombo: S.rombo(24), contraste: S.contraste(30, 4), quincunx: S.quincunx(4) };
  return page(3, '', `<div class="body">
    <div class="mono k">Método de exploración</div>
    <h2>Tres preguntas<br>sobre la X</h2>
    <p class="lead w60">No se presentan tres estilos de un mismo logo. Cada ruta responde a una pregunta distinta sobre qué es la X para PRAXIS; de esa respuesta se derivan su geometría, su tipografía y su comportamiento.</p>
    <div class="three ov">${ROUTES.map(r => `<div class="ov-c"><div class="ov-box">${sym(r.key)}</div><div class="mono">Ruta ${r.n}</div><h3 style="${r.font.css}">${r.name}</h3><div class="ov-q">${r.q}</div><p>${r.short}</p><div class="mono dim">Énfasis · ${r.emphasis}</div></div>`).join('')}</div>
    <div class="rule-top"><div class="mono">Exploraciones descartadas</div>
      <div class="four disc">${DISCARDED.map(d => `<div><div class="disc-box">${raw(disc[d[0]])}</div><h4>${d[1]}</h4><p>${d[2]}</p></div>`).join('')}</div>
    </div>
  </div>`, 'Método de exploración');
}

function pHero(r, n) {
  return page(n, 'hero', `<div class="body">
    <div class="hero-top"><div class="mono k">Ruta ${r.n}</div><div class="mono dim">${r.claim}</div></div>
    <div class="hero-sym">${sym(r.key)}</div>
    <div class="hero-bottom">
      <div><h2 class="hero-name" style="${r.font.css}">${r.name}</h2><blockquote class="quote sm">${r.idea}</blockquote></div>
      <div><p class="lead">${r.text}</p>
        <div class="mono mt">Referentes del documento maestro</div><ul class="list">${li(r.refs)}</ul>
        <div class="mono mt">Atributo dominante · <b>${r.emphasis}</b></div></div>
    </div>
  </div>`, `Ruta ${r.n} · ${r.name} · Concepto`);
}

function pBuild(r, n) {
  const h = lockH(r), v = lockV(r), i = lockI(r);
  const sizes = [[14, '14 mm'], [10, '10 mm'], [7, '7 mm'], [5, '5 mm'], [3, '3 mm']];
  return page(n, '', `<div class="body">
    <div class="mono k">Ruta ${r.n} · ${r.name}</div>
    <h2 class="h2s">Construcción y versiones</h2>
    <div class="b-row1">
      <div class="b-diag">${diagram(r.key)}</div>
      <div class="b-rules"><div class="mono">Lógica de construcción</div><ol class="rules">${li(r.rules)}</ol>
        <div class="b-sz"><div class="mono">Prueba de reducción</div>
        <div class="sizes">${sizes.map(s => `<div><div class="sz">${sym(r.key, { style: `width:${s[0]}mm;height:${s[0]}mm` })}</div><span class="mono dim">${s[1]}</span></div>`).join('')}</div>
        <p class="small">Se muestra el mismo dibujo maestro en todos los tamaños, sin correcciones, para evaluar su comportamiento real.</p></div>
      </div>
    </div>
    <div class="b-row2">
      <div class="tile t-white">${sym(r.key)}<span class="cap mono">Positivo</span></div>
      <div class="tile t-ink">${sym(r.key)}<span class="cap mono">Negativo</span></div>
      <div class="tile t-min">${sym(r.key)}<span class="cap mono">Sobre gris mineral</span></div>
    </div>
    <div class="b-row3">
      <div class="b-left">
        <div class="tile t-white lk"><div class="lk-in" style="width:${Math.min(96, 30 * h.w / h.h)}mm">${h.svg}</div><span class="cap mono">Composición horizontal</span></div>
        <div class="tile t-ink lk"><div class="lk-in" style="width:${Math.min(98, 15 * i.w / i.h)}mm">${i.svg}</div><span class="cap mono">Variante: X integrada en el nombre</span></div>
      </div>
      <div class="tile t-bone lk v"><div class="lk-in" style="width:${Math.min(44, 62 * v.w / v.h)}mm">${v.svg}</div><span class="cap mono">Composición vertical</span></div>
    </div>
  </div>`, `Ruta ${r.n} · ${r.name} · Construcción`);
}

function pApply(r, n) {
  const crop = { umbral: '18 30 62 36.6', refraccion: '14 22 70 41.4', ensamble: '14 28 70 41.4' }[r.key];
  return page(n, '', `<div class="body">
    <div class="mono k">Ruta ${r.n} · ${r.name}</div>
    <h2 class="h2s">Tipografía y aplicación</h2>
    <div class="a-row1">
      <div class="spec"><div class="mono">Dirección tipográfica</div>
        <div class="spec-xar" style="${r.font.css}">X A R</div>
        <div class="spec-name"><b>${r.font.name}</b> ${r.font.weight} · SIL Open Font License 1.1</div>
        <p class="small">${r.font.note} Las letras X, A y R se dibujarán a medida en la Etapa 2, como pide el documento maestro.</p>
      </div>
      <div class="hier">
        <div class="mono">Jerarquía de prueba</div>
        <div class="hier-t" style="${r.font.css}">Experimentar antes<br>de implementar.</div>
        <div class="hier-s" style="${r.font.css}">PRAXIS OPERATIONS <span style="${r.font.cssText}">— Laboratorio de mejora continua</span></div>
        <p class="hier-b" style="${r.font.cssText}">PRAXIS es una fábrica de aprendizaje experiencial dirigida a empresarios, gerentes, directivos, supervisores y líderes de organizaciones.</p>
        <div class="mono dim">LAB · SIMULATION · ACADEMY</div>
        <div class="mono dim hier-sys">${r.font.system}</div>
      </div>
    </div>
    <div class="a-row2">
      <div class="app"><div class="app-in a-cards"><div class="card c-ink">${sym(r.key)}</div><div class="card c-white"><div class="c-top">${sym(r.key)}<span style="${r.font.css}letter-spacing:${r.font.track}em">PRAXIS</span></div><div class="c-bot"><span class="c-n" style="${r.font.css}">Nombre Apellido</span><span class="mono">Cargo · Área</span></div></div></div><span class="cap mono">Tarjeta · anverso y reverso</span></div>
      <div class="app"><div class="app-in a-sign">${sym(r.key)}<div class="s-txt"><div class="s-1" style="${r.font.css}letter-spacing:${r.font.track}em">PRAXIS</div><div class="s-2" style="${r.font.cssText}letter-spacing:${r.font.track}em">OPERATIONS</div><div class="s-3 mono">Laboratorio de mejora continua</div></div></div><span class="cap mono w">Arquitectura · identificación de área</span></div>
      <div class="app"><div class="app-in a-super"><svg class="sup" viewBox="${crop}" preserveAspectRatio="xMidYMid slice" fill="currentColor">${S.toPolygons(POLYS[r.key])}</svg><div class="sup-lock" style="${r.font.css}letter-spacing:${r.font.track}em">PRAXIS</div></div><span class="cap mono w">Supergráfico · portada o muro</span></div>
      <div class="app"><div class="app-in a-pat">${pattern(r.key)}</div><span class="cap mono">${{ umbral: 'Recurso derivado · mosaico modular', refraccion: 'Recurso derivado · principio de movimiento', ensamble: 'Recurso derivado · el módulo como flecha' }[r.key]}</span></div>
    </div>
    <div class="a-row3">
      <div><div class="mono">Ventajas</div><ul class="list plus">${li(r.pros)}</ul></div>
      <div><div class="mono">Limitaciones</div><ul class="list minus">${li(r.cons)}</ul></div>
    </div>
  </div>`, `Ruta ${r.n} · ${r.name} · Aplicación`);
}

function pCompare() {
  const dots = v => `<span class="dots">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= v ? 'on' : ''}"></i>`).join('')}</span>`;
  return page(13, '', `<div class="body">
    <div class="mono k">Comparativo</div>
    <h2 class="h2s">Las tres rutas frente a frente</h2>
    <div class="three cmp">${ROUTES.map(r => `<div><div class="tile t-white cmp-a">${sym(r.key)}</div><div class="tile t-ink cmp-b">${sym(r.key)}<div class="cmp-sm">${[9, 6, 4, 2.6].map(s => sym(r.key, { style: `width:${s}mm;height:${s}mm` })).join('')}</div></div><div class="cmp-l"><span class="mono">Ruta ${r.n}</span><b style="${r.font.css}">${r.name}</b></div></div>`).join('')}</div>
    <table class="mx"><thead><tr><th>Criterio del documento maestro</th><th class="c">Importancia</th>${ROUTES.map(r => `<th>${r.n} ${r.name}</th>`).join('')}</tr></thead>
      <tbody>${CRITERIA.map((c, i) => `<tr><td>${c[0]}</td><td class="c mono dim">${c[1]}</td>${ROUTES.map(r => `<td>${dots(r.score[i])}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <div class="two note"><p class="small"><b>Cómo leer la tabla.</b> Es una valoración cualitativa del estudio frente a los criterios de la sección 13 del documento maestro, en una escala de uno a cinco. No es una medición ni sustituye pruebas con público real. Se omiten totales a propósito: los criterios no son sumables.</p>
    <p class="small"><b>Lectura.</b> Umbral gana en robustez y pierde en diferenciación. Ensamble aporta el sistema más rico y el símbolo más frágil. Refracción es la más equilibrada y la única que obtiene la valoración más alta en los criterios de concepto, recordación y diferenciación.</p></div>
  </div>`, 'Comparativo');
}

function pReco() {
  const r = ROUTES[1], h = lockH(r);
  return page(14, 'dark', `<div class="body">
    <div class="mono k">Recomendación del estudio</div>
    <h2>Ruta 02<br><span style="${r.font.css}">Refracción</span></h2>
    <div class="rc-top"><div class="rc-sym">${sym(r.key)}</div>
      <div class="rc-why">
        <div class="rc-i"><div class="num">1</div><div><h4>Cuenta la marca, no solo la nombra.</h4><p>Las otras rutas describen un atributo —el espacio, el sistema—. Refracción describe lo que le ocurre a una persona en PRAXIS: entra con conocimiento y sale con otra trayectoria.</p></div></div>
        <div class="rc-i"><div class="num">2</div><div><h4>Sostiene las tres tensiones.</h4><p>Peso y rigor para la alta dirección; una X inmediata para la planta; disciplina modular y, a la vez, movimiento.</p></div></div>
        <div class="rc-i"><div class="num">3</div><div><h4>Es propia.</h4><p>La asimetría y el borde común le dan una silueta que no depende de adornos, de color ni del nombre.</p></div></div>
        <div class="rc-i"><div class="num">4</div><div><h4>Crece con el sistema.</h4><p>Del símbolo salen dos recursos: el plano —ventana fotográfica, soporte de titulares— y el trazo —línea de recorrido, eje de diagramas, flecha—.</p></div></div>
      </div>
    </div>
    <div class="rule-top"><div class="mono">Recursos que nacen del símbolo</div>
      <div class="three rc-res">
        <div><div class="rc-t"><svg viewBox="0 0 120 56"><polygon points="24,6 58,6 96,50 62,50" fill="#3A3A3C"/><text x="60" y="29.4" text-anchor="middle">IMAGEN</text></svg></div><div class="mono">El plano</div><p>Ventana fotográfica y soporte de titulares.</p></div>
        <div><div class="rc-t"><svg viewBox="0 0 120 56"><g transform="translate(38 6) scale(.44)"><g fill="none" stroke="#5a5a5c" stroke-width=".9" stroke-dasharray="3 2.4">${S.toPolygons([POLYS.refraccion[0]])}</g><g fill="#fff">${S.toPolygons([POLYS.refraccion[1], POLYS.refraccion[2]])}</g></g></svg></div><div class="mono">El trazo</div><p>Línea de recorrido, eje de diagramas y flecha.</p></div>
        <div><div class="rc-t"><svg viewBox="0 0 120 56">${[0, 0.25, 0.5, 0.75, 1].map((s, i) => `<g transform="translate(${5 + i * 23} 18) scale(.19)" fill="#fff">${S.toPolygons(S.refraccion(7, i === 0 ? 0 : 0.25 * Math.min(1, s * 2), s))}</g>`).join('')}</svg></div><div class="mono">El desplazamiento</div><p>Principio de movimiento para medios digitales.</p></div>
      </div>
    </div>
    <div class="two rule-top rc-bot">
      <div><div class="mono">Qué se conserva de las otras rutas</div><p>De Umbral, la disciplina del módulo cuadrado para retículas y señalización. De Ensamble, la idea de que el símbolo aporte su propia flecha: el trazo de Refracción puede cumplir esa función.</p></div>
      <div><div class="mono">Qué se afinará en la Etapa 2</div><ul class="list">${li(['Ángulo y proporción entre plano y trazo.', 'Separación entre piezas y versión reducida.', 'Corrección óptica de terminales y vértices.', 'Wordmark con X, A y R dibujadas a partir del símbolo.', 'Decisión sobre la X integrada en el nombre.'])}</ul></div>
    </div>
    <div class="rc-lock"><div style="width:${17 * h.w / h.h}mm">${h.svg}</div><span class="mono dim">Composición provisional. No es el logotipo definitivo.</span></div>
  </div>`, 'Recomendación');
}

function pNext() {
  return page(15, '', `<div class="body">
    <div class="mono k">Cierre de la etapa</div>
    <h2>Decisión solicitada<br>y validaciones</h2>
    <div class="dec"><div class="mono">Decisión que se solicita</div>
      <div class="three dec-o"><div><div class="num">A</div><h4>Aprobar una ruta</h4><p>01 Umbral, 02 Refracción o 03 Ensamble, tal como se presenta.</p></div><div><div class="num">B</div><h4>Aprobar con ajustes</h4><p>Elegir una ruta e indicar qué debe cambiar antes de construir el logotipo.</p></div><div><div class="num">C</div><h4>Pedir nueva exploración</h4><p>Si ninguna ruta representa a PRAXIS, se abre una segunda ronda con otro enfoque.</p></div></div>
      <p class="small">Sin esta decisión no se define el logotipo ni se inicia la Etapa 2.</p>
    </div>
    <div class="two rule-top">
      <div><div class="mono">Validaciones pendientes</div>
        <div class="val"><h4>Registrabilidad</h4><p>No se ha hecho búsqueda de antecedentes marcarios. Antes de aprobar el logotipo definitivo se recomienda consultar los registros de la Superintendencia de Industria y Comercio para el nombre PRAXIS y para el símbolo elegido, al menos en las clases 41 (educación y formación) y 35 (gestión de negocios) de la Clasificación de Niza, con apoyo de un abogado de propiedad industrial. El régimen aplicable es la Decisión 486 de 2000 de la Comunidad Andina.</p></div>
        <div class="val"><h4>Arquitectura de marca</h4><p>Siguen abiertas las decisiones del documento de arquitectura: áreas disponibles al lanzamiento, Academy como oferta o como formato, Simulation como área y como formato, tecnologías de gemelos digitales efectivamente disponibles e idioma de los nombres.</p></div>
        <div class="val"><h4>Tipografía y color</h4><p>Las fuentes propuestas tienen licencia abierta (SIL OFL 1.1), verificada en los archivos de licencia incluidos en la carpeta de fuentes. Los valores de gris de este documento son provisionales; los códigos HEX, RGB y CMYK se fijan en la Etapa 2.</p></div>
      </div>
      <div><div class="mono">Nota de método</div>
        <div class="val"><h4>Cómo se produjo este documento</h4><p>Los símbolos se construyeron como geometría paramétrica y se entregan en SVG. El texto de las composiciones se convirtió a trazados. El documento se compuso en HTML y se exportó a PDF. Los archivos fuente están en la carpeta <i>_fuente</i> y permiten regenerar todo.</p></div>
        <div class="val"><h4>Lo que no se utilizó</h4><p>No se usó generación de imágenes: no hay un generador disponible en este entorno de trabajo. En las etapas 2 y 3 los mockups serán escenas vectoriales construidas a escala, no fotografías. Si se requieren mockups fotográficos harán falta fotografías reales del espacio o una herramienta de generación de imágenes.</p></div>
        <div class="mono mt">Etapa 2 · al aprobar</div>
        <ul class="list">${li(['Logotipo, isotipo y versiones; retícula, área de seguridad, tamaños mínimos y usos.', 'Sistema tipográfico y sistema cromático.', 'Sistema gráfico, iconografía y dirección fotográfica.', 'Identidad verbal y arquitectura Branded House.', 'Aplicaciones: espacio, papelería, digital y materiales de formación.'])}</ul>
      </div>
    </div>
    <div class="stages"><div class="st on"><div class="mono">Etapa 1 · en aprobación</div><h4>Dirección creativa</h4><p>Tres rutas para el símbolo X y recomendación. Este documento.</p></div><div class="st"><div class="mono">Etapa 2</div><h4>Identidad visual</h4><p>Logotipo, tipografía, color, sistema gráfico y aplicaciones.</p></div><div class="st"><div class="mono">Etapa 3</div><h4>Manual final</h4><p>Manual completo en PDF, archivos maestros y recursos de identidad.</p></div></div>
    <div class="end"><div class="end-s">${ROUTES.map(r => sym(r.key)).join('')}</div><div class="mono">Una marca. Un sistema. Múltiples experiencias.</div></div>
  </div>`, 'Cierre de la etapa');
}

// ---------- Estilos ----------
const css = `
@font-face{font-family:'Instrument Sans';font-weight:400;src:url('../_fuente/fonts/instrument-sans-latin-400-normal.woff2')}
@font-face{font-family:'Instrument Sans';font-weight:500;src:url('../_fuente/fonts/instrument-sans-latin-500-normal.woff2')}
@font-face{font-family:'Instrument Sans';font-weight:600;src:url('../_fuente/fonts/instrument-sans-latin-600-normal.woff2')}
@font-face{font-family:'IBM Plex Mono';font-weight:400;src:url('../_fuente/fonts/ibm-plex-mono-latin-400-normal.woff2')}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url('../_fuente/fonts/ibm-plex-mono-latin-500-normal.woff2')}
@font-face{font-family:'Jost';font-weight:300;src:url('../_fuente/fonts/jost-latin-300-normal.woff2')}
@font-face{font-family:'Jost';font-weight:400;src:url('../_fuente/fonts/jost-latin-400-normal.woff2')}
@font-face{font-family:'Jost';font-weight:500;src:url('../_fuente/fonts/jost-latin-500-normal.woff2')}
@font-face{font-family:'Sora';font-weight:300;src:url('../_fuente/fonts/sora-latin-300-normal.woff2')}
@font-face{font-family:'Sora';font-weight:400;src:url('../_fuente/fonts/sora-latin-400-normal.woff2')}
@font-face{font-family:'Archivo';font-weight:400;src:url('../_fuente/fonts/archivo-400.ttf')}
@font-face{font-family:'Archivo';font-weight:500;src:url('../_fuente/fonts/archivo-500.ttf')}
@font-face{font-family:'Archivo Expanded';font-weight:500;src:url('../_fuente/fonts/archivo-expanded-500.ttf')}
@font-face{font-family:'Archivo Expanded';font-weight:600;src:url('../_fuente/fonts/archivo-expanded-600.ttf')}
@font-face{font-family:'Newsreader';font-weight:400;src:url('../_fuente/fonts/newsreader-latin-400-normal.woff2')}
@font-face{font-family:'Newsreader';font-weight:400;font-style:italic;src:url('../_fuente/fonts/newsreader-latin-400-italic.woff2')}
@page{size:210mm 297mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
:root{--ink:${INK};--graphite:${GRAPHITE};--mineral:${MINERAL};--mist:${MIST};--bone:${BONE}}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:#777}
body{font-family:'Instrument Sans',sans-serif;color:var(--ink);font-size:8.4pt;line-height:1.46}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:#fff;margin:0 auto}
@media screen{.page{margin:8mm auto;box-shadow:0 2mm 8mm rgba(0,0,0,.35)}}
.page.dark{background:var(--ink);color:#fff}
.hd{position:absolute;top:9mm;left:14mm;right:14mm;display:grid;grid-template-columns:1fr 1fr 1fr;font:500 5.8pt 'IBM Plex Mono';letter-spacing:.14em;text-transform:uppercase;padding-bottom:2.6mm;border-bottom:.2mm solid currentColor}
.hd span:nth-child(2){text-align:center}.hd span:nth-child(3){text-align:right}
.ft{position:absolute;bottom:8mm;left:14mm;right:14mm;display:flex;justify-content:space-between;font:400 5.8pt 'IBM Plex Mono';letter-spacing:.14em;text-transform:uppercase;color:var(--mineral)}
.body{position:absolute;top:23mm;left:14mm;right:14mm;bottom:17mm}
.mono{font-family:'IBM Plex Mono';font-size:5.8pt;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.5}
.mono b{font-weight:500}.dim{color:var(--mineral)}.dark .dim{color:#9a9c9e}
.k{margin-bottom:3mm}.mt{margin-top:5mm}
svg.sym{display:block;width:100%;height:auto}
h1{font-weight:500;font-size:44pt;line-height:1.02;letter-spacing:-.025em}
h2{font-weight:500;font-size:27pt;line-height:1.04;letter-spacing:-.022em;margin-bottom:8mm}
h2.h2s{font-size:20pt;margin-bottom:6mm}
h3{font-size:15pt;line-height:1.1;font-weight:500}
h4{font-size:8.6pt;font-weight:600;line-height:1.3;margin-bottom:1mm}
p{hyphens:manual}
.lead{font-size:9.6pt;line-height:1.48}.w60{width:62%}
.small{font-size:7.2pt;line-height:1.45;color:var(--graphite)}.dark .small{color:#b9bbbd}
.two{display:grid;grid-template-columns:1fr 1fr;gap:8mm}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:8mm}
.four{display:grid;grid-template-columns:repeat(4,1fr);gap:6mm}
.rule-top{border-top:.2mm solid currentColor;padding-top:3mm;margin-top:8mm}
.rule-top>.mono:first-child,.three>div>.mono:first-child,.two>div>.mono:first-child{margin-bottom:3mm}
.quote{font-family:'Newsreader',serif;font-style:italic;font-size:19pt;line-height:1.16;letter-spacing:-.01em}
.quote.sm{font-size:14.5pt;margin-top:5mm}
.quote cite{display:block;font:500 5.8pt 'IBM Plex Mono';font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:var(--mineral);margin-top:4mm}
.list{list-style:none}.list li{padding:1.25mm 0;border-bottom:.15mm solid var(--mist);line-height:1.38}
.dark .list li{border-color:#333}
.list.big li{font-size:11pt;font-weight:500;letter-spacing:-.01em;padding:1.5mm 0}
.list.strike li{color:var(--graphite);text-decoration:line-through;text-decoration-color:var(--mineral)}
.list.plus li,.list.minus li{padding-left:5mm;position:relative}
.list.plus li:before{content:'+';position:absolute;left:0;font-family:'IBM Plex Mono';font-weight:500}
.list.minus li:before{content:'–';position:absolute;left:0;font-family:'IBM Plex Mono';font-weight:500}
.num{font:500 5.8pt 'IBM Plex Mono';width:5mm;height:5mm;border:.2mm solid currentColor;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:2.4mm}
.tens{margin-top:1mm}
.band{position:absolute;left:0;right:0;bottom:0;background:var(--ink);color:#fff;padding:6mm 7mm;display:flex;justify-content:space-between;align-items:flex-end}
.band-t{font-size:17pt;font-weight:500;letter-spacing:-.02em;margin-top:2mm}.band-r{text-align:right;color:#b9bbbd}

/* portada */
.cover .cv-title{position:absolute;left:14mm;top:58mm;width:150mm}
.cover h1{margin:5mm 0 7mm}.cover p{font-size:10pt;width:98mm;color:#c9cbcd;line-height:1.5}
.cv-syms{position:absolute;left:14mm;right:14mm;bottom:30mm;display:grid;grid-template-columns:repeat(3,1fr);gap:8mm}
.cv-box{border:.2mm solid #3a3a3c;padding:11mm;margin-bottom:4mm}
.cv-claim{font-size:9pt;color:#c9cbcd;margin-top:.6mm}
.cover .ft{color:#9a9c9e}

/* metodo */
.ov{margin-top:9mm}.ov-box{background:var(--bone);padding:12mm;margin-bottom:4mm}
.ov-c h3{margin:1mm 0 2.4mm;font-size:17pt}.ov-q{font-family:'Newsreader';font-style:italic;font-size:11.5pt;line-height:1.2;margin-bottom:2mm}
.ov-c p{margin-bottom:3mm}
.disc-box{width:17mm;margin-bottom:3mm;color:var(--mineral)}.disc p{font-size:7.2pt;line-height:1.42;color:var(--graphite)}

/* heroe */
.hero-top{display:flex;justify-content:space-between}
.hero-sym{position:absolute;top:17mm;left:50%;width:128mm;margin-left:-64mm}
.hero-bottom{position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:1fr 1fr;gap:8mm;border-top:.2mm solid var(--ink);padding-top:5mm;height:88mm}
.hero-name{font-size:33pt;margin:0;letter-spacing:-.01em;line-height:1}

/* construccion */
.b-row1{display:grid;grid-template-columns:88mm 1fr;gap:8mm;height:91mm}
.b-diag{background:var(--bone)}
.diagram{display:block;width:100%;height:100%}
.diagram text{font-family:'IBM Plex Mono';font-size:3.1px;fill:${INK};letter-spacing:.05px;stroke:none}
.diagram .halo text{paint-order:stroke;stroke:#fff;stroke-width:1.4px;stroke-linejoin:round}
.rules{list-style:none;counter-reset:r}.rules li{counter-increment:r;padding:1.3mm 0 1.3mm 7mm;position:relative;border-bottom:.15mm solid var(--mist);line-height:1.38}
.rules li:before{content:counter(r,decimal-leading-zero);position:absolute;left:0;top:1.7mm;font:500 5.8pt 'IBM Plex Mono';color:var(--mineral)}
.b-rules{display:flex;flex-direction:column}.b-rules>.mono:first-child{margin-bottom:2mm}.b-sz{margin-top:auto;padding-top:4mm}
.sizes{display:flex;align-items:flex-end;gap:6mm;margin:3mm 0 2.4mm}.sizes>div{display:flex;flex-direction:column;align-items:flex-start;gap:1.6mm}
.tile{position:relative;display:flex;align-items:center;justify-content:center}
.t-white{background:#fff;border:.2mm solid var(--mist)}.t-ink{background:var(--ink);color:#fff}.t-min{background:var(--mineral);color:var(--ink)}.t-bone{background:var(--bone)}
.cap{position:absolute;left:3mm;bottom:2.4mm;color:var(--mineral)}.t-min .cap{color:var(--ink)}.cap.w{color:#9a9c9e}
.b-row2{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin-top:6mm;height:52mm}
.b-row2 .sym{width:27mm}
.b-row3{display:grid;grid-template-columns:1fr 54mm;gap:4mm;margin-top:4mm;height:83mm}
.b-left{display:grid;grid-template-rows:1fr 1fr;gap:4mm}
.lock{display:block;width:100%;height:auto}

/* aplicacion */
.a-row1{display:grid;grid-template-columns:70mm 1fr;gap:8mm;height:62mm;border-top:.2mm solid var(--ink);padding-top:3mm}
.spec-xar{font-size:50pt;line-height:1;margin:5mm 0 4mm;letter-spacing:.04em;white-space:nowrap}
.spec-name{font-size:7.4pt;margin-bottom:1.6mm}
.hier-t{font-size:19pt;line-height:1.06;margin:3mm 0 3mm;letter-spacing:-.01em}
.hier-s{font-size:8.6pt;letter-spacing:.06em;margin-bottom:2mm}
.hier-b{font-size:8.4pt;line-height:1.5;margin-bottom:3mm;width:92%}
.hier-sys{margin-top:1.4mm}
.a-row2{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:4mm;height:116mm;margin-top:6mm}
.app{position:relative;overflow:hidden}.app-in{position:absolute;inset:0}
.a-cards{background:var(--bone);display:flex;align-items:center;justify-content:center;gap:5mm;padding-bottom:4mm}
.card{width:36mm;height:23.3mm;position:relative;box-shadow:0 .6mm 1.6mm rgba(0,0,0,.14)}
.c-ink{background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center}.c-ink .sym{width:9mm}
.c-white{background:#fff;padding:3mm}.c-top{display:flex;align-items:center;gap:1.6mm;font-size:5.4pt}.c-top .sym{width:3.4mm}
.c-bot{position:absolute;left:3mm;bottom:3mm;display:flex;flex-direction:column;gap:.4mm}.c-n{font-size:5.6pt}.c-bot .mono{font-size:3.6pt;color:var(--mineral)}
.a-sign{background:var(--ink);color:#fff;display:flex;align-items:center;gap:7mm;padding:0 9mm 3mm}
.a-sign .sym{width:19mm;flex:none}.s-1{font-size:13.5pt;line-height:1.15}.s-2{font-size:13.5pt;line-height:1.15;color:#c9cbcd}
.s-3{margin-top:3mm;padding-top:2.4mm;border-top:.2mm solid #4a4a4c;font-size:4.9pt;color:#c9cbcd}
.a-super{background:var(--ink);color:#2c2c2e}.sup{position:absolute;inset:0;width:100%;height:100%}
.sup-lock{position:absolute;right:5mm;top:4.5mm;color:#fff;font-size:8pt}
.a-pat{background:var(--bone);display:flex;align-items:center;justify-content:center;padding:5mm 5mm 8mm}.a-pat svg{width:100%;height:100%}
.a-row3{display:grid;grid-template-columns:1fr 1fr;gap:8mm;margin-top:6mm}
.a-row3 .mono{margin-bottom:1.5mm}.a-row3 .list li{font-size:7.8pt;padding:1.05mm 0 1.05mm 5mm}

/* comparativo */
.cmp{gap:4mm}.cmp-a{height:58mm}.cmp-a .sym{width:34mm}
.cmp-b{height:24mm;margin-top:2mm;justify-content:space-between;padding:0 6mm}.cmp-b>.sym{width:13mm}
.cmp-sm{display:flex;align-items:flex-end;gap:3mm}
.cmp-l{display:flex;justify-content:space-between;align-items:baseline;margin-top:2.4mm}.cmp-l b{font-size:10.5pt;font-weight:inherit}
.mx{width:100%;border-collapse:collapse;margin-top:8mm;font-size:8pt}
.mx th{font:500 5.8pt 'IBM Plex Mono';letter-spacing:.14em;text-transform:uppercase;text-align:left;padding:2mm 0;border-bottom:.3mm solid var(--ink);border-top:.3mm solid var(--ink)}
.mx td{padding:1.75mm 0;border-bottom:.15mm solid var(--mist)}.mx .c{width:27mm}.mx th:nth-child(n+3),.mx td:nth-child(n+3){width:36mm}
.mx td:nth-child(4){background:var(--bone)}.mx th:nth-child(4){background:var(--bone)}
.mx th:nth-child(n+3),.mx td:nth-child(n+3){padding-left:3mm}
.dots{display:inline-flex;gap:1mm;vertical-align:middle}.dots i{width:4.2mm;height:1.9mm;background:var(--mist);display:block}.dots i.on{background:var(--ink)}
.note{margin-top:6mm}

/* recomendacion */
.rc-top{display:grid;grid-template-columns:62mm 1fr;gap:10mm;align-items:start}
.rc-sym{border:.2mm solid #3a3a3c;padding:12mm}
.rc-i{display:grid;grid-template-columns:8mm 1fr;padding:0 0 3.2mm;margin-bottom:3.2mm;border-bottom:.15mm solid #333}
.rc-i:last-child{border:0;margin:0}.rc-i h4{font-size:9.4pt}.rc-i p{color:#c9cbcd}
.rc-res{gap:4mm}.rc-t{border:.2mm solid #3a3a3c;margin-bottom:2.6mm}.rc-t svg{display:block;width:100%}.rc-t text{font:500 3.4px 'IBM Plex Mono';letter-spacing:.5px;fill:#c9cbcd}.rc-res p{color:#c9cbcd;font-size:7.8pt}.rc-res .mono{margin-bottom:.6mm!important}
.rc-bot p{color:#c9cbcd}.rc-bot .list li{color:#c9cbcd}
.rc-lock{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:flex-end;border-top:.2mm solid #3a3a3c;padding-top:5mm}.rc-lock .mono{width:50mm;text-align:right}

/* cierre */
.dec{background:var(--bone);padding:5mm 6mm 4mm}.dec-o{margin:3mm 0 3mm}.dec-o h4{font-size:10pt}
.val{margin-bottom:5mm}.val p{font-size:8.2pt;line-height:1.48;color:var(--graphite)}
.stages{position:absolute;left:0;right:0;bottom:19mm;display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}.st{border-top:.6mm solid var(--mist);padding-top:2.6mm;color:var(--mineral)}.st.on{border-color:var(--ink);color:var(--ink)}.st h4{font-size:10pt;margin:1mm 0 .6mm}.st p{font-size:7.6pt}
.end{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:flex-end;border-top:.2mm solid var(--ink);padding-top:4mm}
.end-s{display:flex;gap:3mm}.end-s .sym{width:7mm}
`;

function html() {
  const pages = [cover(), pStart(), pOverview()];
  ROUTES.forEach((r, i) => pages.push(pHero(r, 4 + i * 3), pBuild(r, 5 + i * 3), pApply(r, 6 + i * 3)));
  pages.push(pCompare(), pReco(), pNext());
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>PRAXIS — Etapa 1 · Dirección creativa</title><style>${css}</style></head><body>${pages.join('\n')}</body></html>`;
}

(async () => {
  fs.mkdirSync(path.join(OUT, 'simbolos'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'editable'), { recursive: true });
  const file = path.join(OUT, 'editable', 'PRAXIS_Etapa1_Direccion_Creativa.html');
  fs.writeFileSync(file, html().replace(/\.\.\/_fuente\/fonts\//g, '../../_fuente/fonts/'));

  // Simbolos SVG
  for (const r of ROUTES) {
    const base = `PRAXIS_ruta-${r.n}_${r.key}`;
    fs.writeFileSync(path.join(OUT, 'simbolos', `${base}_positivo.svg`), S.svgFile(POLYS[r.key], { fill: INK, title: `PRAXIS · Ruta ${r.n} ${r.name} · positivo` }));
    fs.writeFileSync(path.join(OUT, 'simbolos', `${base}_negativo.svg`), S.svgFile(POLYS[r.key], { fill: '#FFFFFF', title: `PRAXIS · Ruta ${r.n} ${r.name} · negativo` }));
  }

  if (process.argv.includes('--no-render')) return;
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const pg = await browser.newPage();
  await pg.goto('file://' + file);
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(500);
  await pg.pdf({ path: path.join(OUT, 'PRAXIS_Etapa1_Direccion_Creativa.pdf'), width: '210mm', height: '297mm', printBackground: true, preferCSSPageSize: true });

  // PNG transparentes de cada simbolo (positivo y negativo)
  const p2 = await browser.newPage({ viewport: { width: 2000, height: 2000 }, deviceScaleFactor: 1 });
  for (const r of ROUTES) for (const [mode, fill] of [['positivo', INK], ['negativo', '#FFFFFF']]) {
    await p2.setContent(`<body style="margin:0;background:transparent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120" width="2000" height="2000"><path fill="${fill}" d="${S.toPath(POLYS[r.key])}"/></svg></body>`);
    await p2.screenshot({ path: path.join(OUT, 'simbolos', `PRAXIS_ruta-${r.n}_${r.key}_${mode}.png`), omitBackground: true });
  }
  await browser.close();
  console.log('ok');
})();
