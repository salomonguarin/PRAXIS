# PRAXIS — Manual de marca

**PRAXIS — Fábrica de Aprendizaje.** Carpeta de trabajo y entrega del manual integral de identidad.

## Estado del proyecto

| Etapa | Contenido | Estado |
| --- | --- | --- |
| 1. Dirección creativa | Tres rutas conceptuales para el símbolo X y recomendación | Cerrada. Aprobada la ruta 02 · Refracción |
| 2. Identidad visual | Logotipo, tipografía, color, sistema gráfico, identidad verbal, arquitectura y aplicaciones | En curso. Logotipo en espera de aprobación |
| 3. Manual final | Manual completo en PDF, archivos maestros y recursos de identidad | No iniciada |

**Decisiones registradas:** se aprobó la ruta 02 · Refracción con dos cambios pedidos por el cliente: reemplazar la tipografía del logotipo y usar el símbolo como la X dentro de la palabra PRAXIS. El cliente aportó una imagen de referencia (`00_Documentos_base/referencias/`).

**Pendiente:** aprobar el peso del wordmark (opción A, B o C), las tipografías de apoyo y las versiones. Hasta entonces, los archivos de `logotipo_propuesta/` son una propuesta y no deben usarse como identidad oficial.

## Estructura de la carpeta

```
PRAXIS_MANUAL_DE_MARCA/
├── README.md
├── 00_Documentos_base/
│   ├── PRAXIS_Documento_Maestro_de_Marca.md
│   ├── PRAXIS_Arquitectura_de_Marca.md
│   └── referencias/referencia_cliente_logo.png    Referencia aportada por el cliente
├── 01_Etapa_1_Direccion_Creativa/
│   ├── PRAXIS_Etapa1_Direccion_Creativa.pdf      Documento de presentación (A4, 15 páginas)
│   ├── PRAXIS_Etapa1_vista_comparativo.png       Vista rápida: las tres rutas frente a frente
│   ├── PRAXIS_Etapa1_vista_ruta02.png            Vista rápida: ruta recomendada
│   ├── editable/
│   │   └── PRAXIS_Etapa1_Direccion_Creativa.html Versión editable del documento
│   └── simbolos/                                 Las tres rutas en SVG y PNG transparente
├── 02_Etapa_2_Identidad_Visual/
│   ├── PRAXIS_Etapa2_Logotipo_para_aprobacion.pdf Propuesta de logotipo (A4, 9 páginas)
│   ├── PRAXIS_Etapa2_vista_*.png                 Vistas rápidas
│   ├── editable/PRAXIS_Etapa2_Logotipo.html      Versión editable del documento
│   └── logotipo_propuesta/
│       ├── svg/                                  Principal, horizontal, wordmark, isotipo e isotipo reducido
│       ├── png/                                  Lo mismo en PNG transparente
│       └── alternativas_de_peso/                 Logotipo principal en las opciones A, B y C
└── _fuente/                                      Archivos para regenerar todo
    ├── etapa1/                                   Geometría, textos y composición de la Etapa 1
    ├── etapa2/                                   Wordmark, composiciones y documento de la Etapa 2
    └── fonts/                                    Tipografías y sus licencias
```

## Las tres rutas de la Etapa 1

| Ruta | Idea | Archivos |
| --- | --- | --- |
| 01 Umbral | La X como espacio: el vacío entre cuatro planos | `simbolos/PRAXIS_ruta-01_umbral_*` |
| 02 Refracción (recomendada) | La X como transformación: un trazo atraviesa un plano y sale desplazado un módulo | `simbolos/PRAXIS_ruta-02_refraccion_*` |
| 03 Ensamble | La X como sistema: cuatro piezas idénticas convergen en un punto | `simbolos/PRAXIS_ruta-03_ensamble_*` |

Cada símbolo se entrega en cuatro archivos: `_positivo.svg`, `_negativo.svg`, `_positivo.png` y `_negativo.png`.
Los PNG miden 2000 × 2000 px y tienen fondo transparente. La versión negativa es blanca: sobre un visor de fondo blanco no se ve.

## Logotipo propuesto (Etapa 2)

- **Wordmark dibujado a medida.** No depende de ninguna fuente: las letras se construyen con barras, semicírculos y diagonales (`_fuente/etapa2/wordmark.js`) y se unen con operaciones booleanas en contornos limpios.
- **La X es el símbolo** de la ruta 02, sin cambios, a la altura de mayúsculas.
- **Opción recomendada C · Trazo:** las letras tienen el grosor del trazo del símbolo (11,6 % de la altura de mayúsculas).
- **Descriptor** "FÁBRICA DE APRENDIZAJE" en Lexend Exa Light, convertido a trazados.
- Todos los SVG son vectores puros: sin texto vivo, sin efectos y con un solo color de relleno. Las versiones negativas son blancas.

| Archivo | Uso |
| --- | --- |
| `PRAXIS_logo_principal_*` | Versión por defecto: wordmark y descriptor apilados |
| `PRAXIS_logo_horizontal_*` | Formatos bajos y anchos |
| `PRAXIS_wordmark_*` | Tamaños pequeños, sin descriptor |
| `PRAXIS_isotipo_*` | Avatar, favicono, sellos. Nunca junto al wordmark |
| `PRAXIS_isotipo_reducido_*` | Isotipo por debajo de 6 mm, sin separación entre piezas |

## Cómo usar los archivos

- **Para revisar y decidir:** abrir `PRAXIS_Etapa1_Direccion_Creativa.pdf`.
- **Para editar textos del documento:** editar `_fuente/etapa1/content.js` y regenerar. El HTML de la carpeta `editable/` también puede abrirse y modificarse directamente en un navegador o editor; usa las fuentes de `_fuente/fonts/` por ruta relativa, por lo que debe conservarse la estructura de carpetas.
- **Para editar un símbolo:** los SVG son vectores puros (un solo trazado, sin efectos) y abren en Illustrator, Affinity, Figma o Inkscape. La geometría de origen es paramétrica y está en `_fuente/etapa1/symbols.js`.

### Regenerar el documento

Requiere Node.js y un Chromium accesible mediante Playwright.

```bash
cd PRAXIS_MANUAL_DE_MARCA/_fuente
npm install
npm install playwright
node etapa1/build.js
node etapa2/build_logo.js
```

Cada comando vuelve a producir el HTML editable, el PDF y los archivos SVG y PNG de su etapa.

## Tipografías

Todas las fuentes usadas tienen licencia SIL Open Font License 1.1. Los textos de licencia están en `_fuente/fonts/LICENSE-*.txt`.

| Fuente | Uso |
| --- | --- |
| Lexend Exa | Etapa 2: descriptor del logotipo, titulares y rótulos (propuesta) |
| Lexend | Etapa 2: texto (propuesta) |
| Archivo y Archivo Expanded | Dirección tipográfica de la ruta 01 |
| Jost | Dirección tipográfica de la ruta 02 |
| Sora | Dirección tipográfica de la ruta 03 |
| Newsreader | Citas del documento |
| Instrument Sans | Texto del documento de presentación |
| IBM Plex Mono | Rótulos, datos y anotaciones técnicas |
| Archivo, Jost, Sora, Newsreader, Instrument Sans | Solo en el documento de la Etapa 1 |

Las instancias estáticas de Archivo (`archivo-*.ttf`) y los TTF de Lexend Exa se generaron a partir de la fuente variable original con fontTools. La tipografía definitiva de la marca se confirma en la Etapa 2.

## Decisiones y validaciones pendientes

1. **Aprobación del logotipo.** Peso del wordmark (A, B o C), tipografías de apoyo y versiones.
2. **Registrabilidad.** No se ha hecho búsqueda de antecedentes marcarios. Se recomienda consultar los registros de la Superintendencia de Industria y Comercio para el nombre PRAXIS y para el símbolo elegido, al menos en las clases 41 y 35 de la Clasificación de Niza, con apoyo de un abogado de propiedad industrial (Decisión 486 de 2000 de la Comunidad Andina).
3. **Arquitectura de marca.** Siguen abiertas las decisiones de la sección 11 del documento de arquitectura.
4. **Color.** Los grises usados en la Etapa 1 son provisionales. Los códigos HEX, RGB y CMYK se fijan en la Etapa 2.

## Nota de método

Los símbolos se construyeron como geometría paramétrica y el documento se compuso en HTML y se exportó a PDF. No se utilizó generación de imágenes. En las etapas 2 y 3 los mockups serán escenas vectoriales construidas a escala; si se requieren mockups fotográficos harán falta fotografías reales del espacio o una herramienta de generación de imágenes.
