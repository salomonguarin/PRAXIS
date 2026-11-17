// PRAXIS — Etapa 2 · Logotipo para aprobacion.
// Genera el documento (HTML editable + PDF A4) y los archivos del logotipo propuesto (SVG + PNG).
// Uso: node etapa2/build_logo.js   (desde la carpeta _fuente)

const fs = require('fs');
const path = require('path');
const S = require('../etapa1/symbols');
const WM = require('./wordmark');
const L = require('./lockups');

const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(ROOT, '02_Etapa_2_Identidad_Visual');
const INK = '#111111', GRAPHITE = '#3A3A3C', MINERAL = '#8C8E90', MIST = '#E6E6E3', BONE = '#F3F3F0';
const TOTAL = 9;
const f = S.f;
const W = L.WEIGHTS, REC = L.REC;
const pct = v => v.toFixed(1).replace('.', ',') + ' %';

const ln = (x1, y1, x2, y2, extra = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" ${extra}/>`;
const tx = (x, y, s, anchor = 'middle', extra = '') => `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" ${extra}>${s}</text>`;
const li = a => a.map(x => `<li>${x}</li>`).join('');
const hd = n => `<div class="hd"><span>PRAXIS — Manual de marca</span><span>Etapa 2 · Logotipo</span><span>${String(n).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}</span></div>`;
const ft = l => `<div class="ft"><span>${l}</span><span>Propuesta para aprobación · v0.2</span></div>`;
const page = (n, cls, inner, foot) => `<section class="page ${cls}">${hd(n)}<div class="body">${inner}</div>${ft(foot)}</section>`;

const refB64 = fs.readFileSync(path.join(ROOT, '00_Documentos_base', 'referencias', 'referencia_cliente_logo.png')).toString('base64');

// ---------------------------------------------------------------- 01 Portada
function pCover() {
  return `<section class="page dark cover">
    <div class="hd"><span>PRAXIS — Fábrica de Aprendizaje</span><span>Manual de marca</span><span>Etapa 2</span></div>
    <div class="cv-logo">${L.inline(L.stacked())}</div>
    <div class="cv-t"><div class="mono">Etapa 2 · Logotipo</div><h1>La X dentro<br>del nombre</h1>
      <p>Propuesta de logotipo sobre la ruta aprobada: un wordmark dibujado a medida, en el que la X es el símbolo de PRAXIS.</p></div>
    <div class="ft"><span>Noviembre de 2026</span><span>Propuesta para aprobación · v0.2</span></div>
  </section>`;
}

// ---------------------------------------------------------------- 02 Decision y referencia
function pBrief() {
  return page(2, '', `
    <div class="mono k">Punto de partida</div>
    <h2>Lo que se pidió<br>y lo que se tomó</h2>
    <div class="three dec3">
      <div><div class="num">1</div><h4>Ruta 02 · Refracción</h4><p>Aprobada. El símbolo se mantiene sin cambios: retícula de 7 × 7 módulos, plano de 2m y trazo de 1m.</p></div>
      <div><div class="num">2</div><h4>Nueva tipografía</h4><p>La composición con Jost no convenció. Se reemplaza por letras dibujadas a medida para PRAXIS.</p></div>
      <div><div class="num">3</div><h4>La X es el símbolo</h4><p>Dentro de la palabra, la X deja de ser una letra tipográfica y pasa a ser el símbolo aprobado.</p></div>
    </div>
    <div class="ref rule-top">
      <div class="mono">Referencia aportada</div>
      <div class="ref-row">
        <div class="ref-img"><img src="data:image/png;base64,${refB64}"></div>
        <div class="ref-x"><svg class="ref-sym" viewBox="-30 -30 160 160"><g fill="${INK}">${L.symbol().inner}</g>${ln(...L.refrLine(0, -30, 130)[0], ...L.refrLine(0, -30, 130)[1], `stroke="${INK}" stroke-width="1" stroke-dasharray="3 2.5"`)}</svg>
          <p class="small">La X de la referencia ya es una refracción: un trazo grueso y una línea que lo atraviesa. La ruta aprobada y la imagen describen la misma idea.</p></div>
      </div>
    </div>
    <div class="two take">
      <div><div class="mono">Se toma</div><ul class="list plus">${li(['Mayúsculas extendidas con espaciado amplio.', 'A sin travesaño: la forma queda como un ápice.', 'Trazo de grosor constante y construcción geométrica.', 'La X como acento de la palabra.', 'La línea larga que atraviesa la X. Se convierte en un recurso gráfico: la línea de refracción (página 8).'])}</ul></div>
      <div><div class="mono">No se toma</div><ul class="list minus">${li(['Brillo, resplandor y efecto metálico. El documento maestro los excluye: la identidad debe funcionar en negro y blanco.', 'La línea dentro del logotipo. Dependería de un efecto, se perdería al reducir y competiría con el descriptor.', 'Textura y luz de fondo. El fondo es un plano de color.'])}</ul></div>
    </div>`, 'Punto de partida');
}

// ---------------------------------------------------------------- 03 Construccion del wordmark
function pBuild() {
  const w = L.wm(REC), s = W[REC].s, bh = (100 + s) / 2;
  const B = w.boxes;
  const grid = [];
  for (let x = 0; x <= w.w + 1; x += 100 / 7) grid.push(ln(x, -6, x, 106)); for (let y = 0; y <= 100.1; y += 100 / 7) grid.push(ln(-6, y, w.w + 6, y));
  const guides = [[0, 'H'], [100, 'Línea base'], [bh, '(H + s) / 2'], [bh - s, '']].map(([y, l]) => ln(-30, y, w.w + 30, y)).join('');
  const leg = WM.letters(W[REC]);
  // cotas
  const dim = `<g stroke="${INK}" stroke-width=".7">
      ${ln(-22, 0, -22, 100)}${ln(-26, 0, -18, 0)}${ln(-26, 100, -18, 100)}
      ${ln(B.I[0], -16, B.I[1], -16)}${ln(B.I[0], -20, B.I[0], -12)}${ln(B.I[1], -20, B.I[1], -12)}
    </g>
    <g class="lbl">${tx(-28, 54, 'H', 'end')}${tx((B.I[0] + B.I[1]) / 2, -24, 's')}${tx(w.w + 34, bh + 3, '(H+s)/2', 'start')}${tx(w.w + 34, 3, 'H', 'start')}${tx(w.w + 34, 103, 'base', 'start')}</g>`;
  const diag = `<svg class="bd" viewBox="-44 -40 ${f(w.w + 150)} 160">
      <g stroke="#CFCFCA" stroke-width=".5">${grid.join('')}</g>
      <g stroke="${MINERAL}" stroke-width=".6" stroke-dasharray="3 2">${guides}</g>
      ${Object.entries(B).map(([c, [a, b]]) => `<rect x="${f(a)}" y="0" width="${f(b - a)}" height="100" fill="#fff" opacity=".55"/>`).join('')}
      <path d="${w.d}" fill="${INK}"/>${dim}</svg>`;

  // detalles X, A, R
  const R = leg.R.pathData, A = leg.A.pathData, P = leg.P.pathData;
  const legLine = (() => { const k = 5 / 7, h = s * Math.sqrt(1 + k * k), cx = y => 80 - h / 2 - k * (100 - y), y1 = bh - s - 26, y2 = 112; return ln(cx(y1), y1, cx(y2), y2, `stroke="${MINERAL}" stroke-width=".9" stroke-dasharray="3 2.4"`); })();
  const det = (svg, t, p) => `<div class="det"><div class="det-g">${svg}</div><div class="mono">${t}</div><p>${p}</p></div>`;
  const xDet = `<svg viewBox="-14 -14 128 128">${S.toPolygons(S.refraccion(7, .25, 1)).replace(/<polygon/g, `<polygon fill="${INK}"`)}${ln(...L.refrLine(0, -14, 114)[0], ...L.refrLine(0, -14, 114)[1], `stroke="${MINERAL}" stroke-width=".9" stroke-dasharray="3 2.4"`)}</svg>`;
  const aDet = `<svg viewBox="-14 -14 128 128"><path d="${A}" fill="${INK}"/>${ln(18, 62, 82, 62, `stroke="${MINERAL}" stroke-width=".9" stroke-dasharray="3 2.4"`)}</svg>`;
  const rDet = `<svg viewBox="-14 -14 128 128"><path d="${R}" fill="${INK}"/>${legLine}</svg>`;
  return page(3, '', `
    <div class="mono k">Wordmark</div>
    <h2 class="h2s">Construcción</h2>
    <div class="bd-wrap">${diag}</div>
    <div class="two bnote">
      <p class="lead">Las letras no salen de una fuente: se dibujaron para PRAXIS con tres piezas —barras rectas, semicírculos y diagonales— y una sola regla de grosor. P, R y S comparten el mismo cuenco, de altura (H + s) / 2 y lado semicircular.</p>
      <ul class="rules">${li([`Altura de mayúsculas H. Trazo s = ${pct(W[REC].s)} de H, igual al grosor del trazo del símbolo.`, 'Ancho de P, R y S: 0,8 H. Ancho de A y X: 1 H.', 'Espaciado amplio y ajustado a ojo: entre 0,36 H y 0,46 H según la forma de cada par.'])}</ul>
    </div>
    <div class="mono k2">Espaciado · anchos y espacios en fracciones de H</div>
    <svg class="sp" viewBox="-4 -4 ${f(w.w + 8)} 42">${(() => { let g = '', prev = null; for (const [c, [a, b]] of Object.entries(B)) { g += `<rect x="${f(a)}" y="0" width="${f(b - a)}" height="16" fill="${c === 'X' ? INK : '#D2D2CE'}"/><text x="${f((a + b) / 2)}" y="11" text-anchor="middle" fill="${c === 'X' ? '#fff' : INK}">${c}</text><text x="${f((a + b) / 2)}" y="30" text-anchor="middle" fill="${GRAPHITE}">${((b - a) / 100).toFixed(2).replace('.', ',')}</text>`; if (prev !== null) g += `<text x="${f((prev + a) / 2)}" y="11" text-anchor="middle" fill="${MINERAL}">${((a - prev) / 100).toFixed(2).replace('.', ',')}</text>`; prev = b; } return g; })()}</svg>
    <div class="mono k2">Detalles en X, A y R, como pide el documento maestro</div>
    <div class="three dets">
      ${det(xDet, 'X · el símbolo', 'No es una letra: es el símbolo aprobado a la altura de mayúsculas. La línea punteada prolonga el borde común del trazo.')}
      ${det(aDet, 'A · abierta', 'Sin travesaño. Se reduce a dos diagonales, que dialogan con la X.')}
      ${det(rDet, 'R · misma inclinación', 'La pierna tiene la inclinación del plano del símbolo (5 : 7). R y X comparten el ángulo.')}
    </div>`, 'Wordmark · Construcción');
}

// ---------------------------------------------------------------- 04 Calibracion del peso
function pWeight() {
  const row = k => {
    const o = W[k], rec = k === REC;
    const ratio = (2 * L.TRAZO / o.s).toFixed(1).replace('.', ',');
    return `<div class="wr ${rec ? 'rec' : ''}">
      <div class="wr-l"><div class="mono">Opción ${k}${rec ? ' · recomendada' : ''}</div><h3>${o.name}</h3><p class="small">${o.note}</p>
        <div class="mono dim wr-d">Trazo ${pct(o.s)} de H<br>Plano de la X: ${ratio} veces el trazo</div></div>
      <div class="wr-m">${L.inline(L.stacked(k))}</div>
      <div class="wr-s">${L.inline(L.wordmarkOnly(k), { style: 'width:30mm' })}${L.inline(L.wordmarkOnly(k), { style: 'width:18mm' })}<span class="mono dim">30 mm · 18 mm</span></div>
    </div>`;
  };
  return page(4, '', `
    <div class="mono k">Wordmark</div>
    <h2 class="h2s">Calibración del peso</h2>
    <p class="lead w70">La X tiene el peso fijo del símbolo. El grosor de las demás letras decide si la X se lee como acento o como pieza ajena. Se probaron tres pesos con la misma construcción.</p>
    ${['A', 'B', 'C'].map(row).join('')}
    <div class="two why">
      <div><div class="mono">Por qué se recomienda la opción C</div><ul class="list">${li(['El trazo de las letras es el trazo del símbolo: la X pertenece a la palabra y no parece tomada de otra fuente.', 'Responde a lo que pide el brief: tipografía sólida y contundente, con presencia en mayúsculas y autoridad ante la alta dirección.', 'Es la que mejor resiste la reducción (columna derecha).'])}</ul></div>
      <div><div class="mono">Si prefiere la opción A</div><p>Es la más fiel a la referencia y la más ligera. Funciona bien en tamaños grandes —fachada, portadas, pantallas—, pero pierde firmeza por debajo de 30 mm y la X gana un contraste que puede leerse como una letra de otra familia. Cualquiera de las tres se puede llevar al sistema completo.</p></div>
    </div>`, 'Wordmark · Peso');
}

// ---------------------------------------------------------------- 05 Versiones
function pVersions() {
  const tile = (cls, L1, cap, style = '') => `<div class="tile ${cls}"><div class="tile-in" style="${style}">${L.inline(L1)}</div><span class="cap mono">${cap}</span></div>`;
  return page(5, '', `
    <div class="mono k">Logotipo</div>
    <h2 class="h2s">Versiones</h2>
    <div class="vg">
      ${tile('t-white v-main', L.stacked(), 'Principal · positivo', 'width:80%')}
      ${tile('t-ink v-main', L.stacked(), 'Principal · negativo', 'width:80%')}
      ${tile('t-white v-h', L.horizontal(), 'Horizontal · positivo', 'width:86%')}
      ${tile('t-ink v-h', L.horizontal(), 'Horizontal · negativo', 'width:86%')}
      <div class="vg2">
        ${tile('t-bone v-s', L.wordmarkOnly(), 'Wordmark solo', 'width:58%')}
        ${tile('t-ink v-s', L.symbol(), 'Isotipo', 'width:46%')}
        ${tile('t-white v-s', L.symbol(), 'Isotipo · positivo', 'width:46%')}
      </div>
    </div>
    <div class="three vrules">
      <div><div class="mono">Principal</div><p>Wordmark y descriptor justificados al mismo ancho. Es la versión por defecto.</p></div>
      <div><div class="mono">Horizontal y wordmark solo</div><p>Para formatos bajos y anchos —encabezados, firmas, pie de página— y para tamaños donde el descriptor ya no se lee.</p></div>
      <div><div class="mono">Isotipo</div><p>Para avatar, favicono, sellos y señalización. <b>El isotipo no se coloca junto al wordmark:</b> la X ya está dentro del nombre.</p></div>
    </div>`, 'Logotipo · Versiones');
}

// ---------------------------------------------------------------- 06 Arquitectura
function pArch() {
  const areas = [['STRATEGY', 'Estrategia y toma de decisiones'], ['LEADERSHIP', 'Liderazgo y gestión humana'], ['OPERATIONS', 'Productividad y excelencia operacional'], ['SIMULATION', 'Simulación y experimentación'], ['DIGITAL TWINS', 'Gemelos digitales y tecnologías aplicadas']];
  return page(6, '', `
    <div class="mono k">Arquitectura de marca</div>
    <h2 class="h2s">PRAXIS / área</h2>
    <p class="lead w70">Branded House: un solo logotipo y el nombre del área debajo, en Lexend Exa. Sin símbolos, colores ni logotipos propios por área. Esta página solo comprueba que la nueva tipografía sostiene la arquitectura; las reglas completas van en el manual.</p>
    <div class="ag">
      ${areas.map((a, i) => `<div class="tile ${i === 2 ? 't-ink' : 't-bone'} ag-t"><div class="ag-in">${L.inline(L.area(a[0]))}</div><span class="cap mono">${a[1]}</span></div>`).join('')}
      <div class="tile t-white ag-t ag-f"><div class="mono">Formatos transversales</div><div class="fmt">LAB<br>SIMULATION<br>ACADEMY</div><p class="small">Descriptores de formato, no marcas: se escriben en texto, sin logotipo.</p></div>
    </div>
    <p class="small pend">Pendiente según el documento de arquitectura: qué áreas salen al lanzamiento, si Simulation es área y formato, y si los nombres van en inglés, en español o en ambos.</p>`, 'Arquitectura · Prueba');
}

// ---------------------------------------------------------------- 07 Tipografia
function pType() {
  return page(7, '', `
    <div class="mono k">Sistema tipográfico · propuesta</div>
    <h2 class="h2s">Tipografías de apoyo</h2>
    <p class="lead w70">El wordmark es un dibujo, no una fuente. Para todo lo demás se propone una sola familia, Lexend, en dos anchos, y una monoespaciada para datos y rótulos técnicos. Las tres tienen licencia SIL Open Font License 1.1: uso comercial libre, impresa y digital.</p>
    <div class="ty">
      <div class="ty-r"><div class="ty-l"><div class="mono">Titulares, descriptor, rótulos</div><h4>Lexend Exa</h4><p class="small">Ancho extendido. Light y Regular. Comparte proporción con el wordmark.</p></div>
        <div class="ty-s exa"><div class="ty-big">Aa Xx Rr</div><div class="ty-chars">ABCDEFGHIJKLMNÑOPQRSTUVWXYZ<br>abcdefghijklmnñopqrstuvwxyz 0123456789</div></div></div>
      <div class="ty-r"><div class="ty-l"><div class="mono">Texto</div><h4>Lexend</h4><p class="small">Ancho normal. Light, Regular y Medium. Lectura cómoda en párrafos y pantallas.</p></div>
        <div class="ty-s lx"><div class="ty-big">Aa Xx Rr</div><div class="ty-chars">ABCDEFGHIJKLMNÑOPQRSTUVWXYZ<br>abcdefghijklmnñopqrstuvwxyz 0123456789</div></div></div>
      <div class="ty-r"><div class="ty-l"><div class="mono">Datos y rótulos técnicos</div><h4>IBM Plex Mono</h4><p class="small">Cifras, tablas, cotas y anotaciones de proceso.</p></div>
        <div class="ty-s mn"><div class="ty-big">Aa 01 ·</div><div class="ty-chars">ABCDEFGHIJKLMNÑOPQRSTUVWXYZ<br>abcdefghijklmnñopqrstuvwxyz 0123456789</div></div></div>
    </div>
    <div class="hier rule-top">
      <div class="mono">Jerarquía de prueba</div>
      <div class="hi-1">Experimentar antes<br>de implementar.</div>
      <div class="hi-2">PRAXIS OPERATIONS — Laboratorio de mejora continua</div>
      <p class="hi-3">PRAXIS es una fábrica de aprendizaje experiencial dirigida a empresarios, gerentes, directivos, supervisores y líderes de organizaciones. Su propósito es desarrollar capacidades empresariales, gerenciales y operativas mediante experiencias prácticas, simuladores, experimentación y gemelos digitales.</p>
      <div class="hi-4">LAB · SIMULATION · ACADEMY &nbsp;&nbsp; 07 / 12</div>
    </div>`, 'Tipografía');
}

// ---------------------------------------------------------------- 08 Linea de refraccion
function pLine() {
  const w = L.wm(REC), X0 = w.boxes.X[0];
  // composicion: wordmark escalado dentro de un marco; la linea se dibuja en coordenadas del wordmark.
  const comp = ({ vw, vh, scale, ox, oy, bg, fg, line, extra = '', desc = '' }) => {
    const [[x1, y1], [x2, y2]] = L.refrLine(X0, -4000, 4000);
    return `<svg class="cmp" viewBox="0 0 ${vw} ${vh}"><rect width="${vw}" height="${vh}" fill="${bg}"/>
      <g transform="translate(${ox} ${oy}) scale(${scale})"><line x1="${f(x1)}" y1="${y1}" x2="${f(x2)}" y2="${y2}" stroke="${line}" stroke-width="${f(0.5 / scale)}"/><path d="${w.d}" fill="${fg}"/></g>${extra}${desc}</svg>`;
  };
  // x de la linea en coordenadas de pagina, para un wordmark colocado en (ox, oy) con escala sc
  const lineX = (yp, sc, ox, oy) => ox + sc * (X0 + 100 - L.M - (5 / 7) * ((yp - oy) / sc));
  const sc1 = 140 / w.w, ox1 = 35, oy1 = 118;
  const yD = 262; // a esta altura la linea ya paso al lado izquierdo: el descriptor queda libre
  const cover = comp({ vw: 210, vh: 297, scale: sc1, ox: ox1, oy: oy1, bg: INK, fg: '#fff', line: '#fff',
    extra: `<g font-family="Lexend Exa" font-weight="300" fill="#fff" font-size="4.2" letter-spacing="2"><text x="175" y="${yD}" text-anchor="end">FÁBRICA DE APRENDIZAJE</text></g><g font-family="IBM Plex Mono" font-size="3.4" fill="#8C8E90" letter-spacing="1"><text x="35" y="44">TÍTULO DEL DOCUMENTO</text><text x="175" y="44" text-anchor="end">ÁREA · FORMATO</text></g>` });
  const sc2 = 46 / w.w;
  const card = comp({ vw: 85, vh: 55, scale: sc2, ox: 19.5, oy: 24.5, bg: INK, fg: '#fff', line: '#fff' });
  const sc3 = 44 / w.w, ox3 = 8, oy3 = 10;
  const post = comp({ vw: 100, vh: 100, scale: sc3, ox: ox3, oy: oy3, bg: BONE, fg: INK, line: INK,
    extra: `<g font-family="Lexend Exa" font-weight="300" fill="${INK}" font-size="5.6" text-anchor="end"><text x="92" y="74">Experimentar</text><text x="92" y="82">antes de implementar.</text></g><g font-family="IBM Plex Mono" font-size="2.5" fill="${GRAPHITE}" letter-spacing=".6" text-anchor="end"><text x="92" y="92">PRAXIS OPERATIONS · LAB</text></g>` });
  const defSvg = `<svg viewBox="-20 -60 160 220"><g fill="#D2D2CE">${S.toPolygons(S.refraccion(7, .25, 1))}</g>${ln(...L.refrLine(0, -60, 160)[0], ...L.refrLine(0, -60, 160)[1], `stroke="${INK}" stroke-width="1"`)}<g class="lbl">${tx(-16, 150, 'línea de refracción', 'start')}</g></svg>`;
  return page(8, '', `
    <div class="mono k">Recurso gráfico</div>
    <h2 class="h2s">La línea de refracción</h2>
    <div class="ln-top">
      <div class="ln-def">${defSvg}</div>
      <div><p class="lead">Es la línea larga de la referencia, pero con una regla: prolonga el borde común del trazo de la X. Por eso siempre conserva la inclinación del símbolo y siempre lo atraviesa por el mismo punto.</p>
        <ul class="rules">${li(['Es un recurso de composición, no parte del logotipo.', 'Línea fina y continua, de un solo color. Sin brillo ni desvanecido.', 'Cruza el formato completo, de borde a borde, y nunca corta el descriptor.', 'Una sola línea por composición.'])}</ul></div>
    </div>
    <div class="ln-g">
      <div class="ln-c c1">${cover}<span class="mono dim">Portada · A4</span></div>
      <div class="ln-r">
        <div class="ln-c">${card}<span class="mono dim">Tarjeta · 85 × 55 mm</span></div>
        <div class="ln-c">${post}<span class="mono dim">Publicación · 1 : 1</span></div>
      </div>
    </div>`, 'Recurso gráfico');
}

// ---------------------------------------------------------------- 09 Reduccion y decision
function pDecision() {
  const sizes = [56, 38, 28, 20, 15];
  return page(9, '', `
    <div class="mono k">Cierre</div>
    <h2 class="h2s">Reducción y decisión</h2>
    <div class="red">
      <div class="mono">Prueba de reducción · opción ${REC}, sin correcciones</div>
      <div class="red-r">${sizes.map(s => `<div>${L.inline(L.wordmarkOnly(), { style: `width:${s}mm` })}<span class="mono dim">${s} mm</span></div>`).join('')}</div>
      <div class="red-s">
        <div>${L.inline(L.symbol(), { style: 'width:12mm' })}${L.inline(L.symbol(), { style: 'width:6mm' })}${L.inline(L.symbol(), { style: 'width:3.5mm' })}<span class="mono dim">Isotipo · 12, 6 y 3,5 mm</span></div>
        <div>${L.inline(L.symbol(true), { style: 'width:12mm' })}${L.inline(L.symbol(true), { style: 'width:6mm' })}${L.inline(L.symbol(true), { style: 'width:3.5mm' })}<span class="mono dim">Versión reducida, sin separación</span></div>
      </div>
      <p class="small">Por debajo de 6 mm la separación entre piezas se cierra; ahí se usa la versión reducida. Los tamaños mínimos definitivos se fijan en el manual, con prueba de impresión.</p>
    </div>
    <div class="dec rule-top">
      <div class="mono">Decisión que se solicita</div>
      <div class="three dec-o">
        <div><div class="num">1</div><h4>Peso del wordmark</h4><p>Opción A Ligera, B Intermedia o C Trazo (recomendada).</p></div>
        <div><div class="num">2</div><h4>Tipografías de apoyo</h4><p>Lexend Exa, Lexend e IBM Plex Mono, o pedir otra dirección.</p></div>
        <div><div class="num">3</div><h4>Versiones</h4><p>Principal apilada, horizontal, wordmark solo e isotipo, con el isotipo nunca junto al wordmark.</p></div>
      </div>
    </div>
    <div class="two rule-top nx">
      <div><div class="mono">Al aprobar · resto de la Etapa 2</div><ul class="list">${li(['Ajuste óptico final y archivos maestros del logotipo.', 'Área de seguridad, tamaños mínimos y usos incorrectos.', 'Sistema cromático con HEX, RGB y CMYK.', 'Sistema gráfico, iconografía y dirección fotográfica.', 'Identidad verbal y arquitectura completa.', 'Aplicaciones: espacio, papelería, digital, uniformes y materiales de formación.'])}</ul></div>
      <div><div class="mono">Validaciones abiertas</div><p class="small">Sigue pendiente la búsqueda de antecedentes marcarios ante la Superintendencia de Industria y Comercio para el nombre y el símbolo, al menos en las clases 41 y 35 de Niza. Al ser un wordmark dibujado a medida, el logotipo no depende de la licencia de ninguna fuente.</p></div>
    </div>`, 'Cierre');
}

// ---------------------------------------------------------------- estilos
const fontsRel = '../_fuente/fonts/';
const css = `
@font-face{font-family:'Lexend';font-weight:300;src:url('${fontsRel}lexend-latin-300-normal.woff2')}
@font-face{font-family:'Lexend';font-weight:400;src:url('${fontsRel}lexend-latin-400-normal.woff2')}
@font-face{font-family:'Lexend';font-weight:500;src:url('${fontsRel}lexend-latin-500-normal.woff2')}
@font-face{font-family:'Lexend Exa';font-weight:300;src:url('${fontsRel}lexend-exa-latin-300-normal.woff2')}
@font-face{font-family:'Lexend Exa';font-weight:400;src:url('${fontsRel}lexend-exa-latin-400-normal.woff2')}
@font-face{font-family:'IBM Plex Mono';font-weight:400;src:url('${fontsRel}ibm-plex-mono-latin-400-normal.woff2')}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url('${fontsRel}ibm-plex-mono-latin-500-normal.woff2')}
@page{size:210mm 297mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:#777}
body{font-family:'Lexend';font-weight:300;color:${INK};font-size:8.2pt;line-height:1.5}
b{font-weight:500}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:#fff;margin:0 auto}
@media screen{.page{margin:8mm auto;box-shadow:0 2mm 8mm rgba(0,0,0,.35)}}
.page.dark{background:${INK};color:#fff}
.hd{position:absolute;top:9mm;left:14mm;right:14mm;display:grid;grid-template-columns:1fr 1fr 1fr;font:500 5.8pt 'IBM Plex Mono';letter-spacing:.14em;text-transform:uppercase;padding-bottom:2.6mm;border-bottom:.2mm solid currentColor}
.hd span:nth-child(2){text-align:center}.hd span:nth-child(3){text-align:right}
.ft{position:absolute;bottom:8mm;left:14mm;right:14mm;display:flex;justify-content:space-between;font:400 5.8pt 'IBM Plex Mono';letter-spacing:.14em;text-transform:uppercase;color:${MINERAL}}
.body{position:absolute;top:23mm;left:14mm;right:14mm;bottom:17mm}
.mono{font-family:'IBM Plex Mono';font-size:5.8pt;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.5}
.dim{color:${MINERAL}}.k{margin-bottom:3mm}.k2{margin:7mm 0 3mm}
svg.lock,svg.sym{display:block;width:100%;height:auto}
h1{font-family:'Lexend Exa';font-weight:300;font-size:34pt;line-height:1.08;letter-spacing:-.02em}
h2{font-family:'Lexend Exa';font-weight:300;font-size:23pt;line-height:1.1;letter-spacing:-.02em;margin-bottom:7mm}
h2.h2s{font-size:18pt;margin-bottom:5mm}
h3{font-family:'Lexend Exa';font-weight:300;font-size:13pt;line-height:1.15;margin:1mm 0 1.5mm}
h4{font-weight:500;font-size:8.6pt;line-height:1.3;margin-bottom:1mm}
.lead{font-size:9.4pt;line-height:1.5}.w70{width:72%;margin-bottom:6mm}
.small{font-size:7.2pt;line-height:1.48;color:${GRAPHITE}}.dark .small{color:#b9bbbd}
.two{display:grid;grid-template-columns:1fr 1fr;gap:8mm}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:8mm}
.rule-top{border-top:.2mm solid currentColor;padding-top:3mm;margin-top:7mm}
.rule-top>.mono:first-child,.two>div>.mono:first-child{margin-bottom:2.6mm}
.list{list-style:none}.list li{padding:1.2mm 0;border-bottom:.15mm solid ${MIST};line-height:1.4}
.list.plus li,.list.minus li{padding-left:5mm;position:relative}
.list.plus li:before{content:'+';position:absolute;left:0;font-family:'IBM Plex Mono';font-weight:500}
.list.minus li:before{content:'–';position:absolute;left:0;font-family:'IBM Plex Mono';font-weight:500}
.rules{list-style:none;counter-reset:r}.rules li{counter-increment:r;padding:1.2mm 0 1.2mm 7mm;position:relative;border-bottom:.15mm solid ${MIST};line-height:1.4}
.rules li:before{content:counter(r,decimal-leading-zero);position:absolute;left:0;top:1.6mm;font:500 5.8pt 'IBM Plex Mono';color:${MINERAL}}
.num{font:500 5.8pt 'IBM Plex Mono';width:5mm;height:5mm;border:.2mm solid currentColor;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:2.2mm}
.tile{position:relative;display:flex;align-items:center;justify-content:center}
.t-white{background:#fff;border:.2mm solid ${MIST}}.t-ink{background:${INK};color:#fff}.t-bone{background:${BONE}}
.cap{position:absolute;left:3mm;bottom:2.4mm;color:${MINERAL}}
.lbl text{font-family:'IBM Plex Mono';font-size:6px;fill:${INK};letter-spacing:.2px}

/* portada */
.cv-logo{position:absolute;left:28mm;right:28mm;top:92mm}
.cv-t{position:absolute;left:14mm;bottom:28mm;width:120mm}
.cv-t h1{margin:4mm 0 5mm}.cv-t p{font-size:9.6pt;color:#c9cbcd;width:104mm}
.cover .ft{color:#9a9c9e}

/* brief */
.dec3 h4{font-size:9.4pt}
.ref-row{display:grid;grid-template-columns:1fr 50mm;gap:8mm;align-items:start}.ref-img{background:#000}
.ref-img img{display:block;width:100%}
.ref-sym{display:block;width:44mm;margin:0 0 3mm}.ref-x .small{font-size:7.8pt}
.take{margin-top:9mm}.dec3{margin-bottom:2mm}

/* construccion */
.bd-wrap{background:${BONE};padding:5mm 2mm 2mm}
.bd{display:block;width:100%}.bd .lbl text{font-size:9px}
.bnote{margin-top:6mm}
.dets .det-g{background:${BONE};margin-bottom:3mm;padding:3mm}.det-g svg{display:block;width:100%}
.det p{font-size:7.6pt;margin-top:1mm}
.sp{display:block;width:100%}.sp text{font-family:'IBM Plex Mono';font-size:7.5px;letter-spacing:.3px}

/* peso */
.wr{display:grid;grid-template-columns:42mm 1fr 34mm;gap:7mm;align-items:center;padding:8mm 0;border-top:.2mm solid ${MIST}}
.wr.rec{background:${BONE};margin:0 -4mm;padding:8mm 4mm;border-top-color:${INK}}
.wr-d{margin-top:2.5mm}.wr-m{padding-right:2mm}
.wr-s{display:flex;flex-direction:column;gap:3mm;align-items:flex-start}
.why{margin-top:8mm}.why p{font-size:7.8pt}

/* versiones */
.vg{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4mm}.vg .tile{min-width:0}
.v-main{height:44mm}.v-h{height:30mm}
.vg2{grid-column:1 / 3;display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr) minmax(0,1fr);gap:4mm}.v-s{height:46mm}
.vg .tile-in{display:flex;justify-content:center}.vg .tile-in svg{width:100%}.v-main{height:52mm}.v-h{height:34mm}
.vrules{margin-top:7mm}.vrules p{font-size:7.8pt;margin-top:1.5mm}

/* arquitectura */
.ag{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.ag-t{height:44mm}.ag-in{width:60mm}.ag-t.t-ink .cap{color:#9a9c9e}
.ag-f{flex-direction:column;align-items:flex-start;justify-content:flex-start;padding:5mm}
.fmt{font-family:'Lexend Exa';font-weight:300;font-size:11pt;letter-spacing:.2em;line-height:1.5;margin:3mm 0}
.pend{margin-top:5mm}

/* tipografia */
.ty-r{display:grid;grid-template-columns:48mm 1fr;gap:6mm;padding:4mm 0;border-top:.2mm solid ${MIST}}
.ty-l h4{font-size:11pt;font-weight:400;margin:1mm 0}
.ty-big{font-size:34pt;line-height:1;margin-bottom:2.5mm}.ty-chars{font-size:9pt;line-height:1.45;letter-spacing:.02em}
.exa{font-family:'Lexend Exa';font-weight:300}.lx{font-family:'Lexend';font-weight:300}.mn{font-family:'IBM Plex Mono';font-weight:400}
.hi-1{font-family:'Lexend Exa';font-weight:300;font-size:21pt;line-height:1.1;margin:2mm 0 3mm}
.hi-2{font-family:'Lexend Exa';font-weight:400;font-size:8pt;letter-spacing:.12em;margin-bottom:2.5mm}
.hi-3{font-size:9pt;line-height:1.55;width:86%;margin-bottom:3mm}
.hi-4{font:500 6pt 'IBM Plex Mono';letter-spacing:.14em;color:${MINERAL}}

/* linea */
.ln-top{display:grid;grid-template-columns:44mm 1fr;gap:8mm;align-items:start}
.ln-def svg{display:block;width:100%}
.ln-top .rules{margin-top:3mm}
.ln-g{display:grid;grid-template-columns:86mm 1fr;gap:6mm;margin-top:7mm}
.ln-r{display:flex;flex-direction:column;gap:6mm}
.ln-c svg.cmp{display:block;width:100%;height:auto;box-shadow:0 .5mm 2mm rgba(0,0,0,.18)}
.ln-c .mono{display:block;margin-top:2mm}

/* reduccion y decision */
.red-r{display:flex;align-items:flex-end;gap:5mm;margin:4mm 0 6mm}.red-r>div{display:flex;flex-direction:column;gap:1.6mm}
.red-r svg{flex:none}
.red-s{display:grid;grid-template-columns:1fr 1fr;gap:8mm;margin-bottom:3mm}.red-s>div{display:flex;align-items:flex-end;gap:5mm}
.red-s svg{width:auto;flex:none}
.dec-o{margin:2mm 0}.dec-o h4{font-size:9.6pt}
.nx p{font-size:7.8pt}
`;

function html() {
  const pages = [pCover(), pBrief(), pBuild(), pWeight(), pVersions(), pArch(), pType(), pLine(), pDecision()];
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>PRAXIS — Etapa 2 · Logotipo</title><style>${css}</style></head><body>${pages.join('\n')}</body></html>`;
}

(async () => {
  const dirs = ['editable', 'logotipo_propuesta/svg', 'logotipo_propuesta/png', 'logotipo_propuesta/alternativas_de_peso'];
  dirs.forEach(d => fs.mkdirSync(path.join(OUT, d), { recursive: true }));
  const file = path.join(OUT, 'editable', 'PRAXIS_Etapa2_Logotipo.html');
  fs.writeFileSync(file, html().replace(/\.\.\/_fuente\/fonts\//g, '../../_fuente/fonts/'));

  // Archivos del logotipo (opcion recomendada)
  const set = [
    ['PRAXIS_logo_principal', L.stacked(), 24],
    ['PRAXIS_logo_horizontal', L.horizontal(), 24],
    ['PRAXIS_wordmark', L.wordmarkOnly(), 20],
    ['PRAXIS_isotipo', L.symbol(), 10],
    ['PRAXIS_isotipo_reducido', L.symbol(true), 10],
  ];
  const variants = [['positivo', '#111111'], ['negativo', '#FFFFFF']];
  for (const [n, Lk, pad] of set) for (const [v, c] of variants)
    fs.writeFileSync(path.join(OUT, 'logotipo_propuesta', 'svg', `${n}_${v}.svg`), L.file(Lk, { fill: c, title: `PRAXIS — ${n.replace('PRAXIS_', '').replace(/_/g, ' ')} (${v})`, pad }));
  for (const k of ['A', 'B', 'C'])
    fs.writeFileSync(path.join(OUT, 'logotipo_propuesta', 'alternativas_de_peso', `PRAXIS_logo_principal_opcion-${k}_${L.WEIGHTS[k].name.toLowerCase()}.svg`), L.file(L.stacked(k), { title: `PRAXIS — logotipo principal, opción ${k}`, pad: 24 }));

  if (process.argv.includes('--no-render')) return;
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const pg = await browser.newPage();
  await pg.goto('file://' + file);
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(500);
  await pg.pdf({ path: path.join(OUT, 'PRAXIS_Etapa2_Logotipo_para_aprobacion.pdf'), width: '210mm', height: '297mm', printBackground: true, preferCSSPageSize: true });

  // PNG transparentes (ancho 3000 px; isotipo 2000 px)
  const p2 = await browser.newPage({ deviceScaleFactor: 1 });
  for (const [n, Lk, pad] of set) for (const [v, c] of variants) {
    const Wd = Lk.w + 2 * pad, Hd = Lk.h + 2 * pad, px = n.includes('isotipo') ? 2000 : 3000, ph = Math.round(px * Hd / Wd);
    await p2.setViewportSize({ width: px, height: ph });
    await p2.setContent(`<body style="margin:0;background:transparent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${Wd} ${Hd}" width="${px}" height="${ph}"><g fill="${c}">${Lk.inner}</g></svg></body>`);
    await p2.screenshot({ path: path.join(OUT, 'logotipo_propuesta', 'png', `${n}_${v}.png`), omitBackground: true });
  }
  await browser.close();
  console.log('ok');
})();
