# PRAXIS — Manual de marca

**PRAXIS — Fábrica de Aprendizaje.** Carpeta de trabajo y entrega del manual integral de identidad.

## Estado del proyecto

| Etapa | Contenido | Estado |
| --- | --- | --- |
| 1. Dirección creativa | Tres rutas conceptuales para el símbolo X y recomendación | Entregada. En espera de aprobación |
| 2. Identidad visual | Logotipo, tipografía, color, sistema gráfico, identidad verbal, arquitectura y aplicaciones | No iniciada. Requiere aprobar una ruta |
| 3. Manual final | Manual completo en PDF, archivos maestros y recursos de identidad | No iniciada |

El logotipo **no está definido**. Los símbolos de la Etapa 1 son exploraciones para decisión; no deben usarse todavía como identidad oficial.

## Estructura de la carpeta

```
PRAXIS_MANUAL_DE_MARCA/
├── README.md
├── 00_Documentos_base/
│   ├── PRAXIS_Documento_Maestro_de_Marca.md
│   └── PRAXIS_Arquitectura_de_Marca.md
├── 01_Etapa_1_Direccion_Creativa/
│   ├── PRAXIS_Etapa1_Direccion_Creativa.pdf      Documento de presentación (A4, 15 páginas)
│   ├── PRAXIS_Etapa1_vista_comparativo.png       Vista rápida: las tres rutas frente a frente
│   ├── PRAXIS_Etapa1_vista_ruta02.png            Vista rápida: ruta recomendada
│   ├── editable/
│   │   └── PRAXIS_Etapa1_Direccion_Creativa.html Versión editable del documento
│   └── simbolos/                                 Las tres rutas en SVG y PNG transparente
└── _fuente/                                      Archivos para regenerar todo
    ├── etapa1/                                   Geometría, textos y composición
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
```

El comando vuelve a producir el HTML editable, el PDF y los símbolos en SVG y PNG.

## Tipografías

Todas las fuentes usadas tienen licencia SIL Open Font License 1.1. Los textos de licencia están en `_fuente/fonts/LICENSE-*.txt`.

| Fuente | Uso en la Etapa 1 |
| --- | --- |
| Archivo y Archivo Expanded | Dirección tipográfica de la ruta 01 |
| Jost | Dirección tipográfica de la ruta 02 |
| Sora | Dirección tipográfica de la ruta 03 |
| Newsreader | Citas del documento |
| Instrument Sans | Texto del documento de presentación |
| IBM Plex Mono | Rótulos y anotaciones técnicas |

Las instancias estáticas de Archivo (`archivo-*.ttf`) se generaron a partir de la fuente variable original con fontTools. La tipografía definitiva de la marca se confirma en la Etapa 2.

## Decisiones y validaciones pendientes

1. **Aprobación de ruta.** Elegir una ruta, pedir ajustes o solicitar nueva exploración.
2. **Registrabilidad.** No se ha hecho búsqueda de antecedentes marcarios. Se recomienda consultar los registros de la Superintendencia de Industria y Comercio para el nombre PRAXIS y para el símbolo elegido, al menos en las clases 41 y 35 de la Clasificación de Niza, con apoyo de un abogado de propiedad industrial (Decisión 486 de 2000 de la Comunidad Andina).
3. **Arquitectura de marca.** Siguen abiertas las decisiones de la sección 11 del documento de arquitectura.
4. **Color.** Los grises usados en la Etapa 1 son provisionales. Los códigos HEX, RGB y CMYK se fijan en la Etapa 2.

## Nota de método

Los símbolos se construyeron como geometría paramétrica y el documento se compuso en HTML y se exportó a PDF. No se utilizó generación de imágenes. En las etapas 2 y 3 los mockups serán escenas vectoriales construidas a escala; si se requieren mockups fotográficos harán falta fotografías reales del espacio o una herramienta de generación de imágenes.
