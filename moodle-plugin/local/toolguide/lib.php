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

/*
 * Note on navigation:
 *
 * Earlier versions exposed a `local_toolguide_extend_navigation()` callback
 * that injected a node into Moodle's `global_navigation`. As of v1.1.37 that
 * callback has been removed. The floating Tool Guide quick-access button
 * (rendered by `local_toolguide_before_footer()` and the typed
 * `\core\hook\output\before_footer_html_generation` hook) is the single,
 * theme-agnostic entry point and avoids tying the plugin to Moodle's
 * legacy navigation API, which is being deprecated piece by piece in 5.x.
 * The capability `local/toolguide:view` is still enforced at
 * `index.php` to gate access.
 */

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
 * Return the localized React app user interface strings.
 *
 * @return array Localized strings for the AMD app.
 */
function local_toolguide_get_app_strings() {
    return [
        'title' => get_string('ui_title', 'local_toolguide'),
        'subtitle' => get_string('ui_subtitle', 'local_toolguide'),
        'guide_intro' => get_string('ui_guide_intro', 'local_toolguide'),
        'bloom_intro' => get_string('ui_bloom_intro', 'local_toolguide'),
        'info_toolguide' => get_string('ui_info_toolguide', 'local_toolguide'),
        'info_bloom' => get_string('ui_info_bloom', 'local_toolguide'),
        'matrix_goal_axis' => get_string('ui_matrix_goal_axis', 'local_toolguide'),
        'matrix_tool_axis' => get_string('ui_matrix_tool_axis', 'local_toolguide'),
        'matrix_reading_show' => get_string('ui_matrix_reading_show', 'local_toolguide'),
        'matrix_reading_hide' => get_string('ui_matrix_reading_hide', 'local_toolguide'),
        'matrix_reading_hint' => get_string('ui_matrix_reading_hint', 'local_toolguide'),
        'a11y_open_tool_details' => get_string('ui_a11y_open_tool_details', 'local_toolguide'),
        'nav_matrix' => get_string('ui_nav_matrix', 'local_toolguide'),
        'nav_cards' => get_string('ui_nav_cards', 'local_toolguide'),
        'nav_wizard' => get_string('ui_nav_wizard', 'local_toolguide'),
        'search_placeholder' => get_string('ui_search_placeholder', 'local_toolguide'),
        'compare_btn' => get_string('ui_compare_btn', 'local_toolguide'),
        'compare_new' => get_string('ui_compare_new', 'local_toolguide'),
        'filter_setup_all' => get_string('ui_filter_setup_all', 'local_toolguide'),
        'filter_support_all' => get_string('ui_filter_support_all', 'local_toolguide'),
        'filter_goal_default' => get_string('ui_filter_goal_default', 'local_toolguide'),
        'filter_bloom_all' => get_string('ui_filter_bloom_all', 'local_toolguide'),
        'filter_bloom_from' => get_string('ui_filter_bloom_from', 'local_toolguide'),
        'setup' => get_string('ui_setup', 'local_toolguide'),
        'setup_help' => get_string('ui_setup_help', 'local_toolguide'),
        'support' => get_string('ui_support', 'local_toolguide'),
        'support_help' => get_string('ui_support_help', 'local_toolguide'),
        'setup_einfach' => get_string('ui_setup_einfach', 'local_toolguide'),
        'setup_mittel' => get_string('ui_setup_mittel', 'local_toolguide'),
        'setup_komplex' => get_string('ui_setup_komplex', 'local_toolguide'),
        'support_gering' => get_string('ui_support_gering', 'local_toolguide'),
        'support_mittel' => get_string('ui_support_mittel', 'local_toolguide'),
        'support_hoch' => get_string('ui_support_hoch', 'local_toolguide'),
        'activity' => get_string('ui_activity', 'local_toolguide'),
        'bloom_short' => get_string('ui_bloom_short', 'local_toolguide'),
        'bloom_help' => get_string('ui_bloom_help', 'local_toolguide'),
        'suit_good' => get_string('ui_suit_good', 'local_toolguide'),
        'suit_partial' => get_string('ui_suit_partial', 'local_toolguide'),
        'suit_bad' => get_string('ui_suit_bad', 'local_toolguide'),
        'empty_title' => get_string('ui_empty_title', 'local_toolguide'),
        'empty_text' => get_string('ui_empty_text', 'local_toolguide'),
        'empty_reset' => get_string('ui_empty_reset', 'local_toolguide'),
        'wizard_step1' => get_string('ui_wizard_step1', 'local_toolguide'),
        'wizard_step2' => get_string('ui_wizard_step2', 'local_toolguide'),
        'wizard_step3' => get_string('ui_wizard_step3', 'local_toolguide'),
        'wizard_step4' => get_string('ui_wizard_step4', 'local_toolguide'),
        'wizard_q1' => get_string('ui_wizard_q1', 'local_toolguide'),
        'wizard_q2' => get_string('ui_wizard_q2', 'local_toolguide'),
        'wizard_q3' => get_string('ui_wizard_q3', 'local_toolguide'),
        'wizard_results' => get_string('ui_wizard_results', 'local_toolguide'),
        'wizard_back' => get_string('ui_wizard_back', 'local_toolguide'),
        'wizard_restart' => get_string('ui_wizard_restart', 'local_toolguide'),
        'wizard_skip' => get_string('ui_wizard_skip', 'local_toolguide'),
        'wizard_skip_desc' => get_string('ui_wizard_skip_desc', 'local_toolguide'),
        'overview' => get_string('ui_overview', 'local_toolguide'),
        'suitability_header' => get_string('ui_suitability_header', 'local_toolguide'),
        'docs_btn' => get_string('ui_docs_btn', 'local_toolguide'),
        'community_btn' => get_string('ui_community_btn', 'local_toolguide'),
        'in_compare' => get_string('ui_in_compare', 'local_toolguide'),
        'add_compare' => get_string('ui_add_compare', 'local_toolguide'),
        'description' => get_string('ui_description', 'local_toolguide'),
        'repo_btn' => get_string('ui_repo_btn', 'local_toolguide'),
        'footer' => get_string('ui_footer', 'local_toolguide'),
        'wizard_step5' => get_string('ui_wizard_step5', 'local_toolguide'),
        'wizard_q4' => get_string('ui_wizard_q4', 'local_toolguide'),
        'credit_original' => get_string('ui_credit_original', 'local_toolguide'),
        'credit_translation' => get_string('ui_credit_translation', 'local_toolguide'),
        'credit_translators_extras' => get_string('ui_credit_translators_extras', 'local_toolguide'),
        'dialog_close' => get_string('ui_dialog_close', 'local_toolguide'),
        'credit_license' => get_string('ui_credit_license', 'local_toolguide'),
        'credit_eledia' => get_string('ui_credit_eledia', 'local_toolguide'),
        'wizard_breadcrumb' => get_string('ui_wizard_breadcrumb', 'local_toolguide'),
        'wizard_jump_to' => get_string('ui_wizard_jump_to', 'local_toolguide'),
        'a11y_font_larger' => get_string('ui_a11y_font_larger', 'local_toolguide'),
        'a11y_font_smaller' => get_string('ui_a11y_font_smaller', 'local_toolguide'),
        'a11y_font_reset' => get_string('ui_a11y_font_reset', 'local_toolguide'),
        'alt_eledia_logo' => get_string('ui_alt_eledia_logo', 'local_toolguide'),
        'alt_eledia_favicon' => get_string('ui_alt_eledia_favicon', 'local_toolguide'),
        'alt_moodle_partner' => get_string('ui_alt_moodle_partner', 'local_toolguide'),
        'alt_github' => get_string('ui_alt_github', 'local_toolguide'),
        'alt_cc_byncsa' => get_string('ui_alt_cc_byncsa', 'local_toolguide'),
        'skip_to_content' => get_string('ui_skip_to_content', 'local_toolguide'),
        'a11y_font_group' => get_string('ui_a11y_font_group', 'local_toolguide'),
        'language' => get_string('ui_language', 'local_toolguide'),
        'views' => get_string('ui_views', 'local_toolguide'),
        'search' => get_string('ui_search', 'local_toolguide'),
        'matrix_aria' => get_string('ui_matrix_aria', 'local_toolguide'),
        'bloom_levels' => [
            get_string('ui_bloom_level_1', 'local_toolguide'),
            get_string('ui_bloom_level_2', 'local_toolguide'),
            get_string('ui_bloom_level_3', 'local_toolguide'),
            get_string('ui_bloom_level_4', 'local_toolguide'),
            get_string('ui_bloom_level_5', 'local_toolguide'),
            get_string('ui_bloom_level_6', 'local_toolguide'),
        ],
        'bloom_descs' => [
            get_string('ui_bloom_desc_1', 'local_toolguide'),
            get_string('ui_bloom_desc_2', 'local_toolguide'),
            get_string('ui_bloom_desc_3', 'local_toolguide'),
            get_string('ui_bloom_desc_4', 'local_toolguide'),
            get_string('ui_bloom_desc_5', 'local_toolguide'),
            get_string('ui_bloom_desc_6', 'local_toolguide'),
        ],
        'goals' => [
            'info' => [
                'label' => get_string('ui_goal_info_label', 'local_toolguide'),
                'q' => get_string('ui_goal_info_q', 'local_toolguide'),
            ],
            'bewerten' => [
                'label' => get_string('ui_goal_bewerten_label', 'local_toolguide'),
                'q' => get_string('ui_goal_bewerten_q', 'local_toolguide'),
            ],
            'komm' => [
                'label' => get_string('ui_goal_komm_label', 'local_toolguide'),
                'q' => get_string('ui_goal_komm_q', 'local_toolguide'),
            ],
            'collab' => [
                'label' => get_string('ui_goal_collab_label', 'local_toolguide'),
                'q' => get_string('ui_goal_collab_q', 'local_toolguide'),
            ],
            'bloomG' => [
                'label' => get_string('ui_goal_bloomg_label', 'local_toolguide'),
                'q' => get_string('ui_goal_bloomg_q', 'local_toolguide'),
            ],
        ],
        'purpose_labels' => [
            'administration' => get_string('ui_purpose_administration', 'local_toolguide'),
            'assessment' => get_string('ui_purpose_assessment', 'local_toolguide'),
            'collaboration' => get_string('ui_purpose_collaboration', 'local_toolguide'),
            'communication' => get_string('ui_purpose_communication', 'local_toolguide'),
            'interactivecontent' => get_string('ui_purpose_interactivecontent', 'local_toolguide'),
            'content' => get_string('ui_purpose_content', 'local_toolguide'),
        ],
    ];
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
