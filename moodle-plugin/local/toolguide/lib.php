<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Library functions for local_toolguide.
 *
 * @package    local_toolguide
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Add navigation node to the main navigation.
 *
 * @param global_navigation $navigation
 */
function local_toolguide_extend_navigation(global_navigation $navigation) {
    $context = \core\context\system::instance();
    if (has_capability('local/toolguide:view', $context)) {
        $node = $navigation->add(
            get_string('toolguide', 'local_toolguide'),
            new moodle_url('/local/toolguide/index.php'),
            navigation_node::TYPE_CUSTOM,
            null,
            'local_toolguide',
            new pix_icon('i/info', '')
        );
        $node->showinflatnavigation = true;
    }
}

/**
 * Map the current Moodle locale to a language code supported by the React
 * Tool Guide app.
 *
 * Mirrors the mapping used by the WordPress plugin so the three delivery
 * tracks behave consistently. Supported codes: de, en, fr, es. Anything
 * else falls back to en (per PO decision, v1.1.33).
 *
 * @return string One of 'de', 'en', 'fr', 'es'.
 */
function local_toolguide_get_locale_lang() {
    $locale = function_exists('current_language') ? current_language() : 'en';
    $lang   = substr(strtolower((string) $locale), 0, 2);

    return preg_match('/^(de|en|fr|es)$/', $lang) ? $lang : 'en';
}

/**
 * Inject the floating Tool Guide quick-access button into the page footer.
 *
 * Called automatically by Moodle's core_renderer::standard_footer_html() via
 * get_plugins_with_function('before_footer') in Moodle < 4.4 and via the
 * core\hook\output\before_footer_html_generation hook in Moodle 4.4+
 * (see classes/hook_callbacks.php and db/hooks.php). Returns HTML that is
 * appended right before the closing </body> tag on every rendered page.
 *
 * The button is only rendered when:
 *  - the user is logged in (and not a guest);
 *  - the user holds the local/toolguide:viewfab capability
 *    (default: editing teacher, manager, site admin);
 *  - the current page is not the Tool Guide itself (avoid self-link);
 *  - the page has a full HTML layout (suppressed on CLI, print, secure layouts).
 *
 * The icon is the Lucide `life-buoy` glyph (ISC-licensed, v1.8.0). The
 * button position is controlled by the `local_toolguide | fab_position`
 * site setting (`bottomright` default, `bottomleft` opt-in).
 *
 * @return string HTML to inject before the footer, or empty string.
 */
function local_toolguide_before_footer() {
    global $PAGE;

    // Bail out early on non-page contexts (CLI, cron, install, upgrade, AJAX).
    if (during_initial_install()) {
        return '';
    }
    if (defined('CLI_SCRIPT') && CLI_SCRIPT) {
        return '';
    }
    if (defined('AJAX_SCRIPT') && AJAX_SCRIPT) {
        return '';
    }

    // Only for logged-in, non-guest users.
    if (!isloggedin() || isguestuser()) {
        return '';
    }

    // Don't show the button on the Tool Guide page itself or the login/maintenance pages.
    if (isset($PAGE->url)) {
        $path = $PAGE->url->get_path();
        if (strpos($path, '/local/toolguide/') !== false ||
            strpos($path, '/login/') !== false ||
            strpos($path, '/admin/tool/installaddon/') !== false) {
            return '';
        }
    }

    // Suppress on embedded / secure / maintenance / print layouts.
    $suppressedlayouts = ['embedded', 'print', 'maintenance', 'redirect', 'secure'];
    if (in_array($PAGE->pagelayout, $suppressedlayouts, true)) {
        return '';
    }

    // Capability check — the whole point of the feature.
    $context = \core\context\system::instance();
    if (!has_capability('local/toolguide:viewfab', $context)) {
        return '';
    }

    // Read the position setting (bottomright | bottomleft).
    $position = get_config('local_toolguide', 'fab_position');
    if ($position !== 'bottomleft') {
        $position = 'bottomright';
    }

    $url    = new moodle_url('/local/toolguide/index.php');
    $title  = get_string('fab_title', 'local_toolguide');
    $label  = get_string('fab_label', 'local_toolguide');

    // Lucide v1.8.0 "life-buoy" icon. Inline SVG so it inherits the
    // theme-agnostic stroke-currentColor behaviour and stays crisp at any
    // resolution; ISC-licensed, see https://lucide.dev.
    $icon = '<svg class="local-toolguide-fab__icon" xmlns="http://www.w3.org/2000/svg" '
          . 'width="24" height="24" viewBox="0 0 24 24" fill="none" '
          . 'stroke="currentColor" stroke-width="2" stroke-linecap="round" '
          . 'stroke-linejoin="round" aria-hidden="true" focusable="false">'
          . '<circle cx="12" cy="12" r="10"/>'
          . '<path d="m4.93 4.93 4.24 4.24"/>'
          . '<path d="m14.83 9.17 4.24-4.24"/>'
          . '<path d="m14.83 14.83 4.24 4.24"/>'
          . '<path d="m9.17 14.83-4.24 4.24"/>'
          . '<circle cx="12" cy="12" r="4"/>'
          . '</svg>';

    $srlabel = html_writer::tag('span', $label, [
        'class' => 'local-toolguide-fab__label',
    ]);

    return html_writer::link($url, $icon . $srlabel, [
        'class'      => 'local-toolguide-fab local-toolguide-fab--' . $position,
        'title'      => $title,
        'aria-label' => $title,
        'role'       => 'button',
    ]);
}
