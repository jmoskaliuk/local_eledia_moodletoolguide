<?php
/**
 * Plugin Name:       eLeDia Moodle Tool Guide
 * Plugin URI:        https://github.com/jmoskaliuk/local_eledia_moodletoolguide
 * Description:       Interaktiver Wegweiser durch die Aktivitäten von Moodle 5 — Matrix, Karten und Assistent-Ansicht. Einbindung per Shortcode [eledia_toolguide].
 * Version:           1.1.9
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            eLeDia GmbH
 * Author URI:        https://www.eledia.de
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       eledia-toolguide
 *
 * @package EledialToolguide
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'ELEDIA_TOOLGUIDE_VERSION', '1.1.9' );
define( 'ELEDIA_TOOLGUIDE_FILE', __FILE__ );
define( 'ELEDIA_TOOLGUIDE_DIR', plugin_dir_path( __FILE__ ) );
define( 'ELEDIA_TOOLGUIDE_URL', plugin_dir_url( __FILE__ ) );

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

    // Sanitize.
    $lang   = preg_match( '/^(de|en|fr|es)$/', $atts['lang'] ) ? $atts['lang'] : '';
    $height = preg_match( '/^[0-9]+(px|em|rem|vh|%)?$|^auto$/', $atts['height'] ) ? $atts['height'] : '800px';

    // Pass shortcode config to JS via data-* attributes.
    $attrs = sprintf(
        'class="eledia-toolguide-root" data-lang="%s" style="min-height:%s;"',
        esc_attr( $lang ),
        esc_attr( $height )
    );

    // Accessible loading fallback for no-JS / while the bundle is parsing.
    $fallback = '<noscript><p>' . esc_html__( 'Für den Moodle Tool Guide muss JavaScript aktiviert sein.', 'eledia-toolguide' ) . '</p></noscript>';

    return '<div ' . $attrs . '>' . $fallback . '</div>';
}
add_shortcode( 'eledia_toolguide', 'eledia_toolguide_shortcode' );

/**
 * Enqueue React, ReactDOM and the Tool Guide bundle.
 *
 * React is loaded from unpkg CDN for v1. To self-host, drop
 * react.production.min.js and react-dom.production.min.js into
 * assets/js/vendor/ and flip the REACT_SOURCE constant.
 */
function eledia_toolguide_enqueue_assets() {
    // Avoid double-enqueue if the shortcode appears multiple times on one page.
    static $enqueued = false;
    if ( $enqueued ) {
        return;
    }
    $enqueued = true;

    // Use a local self-hosted copy if present, otherwise CDN.
    $vendor_dir = ELEDIA_TOOLGUIDE_DIR . 'assets/js/vendor/';
    $vendor_url = ELEDIA_TOOLGUIDE_URL . 'assets/js/vendor/';

    if ( file_exists( $vendor_dir . 'react.production.min.js' ) ) {
        wp_enqueue_script(
            'eledia-toolguide-react',
            $vendor_url . 'react.production.min.js',
            array(),
            '18.3.1',
            true
        );
        wp_enqueue_script(
            'eledia-toolguide-react-dom',
            $vendor_url . 'react-dom.production.min.js',
            array( 'eledia-toolguide-react' ),
            '18.3.1',
            true
        );
    } else {
        wp_enqueue_script(
            'eledia-toolguide-react',
            'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
            array(),
            '18.3.1',
            true
        );
        wp_enqueue_script(
            'eledia-toolguide-react-dom',
            'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
            array( 'eledia-toolguide-react' ),
            '18.3.1',
            true
        );
    }

    wp_enqueue_style(
        'eledia-toolguide',
        ELEDIA_TOOLGUIDE_URL . 'assets/css/toolguide.css',
        array(),
        ELEDIA_TOOLGUIDE_VERSION
    );

    wp_enqueue_script(
        'eledia-toolguide',
        ELEDIA_TOOLGUIDE_URL . 'assets/js/toolguide.js',
        array( 'eledia-toolguide-react', 'eledia-toolguide-react-dom' ),
        ELEDIA_TOOLGUIDE_VERSION,
        true
    );
}

/**
 * Add async/defer to our own scripts without touching core scripts.
 *
 * @param string $tag    Original script tag.
 * @param string $handle Script handle.
 * @return string Possibly modified script tag.
 */
function eledia_toolguide_script_loader_tag( $tag, $handle ) {
    $ours = array(
        'eledia-toolguide-react',
        'eledia-toolguide-react-dom',
        'eledia-toolguide',
    );
    if ( in_array( $handle, $ours, true ) && false === strpos( $tag, ' defer' ) ) {
        $tag = str_replace( '<script ', '<script defer ', $tag );
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'eledia_toolguide_script_loader_tag', 10, 2 );
