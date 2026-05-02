# Moodle Tool Guide (eLeDia)

[English](README.md) · [Deutsch](README.de.md) · [Français](README.fr.md)

Una guía interactiva de herramientas para Moodle 5 — basada en el clásico *Moodle Tool Guide for Teachers* y ampliada con recomendaciones didácticas específicas de eLeDia.

Tres vías de entrega desde una única fuente de datos:

1. **Página web independiente** — `Prototyp_ToolGuide.html`: archivo HTML/React único, integrable directamente mediante `<iframe>`.
2. **Plugin local de Moodle** — `moodle-plugin/local/toolguide/` / `moodle-plugin/local_toolguide.zip`: plugin local instalable para Moodle 4.1+ / 5.x.
3. **Plugin de WordPress** — `wordpress-plugin/eledia-toolguide/` / `wordpress-plugin/eledia-toolguide.zip`: shortcode `[eledia_toolguide]` para cualquier sitio de WordPress.

## Características

- **25 actividades de Moodle** con recomendaciones didácticas para cinco objetivos de aprendizaje
- **Vista Matriz** con iconos de pulgar arriba / lateral / pulgar abajo y tooltips al pasar el ratón o tocar, para escritorio, tableta y móvil
- **Vista Tarjetas** con descripciones detalladas y filtros (esfuerzo de configuración, esfuerzo de acompañamiento, objetivo, nivel de Bloom)
- **Asistente** — asistente guiado en 5 pasos que recomienda actividades según las respuestas
- **Modo Comparación** para comparar hasta cuatro herramientas en paralelo, con reinicio rápido de una nueva comparación
- **Esfuerzo bidimensional**: configuración y acompañamiento continuo
- **Taxonomía de Bloom** (niveles 1–6) por actividad
- **4 idiomas de interfaz**: inglés, alemán, francés, español
- **Accesibilidad**: WCAG 2.2 AA — roles ARIA, enlace de omisión, navegación por teclado, trampa de foco para diálogos, live regions para actualizaciones de filtros, selector de tamaño de fuente
- **Responsive** — escritorio, tableta y móvil
- **Colores oficiales de propósito de actividad de Moodle 5** (administración / evaluación / colaboración / comunicación / contenido interactivo / recursos)

## Fuente de datos

`Datenbank_ToolGuide.xlsx` es la fuente de los datos seleccionados de herramientas (descripciones, idoneidad por objetivo, esfuerzo, Bloom). `Prototyp_ToolGuide.html` es la fuente actual de la interfaz; el JS del plugin de Moodle y el JS del plugin de WordPress se generan desde este archivo mediante `sync_plugin_js.py` y `sync_wordpress_js.py`.

## Usar la página independiente

`Prototyp_ToolGuide.html` es un archivo HTML autónomo. Ábrelo directamente en un navegador o intégralo mediante iframe:

```html
<iframe src="/wp-content/uploads/Prototyp_ToolGuide.html"
        width="100%" height="900" style="border:0"></iframe>
```

## Instalar el plugin de Moodle

Desde la raíz de Moodle:

```bash
unzip /ruta/a/local_toolguide.zip
php admin/cli/upgrade.php
```

Luego accesible en `/local/toolguide/index.php`. El plugin añade una entrada a la navegación global para usuarios con la capacidad `local/toolguide:view`.

## Instalar el plugin de WordPress

1. Sube `eledia-toolguide.zip` en **Plugins → Añadir nuevo → Subir plugin**.
2. Activa el plugin.
3. Inserta el shortcode `[eledia_toolguide]` en cualquier página, entrada o tipo de contenido personalizado.

Atributos opcionales del shortcode:

- `lang="de|en|fr|es"` — fuerza un idioma específico. Sin parámetro se usa la locale de WordPress.
- `height="800px"` — establece la altura mínima del contenedor. Por defecto: `800px`.

Ejemplos:

```
[eledia_toolguide]
[eledia_toolguide lang="en"]
[eledia_toolguide height="auto"]
```

El plugin de WordPress usa la abstracción React incluida en WordPress (`wp-element`) y no carga React desde un CDN externo. El bundle del Tool Guide está marcado con `nowprocket` para WP Rocket, de modo que las optimizaciones de retraso de JavaScript no dejan visible el indicador de carga hasta la primera interacción de scroll.

## Licencia

GNU GPL v3 o posterior (compatible con Moodle).

## Créditos

Basado en el [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) de Joyce Seitzinger, Gavin Henrick y Nicolas Martignoni. Traducción alemana original: Ralf Hilgenstock. Rediseño, actualización a Moodle 5, asistente, vistas Matriz y Tarjetas, empaquetado como plugin local de Moodle y plugin de WordPress: [eLeDia GmbH](https://eledia.de).
