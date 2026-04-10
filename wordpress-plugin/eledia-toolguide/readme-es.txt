=== eLeDia Moodle Tool Guide ===
Contributors: eledia, jmoskaliuk
Tags: moodle, elearning, shortcode, tool-guide, didactica
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 1.1.11
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Guía interactiva de las actividades de Moodle 5 — vistas matriz, tarjetas y asistente. Integración mediante shortcode.

== Descripción ==

El **eLeDia Moodle Tool Guide** ayuda a docentes y diseñadores de cursos a elegir la actividad de Moodle adecuada para su objetivo didáctico. La guía agrupa conocimiento curado sobre unas 25 actividades de Moodle con metadatos sobre el esfuerzo de configuración, el esfuerzo de acompañamiento, la idoneidad para cuatro categorías de objetivos de aprendizaje (informar, evaluar, comunicar, colaborar) y el nivel de la taxonomía de Bloom.

Tres vistas sobre el mismo conjunto de datos:

* **Matriz** — vista de tabla con esfuerzo de configuración/acompañamiento e idoneidad por objetivo de aprendizaje mediante iconos de pulgar.
* **Tarjetas** — vista en mosaico con filtros por esfuerzo, objetivo de aprendizaje y nivel de Bloom.
* **Asistente** — asistente guiado en 5 pasos que recomienda actividades según las respuestas del usuario.

La guía es multilingüe (inglés, alemán, francés, español), cumple WCAG 2.2 AA e incluye un selector integrado de tamaño de fuente. Los datos están basados en una traducción del Moodle Tool Guide suizo de Joyce Seitzinger, Gavin Henrick y Nicolas Martignoni (traducción alemana original: Ralf Hilgenstock), actualizado didácticamente para Moodle 5.

Este plugin es un envoltorio ligero alrededor de la Tool Guide HTML independiente — el payload de JavaScript se sincroniza desde el prototipo canónico. El plugin incluye un shortcode, sin interfaz de administración, sin tablas de base de datos, sin seguimiento.

Nota: el readme principal para el WordPress Plugin Directory está en inglés (`readme.txt`). Este archivo es la traducción al español.

== Instalación ==

1. Sube el ZIP del plugin en *Plugins → Añadir nuevo → Subir plugin*.
2. Activa el plugin.
3. Inserta el shortcode `[eledia_toolguide]` en cualquier página, entrada o tipo de contenido personalizado.

Atributos opcionales del shortcode:

* `lang="de|en|fr|es"` — fuerza un idioma específico. Sin parámetro se usa la locale de WordPress.
* `height="800px"` — establece la altura mínima del contenedor. Por defecto: `800px`.

Ejemplos:

`[eledia_toolguide]`
`[eledia_toolguide lang="es"]`
`[eledia_toolguide height="auto"]`

== Preguntas frecuentes ==

= ¿Carga el plugin React desde un CDN externo? =

Por defecto, sí — React 18.3.1 se carga desde unpkg.com. Para instalaciones conformes al RGPD sin peticiones externas puedes autoalojar React: coloca `react.production.min.js` y `react-dom.production.min.js` de la distribución de React en `assets/js/vendor/`. El plugin detecta los archivos locales automáticamente y los usa en lugar del CDN.

= ¿Funciona el plugin con el editor de bloques Gutenberg? =

El shortcode funciona en cualquier sitio donde WordPress ejecute shortcodes — incluyendo el bloque shortcode de Gutenberg. Un bloque Gutenberg nativo está planeado para una versión futura.

= ¿Puedo ampliar la lista de herramientas? =

Los datos de las herramientas están actualmente codificados en el bundle JavaScript. Un editor de administración para la lista de herramientas está planeado.

= ¿Hay seguimiento o telemetría? =

No. El plugin es 100 % autónomo (excepto el CDN de React opcional) y no se comunica con servidores externos.

== Registro de cambios ==

= 1.1.11 =
* Nuevo aspecto de la cabecera: el degradado azul se sustituye por un beige claro cálido (#FFECDB) con texto azul oscuro, y la subnavegación ahora es gris (#F3F5F8) en lugar de blanca — ya no hay una franja blanca a todo ancho en la parte superior en pantallas anchas. Mejores contrastes con zoom y en modo de alto contraste.

= 1.1.10 =
* Aislamiento del tema corregido: los menús desplegables de filtro (Adecuado para / Bloom) y los enlaces del pie de página ya no heredan los estilos del tema de WordPress. El plugin incluye ahora un reinicio CSS limitado a su contenedor, para que el Tool Guide se vea igual en cualquier tema activo.
* Eliminados los emojis de libro y bombilla de los botones «Documentación Moodle» y «eledia.community» en la vista de detalle — aspecto más limpio.

= 1.1.9 =
* Los tres iconos de valoración de la matriz actualizados a Lucide v1.8.0: thumbs-up, thumbs-down y circle-slash tienen una nueva forma redibujada.
* Readme del plugin disponible en inglés (principal), alemán, francés y español.

= 1.1.8 =
* Icono "neutral" de la matriz: ahora usa Lucide circle-slash (círculo con diagonal) en lugar de un thumbs-up rotado. Se lee más claramente como "ni arriba ni abajo".

= 1.1.7 =
* Los iconos de actividad ahora usan los colores oficiales de propósito de actividad de Moodle 5 (administración / evaluación / colaboración / comunicación / contenido interactivo / recursos).
* Asistente: botones de nivel de Bloom en la paleta CI de eLeDia en lugar de un degradado HSL.
* Las tarjetas de resultados del asistente ahora usan el mismo diseño que la vista de tarjetas principal.
* Pulgar lateral de la matriz renderizado como Lucide thumbs-up rotado -90° (reemplazado en 1.1.8).

= 1.1.6 =
* Puerto inicial de WordPress desde el plugin de Moodle local_toolguide 1.1.6.
* Incrustación basada en shortcode.
* React 18 via CDN o autoalojado.
* WCAG 2.2 AA: contraste, operación por teclado, gestión de foco, live regions.

== Créditos ==

Basado en el [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) de Joyce Seitzinger, Gavin Henrick y Nicolas Martignoni. Traducción alemana original: Ralf Hilgenstock. Rediseño y actualización a Moodle 5: eLeDia GmbH.
