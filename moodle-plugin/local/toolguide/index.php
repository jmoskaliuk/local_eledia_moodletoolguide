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
 * Tool Guide main page.
 *
 * @package    local_toolguide
 * @copyright  2026 eLeDia GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../config.php');

$context = \core\context\system::instance();
require_login();
require_capability('local/toolguide:view', $context);

$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/toolguide/index.php'));
$PAGE->set_title(get_string('pagetitle', 'local_toolguide'));
$PAGE->set_heading(get_string('pagetitle', 'local_toolguide'));
// The React app inside the page renders its own decorated heading
// ("Moodle Tool Guide" with the Moodle 5 badge and a subtitle), so we hide
// Moodle's auto-generated <h1> via this body class. The set_heading() call
// stays in place so screen readers, breadcrumbs and the browser tab title
// remain accurate.
$PAGE->add_body_class('local-toolguide-page');
// Wider Boost layout — 'standard' caps the content area at ~960 px which
// truncates the right-most matrix column on common 14-inch laptops. 'report'
// gives the React app more horizontal room while keeping the nav drawer,
// breadcrumbs and footer. Combined with the #toolguide-root viewport-width
// breakout in styles.css, the matrix scales to whatever space the theme
// makes available.
$PAGE->set_pagelayout('report');

// React + ReactDOM 18.3.1 (UMD, MIT-licensed) shipped with the plugin under
// lib/. Loaded as plain global libs so the AMD module below can rely on
// window.React / window.ReactDOM. This avoids the previous CDN dependency
// (cdnjs.cloudflare.com), which was both a DSGVO concern and a Moodle
// Plugins Directory reviewer policy violation.
$PAGE->requires->js(new moodle_url('/local/toolguide/lib/react.production.min.js'), true);
$PAGE->requires->js(new moodle_url('/local/toolguide/lib/react-dom.production.min.js'), true);

// Pull the current Moodle locale and translated app strings through to the React app.
// The string bundle is too large for js_call_amd() arguments in debug mode, so it is
// exposed early as JS data and read by the AMD module from window.local_toolguide_app_strings.
require_once(__DIR__ . '/lib.php');
$initiallang = local_toolguide_get_locale_lang();
$PAGE->requires->data_for_js('local_toolguide_app_strings', local_toolguide_get_app_strings(), true);

// Mount the React app via the AMD module — proper Moodle pattern, no inline
// <script> tags, RequireJS-cached, fully CSP-friendly.
$PAGE->requires->js_call_amd('local_toolguide/toolguide', 'init', [$initiallang]);

echo $OUTPUT->header();
echo $OUTPUT->render_from_template('local_toolguide/main', []);
echo $OUTPUT->footer();
