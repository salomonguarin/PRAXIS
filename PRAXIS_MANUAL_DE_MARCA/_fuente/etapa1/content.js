// PRAXIS — Etapa 1. Contenido editorial de las tres rutas.
// Los textos se apoyan en el Documento Maestro de Marca y en el documento de Arquitectura de Marca.

module.exports.ROUTES = [
  {
    n: '01', key: 'umbral', name: 'Umbral', q: '¿Y si la X es un espacio?', claim: 'La X como espacio',
    short: 'La X aparece como el vacío entre cuatro planos.',
    emphasis: 'Elegancia intelectual',
    idea: 'PRAXIS es el espacio entre saber y hacer.',
    text: 'Cuatro planos se aproximan sin tocarse. Lo que queda entre ellos es la X. El símbolo no representa un objeto: representa un recinto, el lugar donde se practica. Leído así es, a la vez, la planta de una pirámide y el piso de un dojo: geometría, precisión y un espacio delimitado para alcanzar el dominio.',
    refs: ['Egipto: arquitectura, geometría y construcción de sistemas', 'Dojo: el espacio donde se practica', 'Espacios negativos, retículas y simetría'],
    rules: ['Cuadrado de lado L.', 'Dos canales sobre las diagonales, de ancho L/10.', 'Cuatro triángulos isósceles idénticos; simetría en dos ejes.', 'El canal conserva su ancho en positivo y en negativo.'],
    pros: ['Máxima simplicidad: resiste estarcido, grabado, bordado y tamaños mínimos.', 'Módulo cuadrado: construye retículas, mosaicos y señalización de forma natural.', 'Presencia monumental en fachada y sello; funciona sin ajustes como avatar e ícono.'],
    cons: ['Es la menos diferenciable: cercana a signos universales (cerrar, cancelar, casilla marcada, sobre de correo).', 'La X es fondo, no figura. El documento maestro pide que sea protagonista.', 'Es estática: no expresa movimiento, adaptación ni transformación.', 'Mayor probabilidad de coincidencias en un examen de registrabilidad.'],
    font: {
      file: 'archivo-expanded-600.ttf', desc: 'archivo-expanded-500.ttf', track: 0.035,
      css: "font-family:'Archivo Expanded';font-weight:600;", cssText: "font-family:'Archivo';font-weight:400;",
      name: 'Archivo Expanded', weight: 'SemiBold',
      note: 'Grotesca de proporción ancha. Aporta peso institucional y lectura de rótulo arquitectónico.',
      system: 'Titulares: Archivo Expanded SemiBold · Texto: Archivo Regular · Datos: IBM Plex Mono',
    },
    score: [5, 3, 2, 4, 3, 5, 5, 5, 5, 4],
  },
  {
    n: '02', key: 'refraccion', name: 'Refracción', q: '¿Y si la X es una transformación?', claim: 'La X como transformación',
    short: 'Un trazo atraviesa un plano y sale desplazado.',
    emphasis: 'Audacia y transformación',
    idea: 'Nadie sale por la misma línea por la que entró.',
    text: 'Un plano y un trazo. El plano es la experiencia: sólido, inclinado, de dos módulos de ancho. El trazo es la trayectoria de quien aprende: entra por un lado, atraviesa el plano y sale por el otro desplazado exactamente un módulo. La figura toma la imagen de la refracción —un rayo que cambia de curso al atravesar un medio— como metáfora, no como diagrama físico.',
    refs: ['Praxis: conocimiento convertido en acción', 'Metis: inteligencia estratégica y adaptación', 'Planos que se transforman; movimiento controlado', 'Experimentar antes de implementar'],
    rules: ['Retícula de 7 × 7 módulos (m).', 'Plano: paralelogramo de 2m de ancho, de esquina a esquina.', 'Trazo: 1m de ancho, con la inclinación opuesta.', 'La salida se desplaza 1m: los dos brazos comparten una misma línea de borde.', 'Separación entre piezas: m/4. En tamaños mínimos, versión reducida sin separación.'],
    pros: ['Es la única ruta que narra la promesa de la marca: el paso del conocimiento a la acción como un cambio de trayectoria.', 'La X es figura y protagonista; se reconoce sola, sin el nombre.', 'Asimetría controlada: silueta propia, difícil de confundir con una X tipográfica.', 'Construcción modular estricta: cada medida es múltiplo de m.', 'Contiene un principio de movimiento para medios digitales: el trazo se desplaza.'],
    cons: ['La separación entre piezas se cierra en tamaños muy pequeños: exige una versión reducida.', 'La asimetría obliga a reglas estrictas: no reflejar, no rotar, no invertir el sentido.', 'Requiere ajuste óptico fino en la Etapa 2 (ángulo, peso del trazo, separación).', 'Parte de la figura de una letra: su diferenciación depende del rigor de la construcción.'],
    font: {
      file: 'jost-latin-500-normal.ttf', desc: 'jost-latin-500-normal.ttf', track: 0.2,
      css: "font-family:'Jost';font-weight:500;", cssText: "font-family:'Jost';font-weight:400;",
      name: 'Jost', weight: 'Medium',
      note: 'Geométrica de tradición moderna: A de vértice agudo y curvas casi circulares. Se compone con espaciado amplio.',
      system: 'Titulares: Jost Medium · Texto: Jost Regular · Citas: Newsreader · Datos: IBM Plex Mono',
    },
    score: [5, 5, 5, 5, 5, 4, 4, 5, 4, 5],
  },
  {
    n: '03', key: 'ensamble', name: 'Ensamble', q: '¿Y si la X es un sistema?', claim: 'La X como sistema',
    short: 'Cuatro piezas idénticas convergen en un punto.',
    emphasis: 'Innovación y futuro',
    idea: 'Cuatro piezas, un sistema.',
    text: 'Cuatro piezas idénticas —cuatro chevrones— apuntan a un mismo centro. Juntas forman la X; el canal que las separa dibuja una segunda X en negativo. La lectura es doble: convergencia, porque todo el sistema se orienta hacia un punto de decisión, y ensamble, porque ninguna pieza basta sola. El módulo aislado es una flecha: el símbolo trae incorporada su propia señalización.',
    refs: ['Toyota Production System y Lean: estandarización', 'Pensamiento sistémico: interdependencias', 'Piezas integradas y estructuras modulares', 'Conexión entre sistemas'],
    rules: ['Cuadrado de lado L y sus dos diagonales.', 'Cuatro chevrones idénticos, rotados 90° alrededor del centro.', 'Banda b y canal c, con b = 2c.', 'Los extremos se cortan sobre el cuadrado: la figura queda inscrita.'],
    pros: ['El módulo funciona como flecha: señalización, secuencias de proceso y patrones salen del propio símbolo.', 'Simetría total: estable, ordenada, fácil de componer y de centrar.', 'Doble lectura figura-fondo: la X está en las piezas y en el canal.', 'Expresa con claridad la idea de sistema y de piezas interdependientes.'],
    cons: ['Los canales finos se cierran en tamaños pequeños: es la de menor escalabilidad.', 'Ocho bandas: menos contundente y más cercana al lenguaje de infraestructura o tecnología genérica.', 'Habla del sistema, pero no de la transformación de quien aprende.', 'El efecto de línea interior depende más del gusto de época: menor vigencia previsible.'],
    font: {
      file: 'sora-latin-400-normal.ttf', desc: 'sora-latin-400-normal.ttf', track: 0.24,
      css: "font-family:'Sora';font-weight:400;", cssText: "font-family:'Sora';font-weight:300;",
      name: 'Sora', weight: 'Regular',
      note: 'Geométrica contemporánea de trazo uniforme y formas abiertas. Carácter tecnológico sobrio.',
      system: 'Titulares: Sora Regular · Texto: Sora Light · Datos: IBM Plex Mono',
    },
    score: [4, 4, 3, 4, 4, 3, 3, 5, 3, 3],
  },
];

module.exports.CRITERIA = [
  ['Autoridad y credibilidad', 'Muy alta'], ['Recordación', 'Muy alta'], ['Diferenciación', 'Muy alta'], ['Elegancia', 'Muy alta'],
  ['Coherencia conceptual', 'Muy alta'], ['Simplicidad', 'Muy alta'], ['Escalabilidad', 'Muy alta'], ['Aplicación monocromática', 'Muy alta'],
  ['Adaptabilidad digital', 'Alta'], ['Vigencia a largo plazo', 'Muy alta'],
];

module.exports.DISCARDED = [
  ['molinete', 'Molinete', 'Cuatro brazos en rotación. Se lee como hélice antes que como X, y las figuras giratorias de cuatro brazos arrastran asociaciones históricas no deseadas.'],
  ['rombo', 'Rombo central', 'X con un vacío al centro. Correcta, pero genérica: evoca un reloj de arena o una cadena de ADN.'],
  ['contraste', 'Alto contraste', 'Trazo grueso y trazo fino. Es una letra de catálogo tipográfico, no un símbolo con construcción propia.'],
  ['quincunx', 'Quincunx', 'Cinco módulos en formación. Se lee como dado o tablero y ata el símbolo al número cinco, cuando las áreas pueden crecer.'],
];
