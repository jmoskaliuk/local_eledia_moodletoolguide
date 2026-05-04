=== eLeDia Moodle Tool Guide ===
Contributors: elediamoodle
Tags: moodle, elearning, shortcode, tool-guide, didactica
Requires at least: 6.0
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.1.30
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Guía interactiva de las actividades de Moodle 5 — vistas matriz, tarjetas y asistente. Integración mediante shortcode.

== Descripción ==

El **eLeDia Moodle Tool Guide** ayuda a docentes y diseñadores de cursos a elegir la actividad de Moodle adecuada para su objetivo didáctico. La guía agrupa conocimiento curado sobre 22 actividades de Moodle con metadatos sobre el esfuerzo de configuración, el esfuerzo de acompañamiento, la idoneidad para cuatro categorías de objetivos de aprendizaje (informar, evaluar, comunicar, colaborar) y el nivel de la taxonomía de Bloom.

Tres vistas sobre el mismo conjunto de datos:

* **Matriz** — vista de tabla con esfuerzo de configuración/acompañamiento e idoneidad por objetivo de aprendizaje mediante iconos de pulgar.
* **Tarjetas** — vista en mosaico con filtros por esfuerzo, objetivo de aprendizaje y nivel de Bloom.
* **Asistente** — asistente guiado en 5 pasos que recomienda actividades según las respuestas del usuario.

La guía es multilingüe (inglés, alemán, francés, español), cumple WCAG 2.2 AA e incluye un selector integrado de tamaño de fuente. Los datos están basados en una traducción del Moodle Tool Guide suizo de Joyce Seitzinger, Gavin Henrick y Nicolas Martignoni (traducción alemana original: Ralf Hilgenstock), actualizado didácticamente para Moodle 5.

Este plugin es un envoltorio ligero alrededor de la Tool Guide HTML independiente — el payload de JavaScript se sincroniza desde el prototipo canónico. El plugin incluye un shortcode, sin interfaz de administración, sin tablas de base de datos, sin seguimiento.

Nota: el readme principal para el WordPress Plugin Directory está en inglés (`readme.txt`). Este archivo es la traducción al español.

== Código fuente ==

El archivo JavaScript distribuido `assets/js/toolguide.js` se genera a partir del prototipo HTML/React legible por humanos en el repositorio público:

https://github.com/jmoskaliuk/local_eledia_moodletoolguide/blob/main/Prototyp_ToolGuide.html

El script de generación también es público:

https://github.com/jmoskaliuk/local_eledia_moodletoolguide/blob/main/sync_wordpress_js.py

Para reconstruir el bundle JavaScript de WordPress desde la raíz del repositorio, ejecute:

`python3 sync_wordpress_js.py`

Para reconstruir el ZIP instalable del plugin, ejecute:

`cd wordpress-plugin && zip -qr eledia-toolguide.zip eledia-toolguide -x '*/.DS_Store'`

La hoja de estilos `assets/css/toolguide.css` se distribuye como código fuente CSS sin comprimir.

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

No. El plugin usa el paquete `wp-element` incluido en WordPress y no carga React desde un CDN externo.

= ¿Funciona el plugin con el editor de bloques Gutenberg? =

El shortcode funciona en cualquier sitio donde WordPress ejecute shortcodes — incluyendo el bloque shortcode de Gutenberg. Un bloque Gutenberg nativo está planeado para una versión futura.

= ¿Puedo ampliar la lista de herramientas? =

Los datos de las herramientas están actualmente codificados en el bundle JavaScript. Un editor de administración para la lista de herramientas está planeado.

= ¿Hay seguimiento o telemetría? =

No. El plugin es 100 % autónomo y no se comunica con servidores externos.

== Registro de cambios ==

= 1.1.30 =
* Inicio reforzado frente a problemas de orden causados por la optimización de JavaScript: Tool Guide espera ahora al runtime React de WordPress antes de renderizar.

= 1.1.29 =
* Añadidos los metadatos solicitados para la revisión de WordPress.org: nombre de usuario contribuidor del propietario del plugin y documentación pública del código fuente y generación del bundle JavaScript.

= 1.1.28 =
* Actualizados los metadatos de compatibilidad de WordPress.org para Plugin Check y eliminado el hook manual de carga del textdomain que ya no era necesario.

= 1.1.27 =
* Se eliminó la actividad Encuesta predefinida obsoleta de los datos sincronizados de Moodle 5 y se alineó la lista de actividades con la hoja de cálculo fuente actualizada.

= 1.1.26 =
* Se eliminó la actividad Chat obsoleta de los datos sincronizados de Moodle 5 y se alineó la lista de actividades con la hoja de cálculo fuente.

= 1.1.25 =
* Scripts del Tool Guide y código inline de arranque marcados con exclusiones WP Rocket `nowprocket` para que la aplicación arranque sin interacción de scroll.

= 1.1.24 =
* Añadidas indicaciones táctiles para cabeceras de matriz y fijadas las indicaciones de matriz en la parte inferior del viewport para dispositivos táctiles como iPad.

= 1.1.23 =
* Añadida la acción « Iniciar nueva comparación » en la vista de comparación y alineados los botones de comparación al fondo de las tarjetas.

= 1.1.22 =
* Los objetivos de aprendizaje de Bloom se muestran de forma neutral en los detalles de las tarjetas, no como idoneidad buena/parcial/mala.

= 1.1.21 =
* Añadidas indicaciones táctiles en la matriz móvil para puntos de esfuerzo e iconos de idoneidad.

= 1.1.20 =
* En móvil, la vista inicial ahora es Tarjetas y el indicador de carga se elimina explícitamente antes de renderizar la aplicación.

= 1.1.19 =
* Corregido el icono de idoneidad parcial para que el pulgar apunte hacia la izquierda.

= 1.1.18 =
* Añadido un indicador de carga accesible mientras arranca el paquete de WordPress y sincronizada la matriz móvil compacta del prototipo HTML.

= 1.1.17 =
* Diseño móvil mejorado: las flechas de lectura de la matriz se ocultan en pantallas pequeñas, el campo de búsqueda queda alineado a la izquierda y las opciones del asistente se ajustan al viewport.

= 1.1.16 =
* Tarjetas móviles de la matriz mejoradas para iPhone: los chips de objetivos didácticos usan ahora dos columnas y las etiquetas largas ya no se solapan.

= 1.1.15 =
* Integración con temas de WordPress mejorada: Tool Guide ahora ocupa todo el ancho del viewport para cabecera, navegación, fondo de contenido y pie de página. El pie de página permanece abajo en páginas con pocos resultados.

= 1.1.14 =
* Añadida compatibilidad con la internacionalización JavaScript de WordPress para textos de interfaz mediante `wp-i18n`, `wp_set_script_translations()`, traducciones JSON incluidas y una plantilla POT. Los datos seleccionados de herramientas siguen disponibles mediante el selector integrado DE/EN/FR/ES.

= 1.1.13 =
* Sincronizado el prototipo HTML actual con el plugin de WordPress: ayuda de lectura de la matriz, paneles de información, filtrado mejorado del asistente, tarjetas de matriz para móvil y mejoras de accesibilidad en contraste, foco y semántica de tabla. React se carga ahora mediante el paquete `wp-element` incluido en WordPress en lugar de un CDN externo.

= 1.1.12 =
* Pie de página rediseñado para coincidir con la nueva cabecera: beige claro cálido (#FFECDB) con texto y enlaces subrayados en azul oscuro, en lugar de la franja azul oscuro con enlaces naranjas. Los logotipos de eLeDia y Moodle Partner, la insignia CC-BY-NC-SA y el icono de GitHub se leen con claridad sobre el nuevo fondo.

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
* React mediante el paquete `wp-element` incluido en WordPress.
* WCAG 2.2 AA: contraste, operación por teclado, gestión de foco, live regions.

== Créditos ==

Basado en el [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) de Joyce Seitzinger, Gavin Henrick y Nicolas Martignoni. Traducción alemana original: Ralf Hilgenstock. Rediseño y actualización a Moodle 5: eLeDia GmbH.
