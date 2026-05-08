<?php
/**
 * Plugin Name:       eLeDia Moodle Tool Guide
 * Plugin URI:        https://github.com/jmoskaliuk/local_eledia_moodletoolguide
 * Description:       Interaktiver Wegweiser durch die Aktivitäten von Moodle 5 — Matrix, Karten und Assistent-Ansicht. Einbindung per Shortcode [eledia_toolguide].
 * Version:           1.1.31
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            eLeDia GmbH
 * Author URI:        https://www.eledia.de
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       eledia-toolguide
 * Domain Path:       /languages
 *
 * @package ElediaToolguide
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'ELEDIA_TOOLGUIDE_VERSION', '1.1.31' );
define( 'ELEDIA_TOOLGUIDE_FILE', __FILE__ );
define( 'ELEDIA_TOOLGUIDE_DIR', plugin_dir_path( __FILE__ ) );
define( 'ELEDIA_TOOLGUIDE_URL', plugin_dir_url( __FILE__ ) );

/**
 * Return the Tool Guide language key for the current WordPress locale.
 *
 * @return string Language key supported by the app.
 */
function eledia_toolguide_get_locale_lang() {
    $locale = function_exists( 'determine_locale' ) ? determine_locale() : get_locale();
    $lang   = substr( strtolower( (string) $locale ), 0, 2 );

    return preg_match( '/^(de|en|fr|es)$/', $lang ) ? $lang : 'de';
}

/**
 * Register the [eledia_toolguide] shortcode.
 *
 * Usage: [eledia_toolguide]           — default language (site locale -> DE/EN/FR/ES)
 *        [eledia_toolguide lang="en"] — force a specific language
 *        [eledia_toolguide height="auto"] — override container min-height
 *
 * @param array $atts Shortcode attributes.
 * @return string HTML markup for the mount container.
 */
function eledia_toolguide_shortcode( $atts ) {
    $atts = shortcode_atts(
        array(
            'lang'   => '',
            'height' => '800px',
        ),
        $atts,
        'eledia_toolguide'
    );

    // Enqueue only when shortcode is actually rendered on the page.
    eledia_toolguide_enqueue_assets();

    $requested_lang   = sanitize_key( $atts['lang'] );
    $requested_height = sanitize_text_field( $atts['height'] );

    // Validate and default to the WordPress locale when no shortcode language is set.
    if ( preg_match( '/^(de|en|fr|es)$/', $requested_lang ) ) {
        $lang = $requested_lang;
    } else {
        $lang = eledia_toolguide_get_locale_lang();
    }
    $height = preg_match( '/^[0-9]+(px|em|rem|vh|%)?$|^auto$/', $requested_height ) ? $requested_height : '800px';

    // Pass shortcode config to JS via data-* attributes.
    $attrs = sprintf(
        'class="eledia-toolguide-root" data-lang="%s" style="min-height:%s;"',
        esc_attr( $lang ),
        esc_attr( $height )
    );

    // Accessible loading fallback for no-JS / while the bundle is parsing.
    $fallback  = '<div class="tg-loading" role="status" aria-live="polite">';
    $fallback .= '<span class="tg-loading-spinner" aria-hidden="true"></span>';
    $fallback .= '<span>' . esc_html__( 'Tool Guide wird geladen …', 'eledia-toolguide' ) . '</span>';
    $fallback .= '</div>';
    $fallback .= '<noscript><p>' . esc_html__( 'Für den Moodle Tool Guide muss JavaScript aktiviert sein.', 'eledia-toolguide' ) . '</p></noscript>';

    return '<div ' . $attrs . '>' . $fallback . '</div>';
}
add_shortcode( 'eledia_toolguide', 'eledia_toolguide_shortcode' );

/**
 * Enqueue WordPress' bundled React abstraction and the Tool Guide bundle.
 */
function eledia_toolguide_enqueue_assets() {
    // Avoid double-enqueue if the shortcode appears multiple times on one page.
    static $enqueued = false;
    if ( $enqueued ) {
        return;
    }
    $enqueued = true;

    $react_bridge  = '// nowprocket' . "\n";
    $react_bridge .= 'window.React = window.React || window.wp.element;';
    $react_bridge .= 'window.ReactDOM = window.ReactDOM || {';
    $react_bridge .= 'render: window.wp.element.render || function(element, container) {';
    $react_bridge .= 'window.wp.element.createRoot(container).render(element);';
    $react_bridge .= '}';
    $react_bridge .= '};';

    wp_enqueue_script( 'wp-element' );
    wp_add_inline_script(
        'wp-element',
        $react_bridge,
        'after'
    );

    wp_enqueue_style(
        'eledia-toolguide',
        ELEDIA_TOOLGUIDE_URL . 'assets/css/toolguide.css',
        array(),
        ELEDIA_TOOLGUIDE_VERSION
    );

    wp_enqueue_script(
        'eledia-toolguide',
        ELEDIA_TOOLGUIDE_URL . 'assets/js/toolguide.js',
        array( 'wp-element', 'wp-i18n' ),
        ELEDIA_TOOLGUIDE_VERSION,
        true
    );

    wp_add_inline_script(
        'eledia-toolguide',
        '// nowprocket' . "\n" . 'window.elediaToolguideConfig = ' . wp_json_encode(
            array(
                'localeLang' => eledia_toolguide_get_locale_lang(),
            )
        ) . ';',
        'before'
    );

    if ( function_exists( 'wp_set_script_translations' ) ) {
        wp_set_script_translations(
            'eledia-toolguide',
            'eledia-toolguide',
            ELEDIA_TOOLGUIDE_DIR . 'languages'
        );
    }
}

/**
 * Keep the Tool Guide scripts out of JavaScript-delay optimizers such as WP Rocket.
 *
 * @param string $tag    Original script tag.
 * @param string $handle Script handle.
 * @return string Possibly modified script tag.
 */
function eledia_toolguide_script_loader_tag( $tag, $handle ) {
    $toolguide_handles = array( 'wp-element', 'wp-i18n', 'eledia-toolguide' );

    if ( in_array( $handle, $toolguide_handles, true ) && false === strpos( $tag, ' data-nowprocket' ) ) {
        $tag = str_replace( '<script ', '<script data-nowprocket ', $tag );
    }

    if ( 'eledia-toolguide' === $handle && false === strpos( $tag, ' defer' ) ) {
        $tag = str_replace( '<script ', '<script defer ', $tag );
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'eledia_toolguide_script_loader_tag', 10, 2 );
