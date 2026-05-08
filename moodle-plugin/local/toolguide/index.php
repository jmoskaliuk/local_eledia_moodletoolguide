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

$context = context_system::instance();
require_login();
require_capability('local/toolguide:view', $context);

$PAGE->set_context($context);
$PAGE->set_url(new moodle_url('/local/toolguide/index.php'));
$PAGE->set_title(get_string('pagetitle', 'local_toolguide'));
$PAGE->set_heading(get_string('pagetitle', 'local_toolguide'));
// Wider Boost layout — 'standard' caps the content area at ~960 px which
// truncates the right-most matrix column on common 14-inch laptops. 'report'
// gives the React app more horizontal room while keeping the nav drawer,
// breadcrumbs and footer. Combined with the #toolguide-root viewport-width
// breakout in styles.css, the matrix scales to whatever space the theme
// makes available.
$PAGE->set_pagelayout('report');

// Load React (no Babel needed — the bundled JS uses React.createElement directly).
$PAGE->requires->js(new moodle_url('https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js'), true);
$PAGE->requires->js(new moodle_url('https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js'), true);

// Hand the current Moodle locale to the React app via a global, so the
// language switcher disappears and the app follows Moodle's user-level
// language preference (see sync_plugin_js.py for the patches that consume
// this variable).
require_once(__DIR__ . '/lib.php');
$initiallang = local_toolguide_get_locale_lang();

echo $OUTPUT->header();

// Container for the React app. Heading is rendered inside the React app itself.
echo '<div id="toolguide-root" style="min-height:600px;"></div>';

// Inject the Moodle locale before the AMD module reads it.
echo '<script>window.__toolguideMoodleLang = ' . json_encode($initiallang) . ';</script>';

// Load the auto-generated app bundle (synced from moodle-tool-guide.html).
echo '<script src="' . (new moodle_url('/local/toolguide/amd/src/toolguide.js'))->out() . '"></script>';

echo $OUTPUT->footer();
